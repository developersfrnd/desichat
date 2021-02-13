import React from 'react'

export default function Tags() {
    return (
        <div className="filters isotope_filters text-center">
            <a href="#" data-filter="*" className="selected">All</a>
            <a href="#" data-filter=".fashion">Fashion</a>
            <a href="#" data-filter=".studio">Studio</a>
            <a href="#" data-filter=".session">Session</a>
            <a href="#" data-filter=".top">Top</a>
            <a href="#" data-filter=".newest">Newest</a>
        </div>
    )
}
