import React, {Component} from 'react';
import './App.css';
import StatusBar from './components/statusbar'
import EndpointPanel from './components/endpointPanel'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        color: 'white',
        message: 'Initialising...',
    }
    //let self = this
  }

  componentDidMount() {
    const exceptionHandler = () => {
      var numRetries = 5
      const countDown = () => {
        this.setState({message: `Server fetch failed, retrying in ${numRetries} seconds...`, color: 'red'})
        numRetries--
        if (numRetries < 0) {
          clearInterval(countDownTimer)
          return
        }
      }
      var countDownTimer = setInterval(countDown, 995)
    }

    const fetchEndpointTopology = () => {
      this.setState({message: "Attempting to fetch endpoint topology data", color: 'yellow'})
      fetch('http://localhost:3031/endpoints')
      .then(result => result.json())
      .then(() => {
          //this.setState({endpoints: data})
          this.setState({message: "Got endpoint topology data from server 👍", color: '#00FF00'}) 
          clearInterval(fetchTopologyTimer)
          return
      })
      .catch(exceptionHandler)
   }

    var fetchTopologyTimer = setInterval(fetchEndpointTopology, 6000)
  }

  render() {
   return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Endpoint Visualiser</h1>
      </header>
      <EndpointPanel />
      <StatusBar color={this.state.color} message={this.state.message} />
    </div>
   );
  }
}

export default App;
