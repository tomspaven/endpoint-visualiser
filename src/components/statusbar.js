import React from 'react'

const StatusBar = ({message, color}) => {
    let style = {color: color,
                 backgroundColor: 'cornflowerblue',
                 padding: '5px'};
    return <p style={style}>{message}</p>
}
export default StatusBar