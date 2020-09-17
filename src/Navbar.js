import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Select from '@material-ui/core/Select'
import { MenuItem, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css'


export default function Navbar({ level, changeLevel, handleChanges, showingAllColors }) {
    const [format, setFormat] = useState("hex")
    const [open, setOpen] = useState(false)

    function handleChange(e) {
        setFormat(e.target.value)
        setOpen(true)
        handleChanges(e.target.value)
    }

    function closeSnackbar() {
        setOpen(false)
    }

    return (
        <header className="Navbar">
            <div className="logo">
                <Link to="/">Color Picker</Link>
            </div>
            
            {showingAllColors &&
            <div className="slider-container">
                <span>Opacity Level: {level}</span>
                <div className="slider">
                    <Slider 
                        defaultValue={level} 
                        min={100} 
                        max={900}
                        step={100} 
                        onAfterChange={changeLevel} 
                    />
                </div>
            </div>}

            <div className="select-container">
                <Select value={format} onChange={handleChange}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar 
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }} 
                open={open}
                autoHideDuration={3000}
                message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                onClose={closeSnackbar}
                action={[
                    <IconButton
                        onClick={closeSnackbar} 
                        color='inherit' 
                        key="close" 
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </header>
    )
}
