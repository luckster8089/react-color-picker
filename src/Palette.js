import React, { useState } from 'react';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter'
import Navbar from './Navbar'
import { withStyles } from '@material-ui/styles';

const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    colors: {
        height: '90%'
    }
}


function Palette({ palette, classes }) {
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
            showingFullPalette={true}
        />
    ))

    function changeLevel(newLevel) {
        setLevel(newLevel)
    }

    function changeFormat(val) {
        setFormat(val)
    }

    return (
        <div className={classes.Palette}>
        <Navbar level={level} changeLevel={changeLevel} handleChanges={changeFormat} showingAllColors={true} />
            <div className={classes.colors}>
            {colorBoxes}
            </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )
}

export default withStyles(styles)(Palette)