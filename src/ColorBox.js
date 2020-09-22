import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles/ColorBoxStyles'
import { withStyles } from '@material-ui/styles';


function ColorBox({ background, name, paletteId, colorId, showingFullPalette, classes }) {
    const [copy, setCopy] = useState(false)

    function changeCopy() {
        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        }, 1500)
    }

    return (
    <CopyToClipboard text={background} onCopy={changeCopy}>
        <div style={{background}} className={classes.ColorBox}>
            <div 
            style={{background}} 
            className={`${classes.copyOverlay} ${copy && classes.showOverlay}`}
            />
            <div className={`${classes.copyMsg} ${copy && classes.showMsg}`}>
                <h1>Copied!</h1>
                <p className={classes.copyText}>{background}</p>
            </div>
            <div>
                <div className={classes.boxContent}>
                    <span className={classes.colorName}>{name}</span>
                </div>
                <button className={classes.copyButton}>Copy</button>
            </div>
            {showingFullPalette && (
            <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                <span className={classes.seeMore} >More</span>
            </Link>
            )}
        </div>
    </CopyToClipboard>
    )
}

export default withStyles(styles)(ColorBox);
