import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar'
import './Palette.css';


export default function Palette({ palette }) {
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState("hex")
    const { colors } = palette

    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color[format]} name={color.name} />
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
        {/* Navbar goes here */}
            <div className="Palette-colors">
            {colorBoxes}
            </div>
        {/* Footer eventually goes here */}
        </div>
    )
}
