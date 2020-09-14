import React from 'react'
import './ColorBox.css'

export default function ColorBox({ background, name }) {
    return (
        <div style={{ background: background}} className="ColorBox">
        <span>{name}</span>
            <span>MORE</span>
        </div>
    )
}
