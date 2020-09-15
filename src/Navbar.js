import React, { useState } from 'react';
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css'


export default function Navbar({ level, changeLevel, handleChanges }) {
    const [format, setFormat] = useState("hex")

    function handleChange(e) {
        setFormat(e.target.value)
        handleChanges(e.target.value)
    }

    return (
        <header className="Navbar">
            <div className="logo"> 
                <a href="#">Color Picker</a>
            </div>
            <div className="slider-container">
                <span>Level: {level}</span>
                <div className="slider">
                    <Slider 
                        defaultValue={level} 
                        min={100} 
                        max={900}
                        step={100} 
                        onAfterChange={changeLevel} 
                    />
                </div>
            </div>
            <div className="select-container">
                <Select value={format} onChange={handleChange}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
        </header>
    )
}
