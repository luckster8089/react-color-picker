import React from 'react';
import { Link } from 'react-router-dom'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles'


function PaletteList({ classes, palettes }) {
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>Pick Your Colors!</h1>
                    <Link to="/palette/new">
                    Create Palette
                    </Link>
                </nav>
                <div className={classes.palettes}>
                {palettes.map(palette => (
                <MiniPalette {...palette} />
                ))}
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(PaletteList)
