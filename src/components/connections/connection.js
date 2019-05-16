import React from 'react'

export const ConnDimensions = () => {return 5}
export const Connection = props => {

    const fillColour = props.on ? "green" : "blue"
    return (
        <rect width={ConnDimensions()} height={ConnDimensions()} x={props.x} y={props.y} fill={fillColour} strokeWith="1pt" stroke="black" />
    )
}

export default Connection