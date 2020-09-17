import React, { useState } from 'react';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';

export default function SingleColorPalette({ palette, colorId }) {
    const [format, setFormat] = useState('hex')
    const { paletteName, emoji } = palette

    const shades = gatherShades(palette, colorId)

    function gatherShades(palette, colorsToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorsToFilterBy)
            )
        }
        return shades.slice(1);
    }

    function changeFormat(val) {
        setFormat(val)
    }

    
    const colorBoxes = shades.map(color => (
        <ColorBox 
            key={color.id} 
            name={color.name} 
            background={color[format]} 
            showLink={false} 
        />
    ))

    return (
        <div className='Palette'>
            <Navbar handleChanges={changeFormat} showingAllColors={false} />
            <div className='Palette-colors'>
                {colorBoxes}
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )
}
