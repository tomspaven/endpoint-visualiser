import React, {Component} from 'react';
import Endpoint from './endpoint/endpoint'

const epxpad = 20, epypad = 20;
const statusBarHeight = 150;

class EndpointPanel extends Component {
    
  calcMax = (fullDim, instanceDim, padDim)=>{return Math.floor(fullDim / (instanceDim + (padDim*2)))}  

  state = {
    maxCols: this.calcMax(window.innerWidth, Endpoint.epWidth, EndpointPanel.epXPad),
    maxRows: this.calcMax(window.innerHeight - EndpointPanel.statusHeight, Endpoint.epHeight, EndpointPanel.epYPad),
  }
  //updateWindowDimensions = this.updateWindowDimensions.bind(this)
  //let self = this


  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({
      maxCols: this.calcMax(window.innerWidth, Endpoint.epWidth, EndpointPanel.epXPad),
      maxRows: this.calcMax(window.innerHeight - EndpointPanel.statusHeight, Endpoint.epHeight, EndpointPanel.epYPad),
    })
  }
  
  render() {
    const w = Endpoint.epWidth, h = Endpoint.epHeight,
          xp = EndpointPanel.epXPad, yp = EndpointPanel.epYPad

    const cells = this.props.endpoints.map((endpoint, idx) => {
      const ep = {
        epid: endpoint.id ? endpoint.id : 0, 
        title: endpoint.title ? endpoint.title : "Unknown Endpoint",
        maxConns: endpoint.maxConns ? endpoint.maxConns : 25,
        cellx: idx % this.state.maxCols,
        celly: Math.floor(idx/this.state.maxCols),
      }
      const calcPosition = (dimension, padding, cellIdx) => {return (padding*(cellIdx+1)) + (dimension*cellIdx)}
      const socket = new WebSocket('ws://localhost:3031/websocketRegistration/' + ep.epid)

      return <Endpoint x={calcPosition(w, xp, ep.cellx)} y={calcPosition(h, yp, ep.celly)} maxConns={ep.maxConns} epid={ep.epid} title={ep.title} socket={socket} key={ep.epid}/> 
     }) 
  
    return (
    <div className="Endpoint-Panel">
        <svg width={window.innerWidth} height={window.innerHeight - EndpointPanel.statusHeight}>
          {cells}
          {/*<text x="50" y="50">Max Rows: {this.state.maxRows} Max Cols: {this.state.maxCols}</text>*/}
        </svg>
    </div>
    );
  }
  static get epXPad() { return epxpad; }
  static get epYPad(){ return epypad; }
  static get statusHeight(){ return statusBarHeight; }
}

export default EndpointPanel;
