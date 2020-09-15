import React, { useState } from 'react';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';
import Slider from 'rc-slider';


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
            <div className="slider">
                <Slider 
                    defaultValue={level} 
                    min={100} 
                    max={900}
                    step={100} 
                    onAfterChange={changeLevel} 
                />
            </div>
        {/* Navbar goes here */}
            <div className="Palette-colors">
            {colorBoxes}
            </div>
        {/* Footer eventually goes here */}
        </div>
    )
}
