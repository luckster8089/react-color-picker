import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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


    return (
    <CopyToClipboard text={background} onCopy={changeCopy}>
        <div style={{background}} className="ColorBox">
            <div 
            style={{background}} 
            className={`copy-overlay ${copy && "show"}`}
            />
            <div className={`copy-msg ${copy && "show"}`}>
                <h1>Copied!</h1>
                <p>{background}</p>
            </div>
            <div className="copy-container">
                <div className="box-content">
                    <span>{name}</span>
                </div>
                <button className="copy-button">Copy</button>
            </div>
            {showLink && (
            <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                <span className="see-more">More</span>
            </Link>
            )}
        </div>
    </CopyToClipboard>
    )
}
