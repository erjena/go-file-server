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

    this.requestFolder = this.requestFolder.bind(this);
    this.handleDirClick = this.handleDirClick.bind(this);
    this.handlePathClick = this.handlePathClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  componentDidMount(event) {
    this.requestFolder([]);
  }

  requestFolder(newStack) {
    axios.post('/list', { path: newStack })
    .then((response) => {
      let files = [];
      let dirs = [];
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].is_dir) {
          dirs.push(response.data[i].name);
        } else {
          files.push({
            "name": response.data[i].name,
            "last_modify": response.data[i].mod_time.slice(0, 10)
          });
        }
      }
  
      this.setState({
        stack: newStack,
        files: files,
        dirs: dirs
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleDirClick(dirName) {
    let newStack = this.state.stack.slice();
    newStack.push(dirName);
    this.requestFolder(newStack);
  }

  handlePathClick(ind) {
    let newStack = this.state.stack.slice(0, ind+1); 
    this.requestFolder(newStack);
  }

  // handleUpload() {

  // }

  handleDownload(fileName) {
    // console.log('client side ', fileName)
    let idx = this.state.stack.indexOf(fileName);
    let path = this.state.stack.slice(0, idx+1).join('/');
    axios.post('/download', {
      path: encodeURI(path)
    })
    .then((response) => {
      console.log('response from download', response);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="list">
        <RenderPath path={this.state.stack} onClick={this.handlePathClick} />
        <ListDir dirs={this.state.dirs} onClick={this.handleDirClick} />
        <ListFiles files={this.state.files} onClick={this.handleDownload}/>
        <button className="uploadButton" onClick={this.handleUpload}> Upload </button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
