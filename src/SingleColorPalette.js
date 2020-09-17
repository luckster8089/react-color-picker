import React from 'react';
import ColorBox from './ColorBox';

export default function SingleColorPalette({ palette, colorId }) {
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

    
    const colorBoxes = shades.map(color => (
        <ColorBox 
            key={color.id} 
            name={color.name} 
            background={color.hex} 
            showLink={false} 
        />
    ))

    return (
        <div className='Palette'>
            <h1>Single Color Palette</h1>
            <div className='Palette-colors'>
                {colorBoxes}
            </div>
        </div>
    )
}
