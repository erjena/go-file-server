import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

class App extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount(event) {
    axios.get('/list')
      .then((response) => {
        console.log('success', response);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>I am React</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))