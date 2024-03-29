import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import fileDownload from "js-file-download";
import contentDisposition from "content-disposition";
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
      dirs: [],
      selectedFile: null
    }

    this.requestFolder = this.requestFolder.bind(this);
    this.handleDirClick = this.handleDirClick.bind(this);
    this.handlePathClick = this.handlePathClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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
          if (response.data[i].name !== ".DS_Store") {
            files.push({
              "name": response.data[i].name,
              "last_modify": response.data[i].mod_time.slice(0, 10)
            })
          }
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

  handleDownload(fileName) {
    let path = this.state.stack.slice();
    path.push(fileName)
    axios.post('/download', {
      path: path
    })
    .then((response) => {
      let disposition = contentDisposition.parse(response.headers["content-disposition"]);
      let fileName = disposition.parameters.filename;
      fileDownload(response.data, fileName)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleRename(oldName, newName) {
    let oldPath = this.state.stack.slice();
    oldPath.push(oldName);
    let newPath = this.state.stack.slice();
    newPath.push(newName);
    axios.post('/rename', {
      oldPath: oldPath,
      newPath: newPath
    })
    .then((response) => {
      this.requestFolder([]);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleDelete(fileName, isDir) {
    let path = this.state.stack.slice();
    path.push(fileName)
    axios.post('/delete', {
      path: path
    })
    .then((response) => {
      if (isDir) {
        let dir = this.state.dirs.slice();
        let idx;
        for (let i = 0; i < dir.length; i++) {
          if (dir[i].name === fileName) {
            idx = i;
            break;
          }
        }
        dir.splice(idx, 1); 
        this.setState({ dirs: dir })
      } else {
        let idx;
        let files = this.state.files.slice();
        for (let i = 0; i < files.length; i++) {
          if (files[i].name === fileName) {
            idx = i;
            break;
          }
        }
        files.splice(idx, 1); 
        this.setState({ files: files })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleChange(event) {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  handleUpload(event) {
    let formData = new FormData();
    formData.append("dirName", JSON.stringify({ path: this.state.stack }))
    formData.append("fileContent", this.state.selectedFile);
    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      this.requestFolder(this.state.stack);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="list">
        <RenderPath path={this.state.stack} onClick={this.handlePathClick} />
        <ListDir dirs={this.state.dirs} onClick={this.handleDirClick} onRenameClick={this.handleRename} onDeleteClick={this.handleDelete} />
        <ListFiles files={this.state.files} onClick={this.handleDownload} onRenameClick={this.handleRename} onDeleteClick={this.handleDelete} />
        <span>
          <input type="file" id="myFile" value={this.value} onChange={this.handleChange} />
          <button className="uploadButton" onClick={this.handleUpload}> Upload </button>
        </span>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
