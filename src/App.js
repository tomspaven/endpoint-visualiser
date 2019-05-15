import React, {Component} from 'react';
import './App.css';
import StatusBar from './components/statusbar'
import EndpointPanel from './components/endpointPanel'

class App extends Component {

  state = {
    color: 'white',
    message: 'Initialising...',
    endpoints: [],
  }
    //let self = this

  componentDidMount() {
    const exceptionHandler = () => {
      let numRetries = 5
      const countDown = () => {
        this.setState({message: `Server fetch failed, retrying in ${numRetries} seconds...`, color: 'red'})
        numRetries--
        if (numRetries < 0) {
          clearInterval(countDownTimer)
          return
        }
      }
      const countDownTimer = setInterval(countDown, 995)
    }

    const fetchEndpointTopology = () => {
      this.setState({message: "Attempting to fetch endpoint topology data", color: 'yellow'})
      fetch('http://localhost:3031/endpoints')
      .then(result => result.json())
      .then(data => {
          this.setState({
            message: "Got endpoint topology data from server 👍", color: '#00FF00',
            endpoints: data,
          }) 
          clearInterval(fetchTopologyTimer)
          return
      })
      .catch(exceptionHandler)
   }

    const fetchTopologyTimer = setInterval(fetchEndpointTopology, 6000)
  }

  render() {
   return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Endpoint Visualiser</h1>
      </header>
      <EndpointPanel endpoints={this.state.endpoints}/>
      <StatusBar color={this.state.color} message={this.state.message} />
    </div>
   );
  }
}

export default App;
