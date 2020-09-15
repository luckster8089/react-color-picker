import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar'
import './Palette.css';


export default function Palette({ palette }) {
    const [level, setLevel] = useState(500)
    const { colors } = palette

    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color.hex} name={color.name} />
    ))

    function changeLevel(newLevel) {
        setLevel(newLevel)
    }

    return (
        <div className="Palette">
        <Navbar level={level} changeLevel={changeLevel} />
        {/* Navbar goes here */}
            <div className="Palette-colors">
            {colorBoxes}
            </div>
        {/* Footer eventually goes here */}
        </div>
    )
}
