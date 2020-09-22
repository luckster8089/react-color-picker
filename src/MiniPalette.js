import React from 'react'
import { withStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import styles from './styles/MiniPaletteStyles'

function MiniPalette({ classes, paletteName, emoji, colors, id }) {
    const history = useHistory();

    const miniColorBoxes = colors.map(color => (
        <div 
            className={classes.miniColor} 
            style={{ backgroundColor: color.color }}
            key={color.name}
        />
    ));

    function goToPalette(id) {
        history.push(`/palette/${id}`)
    }

    return (
        <div className={classes.root} onClick={() => goToPalette(id)}>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>
                    {emoji}
                </span>
            </h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);
