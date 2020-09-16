import React from 'react'
import MiniPalette from './MiniPalette'
import { Link } from 'react-router-dom'

export default function PaletteList({ palettes }) {
    return (
        <div>
            {palettes.map(palette => (
                <MiniPalette {...palette} />
            ))}
        </div>
    )
}
