import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar'
import './Palette.css';


export default function Palette({ palette }) {
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState("hex")
    const { colors, paletteName, emoji, id } = palette

    const colorBoxes = colors[level].map(color => (
        <ColorBox 
            background={color[format]} 
            name={color.name} 
            key={color.id} 
            paletteId={id} 
            colorId={color.id} 
            showLink={true}
        />
    ))

    function changeLevel(newLevel) {
        setLevel(newLevel)
    }

    function changeFormat(val) {
        setFormat(val)
    }

    return (
        <div className="Palette">
        <Navbar level={level} changeLevel={changeLevel} handleChanges={changeFormat}/>
            <div className="Palette-colors">
            {colorBoxes}
            </div>
        <footer className="Palette-footer">
            {paletteName}
            <span className="emoji">{emoji}</span>
        </footer>
        </div>
    )
}
