import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import styles from './styles/PaletteStyles'
import { withStyles } from '@material-ui/styles';


function SingleColorPalette({ palette, colorId, classes }) {
    const [format, setFormat] = useState('hex')
    const { paletteName, emoji, id } = palette

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
            key={color.name} 
            name={color.name} 
            background={color[format]} 
            showingFullPalette={false} 
        />
    ))

    return (
        <div className={classes.Palette}>
            <Navbar handleChanges={changeFormat} showingAllColors={false} />
            <div className={classes.colors}>
                {colorBoxes}
            <div className={classes.goBack}>
                <Link to={`/palette/${id}`}>Go Back</Link>
            </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )
}

export default withStyles(styles)(SingleColorPalette)
