import React, {Component} from 'react';
import Endpoint from './endpoint/endpoint'

class EndpointPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
        endpoints: props.endpoints,
    }
    //let self = this
  }

  render() {
   const panelWidth = 800, panelHeight = 600 
   const epxpad = 10, epypad = 10  
   return (
    <div className="Endpoint-Panel">
        <svg width={panelWidth} height={panelHeight}>
           <Endpoint x={0+epxpad} y={0+epypad} epid="1" title="HSM 1 (Barry)"/>   
        </svg>
    </div>
   );
  }
}

export default EndpointPanel;
