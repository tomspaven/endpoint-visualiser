import React, {Component} from 'react';
import Endpoint from './endpoint/endpoint'

const epWidth = 200, epHeight = 150;
const epxpad = 20, epypad = 20;
const statusBarHeight = 150;

class EndpointPanel extends Component {

  calcMax = (fullDim, instanceDim, padDim)=>{return Math.floor(fullDim / (instanceDim + (padDim*2)))}

  constructor(props) {
    super(props)
    this.state = {
        maxCols: this.calcMax(window.innerWidth, EndpointPanel.epWidth, EndpointPanel.epXPad),
        maxRows: this.calcMax(window.innerHeight - EndpointPanel.statusHeight, EndpointPanel.epHeight, EndpointPanel.epYPad),
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    //let self = this
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  

  updateWindowDimensions() {
    this.setState({
      maxCols: this.calcMax(window.innerWidth, EndpointPanel.epWidth, EndpointPanel.epXPad),
      maxRows: this.calcMax(window.innerHeight - EndpointPanel.statusHeight, EndpointPanel.epHeight, EndpointPanel.epYPad),
    })
    this.render()
  }
  
  render() {
    let w = EndpointPanel.epWidth, h = EndpointPanel.epHeight;
    let xp = EndpointPanel.epXPad, yp = EndpointPanel.epYPad;
    const cells = []
  
    const calcPosition = (dimension, padding, cellIdx) => {return (padding*(cellIdx+1)) + (dimension*cellIdx)}
    for(let y = 0; y < this.state.maxRows; ++y) {
      for(let x = 0; x < this.state.maxCols; ++x) {
          let cell = <Endpoint x={calcPosition(w, xp, x)} y={calcPosition(h, yp, y)} epid="1" title="HSM 1 (Barry)"/>
          cells.push(cell)
      }
    }
  
    return (
    <div className="Endpoint-Panel">
        <svg width={window.innerWidth} height={window.innerHeight - EndpointPanel.statusHeight}>
          {cells}
          <text x="50" y="50">{"Max Cols: " + this.state.maxCols + ". Max Rows:" + this.state.maxRows}</text>
        </svg>
    </div>
    );
  }

  static get epHeight() { return epHeight; }
  static get epWidth() { return epWidth;}
  static get epXPad() { return epxpad; }
  static get epYPad(){ return epypad; }
  static get statusHeight(){ return statusBarHeight; }
}

export default EndpointPanel;
