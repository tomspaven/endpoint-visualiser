import React from 'react'

export const PipeWidth = () => {return 19}
export const PipeHeight = () => {return 60}
export const Pipe = props => {
    const lineWidth = 2, //lineLength = 60,
          //pipeWidth = 19,
          pipeYOffset = 159,
          inputPipeXOffset = 30, 
          outputPipeXOffset = inputPipeXOffset + 92;

    let vLineX = props.x+inputPipeXOffset,
        vLineY = props.y+pipeYOffset 
    
    let wireName = "inpipeWire-"
    if (props.isOut) {
        vLineX += outputPipeXOffset
        wireName = "outpipeWire-"
    }

    return (
        <g>
            <line x1={vLineX}           y1={vLineY} x2={vLineX}             y2={vLineY + PipeHeight()} stroke="black" stroke-width="3pt" /> 
            <line x1={vLineX+lineWidth} y1={vLineY} x2={vLineX + PipeWidth()} y2={vLineY}              stroke={props.colour} stroke-width="4pt" /> 
            <line x1={vLineX+PipeWidth()} y1={vLineY} x2={vLineX + PipeWidth()} y2={vLineY + PipeHeight()} stroke="black" stroke-width="3pt" /> 
            <path d={"M"+(vLineX+PipeWidth())/2+","+pipeYOffset+PipeHeight()+"v-"+PipeHeight()} stroke="black" stroke-width="1" fill="none" id={wireName+props.id}/>
            <circle cx="" cy="" r="10" fill="black"> 
                <animateMotion dur="1.6s" repeatCount="indefinite">
                    <mpath xlinkHref={"#"+wireName+props.id} />
                </animateMotion>
            </circle>
        </g>
    )
}


//export default PipeWidth;
//export default PipeHeight;
//export default Pipe