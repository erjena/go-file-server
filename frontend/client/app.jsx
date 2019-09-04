import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ListDir from "./ListDir";
import ListFiles from "./ListFiles";
import "../public/main.css"

class App extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      files: [],
      dirs: []
    }

    this.processData = this.processData.bind(this);
  }

  componentDidMount(event) {
    axios.get('/list')
      .then((response) => {
        this.setState({
          data: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.processData(this.processData)
      })
  }

  processData() {
    let files = [];
    let dirs = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].is_dir) {
        dirs.push(this.state.data[i].name);
      } else {
        files.push({
          "name": this.state.data[i].name,
          "last_modify": this.state.data[i].mod_time.slice(0, 10)
        });
      }
    }

    this.setState({
      files: files,
      dirs: dirs
    })
  }

  render() {
    return (
      <div className="list">
        <ListDir dirs={this.state.dirs} />
        <ListFiles files={this.state.files} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))