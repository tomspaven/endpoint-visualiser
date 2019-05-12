import React from 'react'

const StatusBar = ({message, color}) => {
    let style = {color: color,
                 backgroundColor: 'black',
                 padding: '5px'};
    return <p style={style}>{message}</p>
}
export default StatusBar