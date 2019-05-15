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
        vLineY = props.y+pipeYOffset,
        xWireOffset =  (vLineX + (vLineX+PipeWidth()))/2
    const yWireOffset = vLineY +PipeHeight() + 1
    
    let wireName = "inpipeWire-"
    let animProperties = {
        keyPoints: "",
        keyTimes: "",
        calcMode: "",
    }

    // Changes in confg data for output pipe - animation needs to go across the wire
    // in the other direction
    if (props.isOut) {
        vLineX += outputPipeXOffset
        xWireOffset += outputPipeXOffset
        wireName = "outpipeWire-"
        animProperties = {
            keyPoints: "1;0",
            keyTimes: "0;1",
            calcMode: "linear",        
        }
    }

    return (
        <g>
            <line x1={vLineX}           y1={vLineY} x2={vLineX}             y2={vLineY + PipeHeight()} stroke="black" stroke-width="3pt" /> 
            <line x1={vLineX+lineWidth} y1={vLineY} x2={vLineX + PipeWidth()} y2={vLineY}              stroke={props.colour} stroke-width="4pt" /> 
            <line x1={vLineX+PipeWidth()} y1={vLineY} x2={vLineX + PipeWidth()} y2={vLineY + PipeHeight()} stroke="black" stroke-width="3pt" /> 
            {/*<path d="M39.5,220v-61" stroke="black" stroke-width="1" fill="none"/>*/}
            <path d={"M" + xWireOffset +","+ yWireOffset + "v-"+ PipeHeight()} stroke="black" stroke-width="1" fill="none" id={wireName+props.id}/>
            <text textAnchor="middle" alignmentBaseline="middle">❤️
                <animateMotion dur="0.4s" repeatCount="indefinite" keyPoints={animProperties.keyPoints} keyTimes={animProperties.keyTimes} calcMode={animProperties.calcMode}>
                    <mpath xlinkHref={"#"+wireName+props.id} />
                </animateMotion>               
            </text>
        </g>
    )
}


//export default PipeWidth;
//export default PipeHeight;
//export default Pipe