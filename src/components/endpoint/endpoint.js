import React, {Component} from 'react';
import {Pipe, PipeHeight} from './pipe'
import Connections from '../connections/connections' 
//import TransitionGroup from 'react-transition-group/TransitionGroup'

const epWidth = 200, epHeight = 150;

class Endpoint extends Component {
  // Props:  epid, x, y, title, maxConns
  state = {
    stateMessage: 'Waiting for conns 💤',
    stateValue: '',
    colour: 'grey',
    numberConnections: 0,
    socket: this.props.socket,
    animCharIn: '',
    animCharOut: '',
    currentPipe: 0,
    direction: '',
  }
  
  componentDidMount() {

    const setStateEndpointConnected = msg => {
      this.setState({
        colour: '#7fffa3',
        numberConnections: msg.numConnections,
        stateMessage: 'Endpoint Connected 👍',
        stateValue: '',
      })
    }

    const setStateEndpointDisconnected = () => {
      this.setState({
        colour: 'grey',
        numberConnections: 0,
        stateMessage: 'Waiting for conns 💤',
        animChar: '',
        stateValue: '',
      })
    }

    const setStateNewTraffic = (direction, msg) => {

      const pipeId = (this.state.currentPipe % 3) + 1
      
      direction === "Request" ? 
        this.setState({
          animCharIn: msg.character,
          currentPipe: pipeId,
          direction: 'RQ',
        }) : 
        this.setState({
          animCharOut: msg.character,
          currentPipe: pipeId,
          direction: 'RS',
        })
    }

    const setStateTrafficImpaired = msg => {
      const maxRGBYellow = 255
      const colourScale = msg.time === -1 ? maxRGBYellow : (msg.worstResponse === 0 ? 1 : msg.time / msg.worstResponse)
      const minRGBYellow = 100
      const ourRGBYellow = maxRGBYellow - Math.floor((maxRGBYellow - minRGBYellow) * colourScale)
      const rgbString = "rgb(255," + ourRGBYellow + ",0)"
      this.setState({
        colour: rgbString,
        stateMessage: 'Delayed Response 😬',
        stateValue: msg.time + "ms",
      })
    }

    let newsocket = this.state.socket
    newsocket.onopen = () => console.log("Websocket connected for endpoint " + this.props.epid) 
    newsocket.onmessage = event => {
      const msg = JSON.parse(event.data)
      if (msg.id === "EndpointConnected") {
        setStateEndpointConnected(msg)
      }
      if (msg.id === "EndpointDisconnected") {
        setStateEndpointDisconnected()
      }
      if (msg.id === "TrafficRequest") {
        console.log("In traffic request (" + this.props.epid + ") - " + msg.character)
        setStateNewTraffic("Request", msg)
      }
      if (msg.id === "TrafficResponse") {
        setStateNewTraffic("Response", msg)
      }
      if (msg.id === "EndpointImpaired") {
        setStateTrafficImpaired(msg)
      }
    }

    this.setState({
      socket: newsocket
    })
  }

  render() {
    const ox = this.props.x,
          oy = this.props.y,
          epid = this.props.epid

    const numPipes = 3
    const inpipes = [...Array(numPipes)].map((_, i) => {
        return <Pipe x={ox + (i*2)} y={oy} animCharacter={"RQ" === this.state.direction && i === this.state.currentPipe ? this.state.animCharIn : ""} isOut={false} id ={"inpipe-" + epid + "-" + this.state.currentPipe}/> 
    })

    const outpipes = [...Array(numPipes)].map((_, i) => {
      return <Pipe x={ox + (i*2)} y={oy} animCharacter={"RS" === this.state.direction && i === this.state.currentPipe ? this.state.animCharOut : ""} isOut={true} id ={"outpipe-" + epid + "-" + this.state.currentPipe}/> 
    })

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
        style={{fill: 'black', fontSize: 16}}> {this.state.stateValue === "" ? "" : "(" + this.state.stateValue + ")"}
      </text> 
      <Connections x={ox} y={oy} maxConns={this.props.maxConns} epid={epid} numConns={this.state.numberConnections}/>
      {inpipes}
      {outpipes}
    </g>
   );
  }
  static get epHeight() { return epHeight + PipeHeight(); }
  static get epWidth() { return epWidth;}
  
}

export default Endpoint;
