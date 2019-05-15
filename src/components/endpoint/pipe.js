import React from 'react'

const Pipe = ({x, y, animCharacter, colour, isOut, id}) => {

    const lineWidth = 2, lineLength = 60,
          pipeWidth = 19,
          pipeYOffset = 159,
          inputPipeXOffset = 30, 
          outputPipeXOffset = inputPipeXOffset + 119

    let vLineX = x+inputPipeXOffset
    let vLineY = y+pipeYOffset 
    
    wireName = "inpipeWire-"
    if (isOut) {
        vLineX += outputPipeXOffset
        wireName = "outpipeWire-"
    }

    return (
        <g>
            <line x1={vLineX}           y1={vLineY} x2={vLineX}             y2={vLineY + lineLength} stroke="black" stroke-width="3pt" /> 
            <line x1={vLineX+lineWidth} y1={vLineY} x2={vLineX + pipeWidth} y2={vLineY}              stroke={colour} stroke-width="4pt" /> 
            <line x1={vLineX+pipeWidth} y1={vLineY} x2={vLineX + pipeWidth} y2={vLineY + lineLength} stroke="black" stroke-width="3pt" /> 
            <path d={"M"+(vLineX+pipeWidth)/2+","+pipeYOffset+lineLength+"v-"+lineLength} stroke="black" stroke-width="1" fill="none" id={wireName+id}/>
            <circle cx="" cy="" r="10" fill="black"> 
                <animateMotion dur="1.6s" repeatCount="indefinite">
                    <mpath xlinkHref={"#"+wireName+id} />
                </animateMotion>
            </circle>
        </g>
    )
}
export default Pipe