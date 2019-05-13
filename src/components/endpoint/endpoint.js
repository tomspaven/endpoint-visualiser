import React, {Component} from 'react';

class Endpoint extends Component {
  // Props:  epid, x, y, title
  constructor(props) {
    super(props)
    this.state = {
        stateMessage: 'Waiting for conns 💤',
        stateValue: '',
        colour: 'grey',
    }
  }

  render() {  
    let ox = this.props.x
    let oy = this.props.y
    let epid = this.props.epid

    return (
    <g id={"Endpoint-" + epid}>
      <rect x={ox} y={oy+10} width="200" height="150" rx="15" id={"epbox-" + epid} 
        style={{fill: this.state.colour, stroke: 'black', strokeWidth: 3}} />
      <rect x={ox+20} y={oy} width="160" height="25" rx="15" id={"eptitle-" + epid}
        style={{fill: 'black}'}}/>
      <text x={ox+100} y={oy+17} id={"eplabel-" + epid} text-anchor="middle"
        style={{fill: 'white', fontSize: 16}}>{this.props.title}</text>

      <text x={ox+30} y={oy+155} id={"inarrow-" + epid}>In⬆</text>
      <text x={ox+145} y={oy+155} id={"outarrow-" + epid}>Out⬇</text>

      <text x={ox+100} y={oy+85} text-anchor="middle" id={"epstatus-" + epid}
        style={{fill: 'black', fontSize: 16}}>{this.state.stateMessage}</text> 
      <text x={ox+100} y={oy+102} text-anchor="middle" id={"epstatusval-" + epid}
        style={{fill: 'black', fontSize: 16}}> {this.state.stateValue === "" ? "" : +"(" + this.state.stateValue + ")"}
      </text>       
    </g>
   );
  }
}

export default Endpoint;
