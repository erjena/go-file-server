import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import RenderPath from "./RenderPath";
import ListDir from "./ListDir";
import ListFiles from "./ListFiles";
import "../public/main.css"

class App extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      stack: [],
      files: [],
      dirs: []
    }

    this.processData = this.processData.bind(this);
    this.handleDirClick = this.handleDirClick.bind(this);
    this.handlePathClick = this.handlePathClick.bind(this);
  }

  componentDidMount(event) {
    axios.get('/list?dir=')
      .then((response) => {
        this.processData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  processData(data, dirName) {
    let files = [];
    let dirs = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_dir) {
        dirs.push(data[i].name);
      } else {
        files.push({
          "name": data[i].name,
          "last_modify": data[i].mod_time.slice(0, 10)
        });
      }
    }

    let stack = [];
    if (dirName) {
      if (dirName !== this.state.stack[this.state.stack.length-1]) {
        stack.push(dirName)
        stack = this.state.stack.concat(stack);
        this.setState({ stack: stack })
      }
    }

    this.setState({
      files: files,
      dirs: dirs
    })
    console.log('stack', this.state.stack)
  }

  handleDirClick(dirName) {
    let id = encodeURI(this.state.stack.join('/'));
    axios.get(`/list?dir=${id}`)
    .then((response) => {
      this.processData(response.data, dirName)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handlePathClick(folderName) {
    let path = [];
    for (let i = 0; i < this.state.stack.length; i++) {
      if (this.state.stack[i] === folderName) {
        path = this.state.stack.slice(0, i+1);
        break;
      }
    }

    this.setState({
      stack: path
    })
    this.handleDirClick();
  }

  // handleUpload() {

  // }

  // handleDownload() {

  // }

  render() {
    return (
      <div className="list">
        <RenderPath path={this.state.stack} onClick={this.handlePathClick} />
        <ListDir dirs={this.state.dirs} onClick={this.handleDirClick} />
        <ListFiles files={this.state.files} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
