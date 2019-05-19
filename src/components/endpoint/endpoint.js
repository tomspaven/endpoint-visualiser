import React, {Component} from 'react';
import {Pipe, PipeHeight} from './pipe'
import Connections from '../connections/connections'

const epWidth = 200, epHeight = 150;

class Endpoint extends Component {
  // Props:  epid, x, y, title, maxConns
  
  state = {
    stateMessage: 'Waiting for conns 💤',
    stateValue: '',
    colour: 'grey',
    numberConnections: 0,
    socket: this.props.socket,
  }
  
  componentDidMount() {

    const setStateEndpointConnected = msg => {
      this.setState({
        colour: 'green',
        numberConnections: msg.numConnections,
        stateMessage: 'Endpoint Connected 👍'
      })
    }

    let newsocket = this.state.socket
    newsocket.onopen = () => console.log("Websocket connected for endpoint " + this.props.epid) 
    newsocket.onmessage = event => {
      console.log("Websocket message received for endpoint " + this.props.epid + "message: ")
      const msg = JSON.parse(event.data)
      console.log(msg)
      if (msg.id === "EndpointConnected") {
        setStateEndpointConnected(msg)
      }
    }

    this.setState({
      socket: newsocket
    })
  }

  render() {  
    const ox = this.props.x,
          oy = this.props.y,
          epid = this.props.epid;

    return (
    <g id={"Endpoint-" + epid}>
      <rect x={ox} y={oy+10} width="200" height="150" rx="15" id={"epbox-" + epid} 
        style={{fill: this.state.colour, stroke: 'black', strokeWidth: 3}} />
      <rect x={ox+20} y={oy} width="160" height="25" rx="15" id={"eptitle-" + epid}
        style={{fill: 'black}'}}/>
      <text x={ox+100} y={oy+17} id={"eplabel-" + epid} textAnchor="middle"
        style={{fill: 'white', fontSize: 16, fontWeight: 'bold'}}>{this.props.title}</text>

      <text x={ox+30} y={oy+155} id={"inarrow-" + epid}>In⬆</text>
      <text x={ox+145} y={oy+155} id={"outarrow-" + epid}>Out⬇</text>

      <text x={ox+100} y={oy+85} textAnchor="middle" id={"epstatus-" + epid}
        style={{fill: 'black', fontSize: 16}}>{this.state.stateMessage}</text> 
      <text x={ox+100} y={oy+102} textAnchor="middle" id={"epstatusval-" + epid}
        style={{fill: 'black', fontSize: 16}}> {this.state.stateValue === "" ? "" : +"(" + this.state.stateValue + ")"}
      </text> 
      <Connections x={ox} y={oy} maxConns={this.props.maxConns} epid={epid} numConns={this.state.numberConnections}/>
      <Pipe x={ox} y ={oy} animCharacter="❤️" colour={this.state.colour} isOut={false} id={"inpipe-" + epid}/>
      <Pipe x={ox} y ={oy} animCharacter="❤️" colour={this.state.colour} isOut={true} id={"outpipe-" + epid}/>   
    </g>
   );
  }
  static get epHeight() { return epHeight + PipeHeight(); }
  static get epWidth() { return epWidth;}
  
}

export default Endpoint;
