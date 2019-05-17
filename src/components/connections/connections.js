import React, {Component} from 'react';
import {Connection, ConnDimensions} from './connection'
import Endpoint from '../endpoint/endpoint'

export class Connections extends Component {
  
  state = {
    connections: Array(this.props.maxConns).fill({on: false})
  }

  // props: epid, x, y
  render() { 
    const connectionHorizontalPad = 2
    const connectionVerticalPad = 2
    const maxRows = Math.ceil(Math.sqrt(this.props.maxConns)), 
          maxCols = maxRows;
    const centreX = this.props.x + Endpoint.epWidth / 2

    const connections = this.state.connections.map((connection,idx) => {

        const firstX = (maxRows % 2) === 0 ?
            centreX - ((maxRows/2) * (ConnDimensions() + connectionHorizontalPad)) :
            centreX - ((Math.floor(maxRows / 2) * ConnDimensions()) + (ConnDimensions() * 0.5) + ((maxRows -1) * connectionHorizontalPad));

        const x = firstX + ((idx % maxCols) * (ConnDimensions() + connectionHorizontalPad))
        const rowIdx = Math.floor(idx/maxRows) % maxRows
        const y = this.props.y + 183 + (rowIdx * ConnDimensions()) + (rowIdx * connectionVerticalPad)
        return <Connection x={x} y={y} on={connection.on} key={idx}/>
    });

    const textYOffset = this.props.y + Endpoint.epHeight - 33
    const textXOffset = centreX - 32 

    return (
    <g id={"Connections-" + this.props.epid}>
       <text x={textXOffset} y={textYOffset} textAnchor="start" fontSize="0.7em">Connections</text>
       {connections}
    </g>
   );
  }
}

export default Connections;
