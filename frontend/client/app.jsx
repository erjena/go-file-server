import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

class App extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  componentDidMount(event) {
    axios.get('/list')
      .then((response) => {
        this.setState({
          files: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    let list = this.state.files.map((file) => 
      <div key={file.name}>{file.name}</div> 
    )
    return (
      <div>
        {list}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))