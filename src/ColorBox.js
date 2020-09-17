import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ColorBox({ background, name, paletteId, colorId, showLink }) {
    const [copy, setCopy] = useState(false)


    function changeCopy() {
        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        }, 1500)
    }

    const isDarkColor = chroma(background).luminance() <= 0.08;

    const isLightColor = chroma(background).luminance() >= 0.7;


    return (
    <CopyToClipboard text={background} onCopy={changeCopy}>
        <div style={{background}} className="ColorBox">
            <div 
            style={{background}} 
            className={`copy-overlay ${copy && "show"}`}
            />
            <div className={`copy-msg ${copy && "show"}`}>
                <h1>Copied!</h1>
                <p className={isLightColor && 'dark-text'}>{background}</p>
            </div>
            <div className="copy-container">
                <div className="box-content">
                    <span className={isDarkColor && 'light-text'}>{name}</span>
                </div>
                <button className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</button>
            </div>
            {showLink && (
            <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                <span className={`see-more ${isLightColor && 'dark-text'}`} >More</span>
            </Link>
            )}
        </div>
    </CopyToClipboard>
    )
}
