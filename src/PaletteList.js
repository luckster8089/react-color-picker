import React from 'react'
import { Link } from 'react-router-dom'

export default function PaletteList({ palettes }) {
    return (
        <div>
            {palettes.map(palette => (
                <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
            ))}
        </div>
    )
}
