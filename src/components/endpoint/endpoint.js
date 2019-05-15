import React, {Component} from 'react';
//import Pipe from './pipe'

const epWidth = 200, epHeight = 150;

class Endpoint extends Component {
  // Props:  epid, x, y, title
  state = {
    stateMessage: 'Waiting for conns 💤',
    stateValue: '',
    colour: 'grey',
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
        style={{fill: 'white', fontSize: 16}}>{this.props.title}</text>

      <text x={ox+30} y={oy+155} id={"inarrow-" + epid}>In⬆</text>
      <text x={ox+145} y={oy+155} id={"outarrow-" + epid}>Out⬇</text>

      <text x={ox+100} y={oy+85} text-anchor="middle" id={"epstatus-" + epid}
        style={{fill: 'black', fontSize: 16}}>{this.state.stateMessage}</text> 
      <text x={ox+100} y={oy+102} text-anchor="middle" id={"epstatusval-" + epid}
        style={{fill: 'black', fontSize: 16}}> {this.state.stateValue === "" ? "" : +"(" + this.state.stateValue + ")"}
      </text> 
      {//<Pipe x={ox} y ={oy} animCharacter="⬆" colour={this.state.colour} isOut='false' id={"inpipe-" + epid}/>
      //<Pipe x={ox} y ={oy} animCharacter="⬇" colour={this.state.colour} isOut='true' id={"outpipe-" + epid}/> 
    }   
    </g>
   );
  }
  static get epHeight() { return epHeight; }
  static get epWidth() { return epWidth;}
  
}

export default Endpoint;
