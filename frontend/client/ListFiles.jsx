import React from "react";

class ListFiles extends React.Component {
  constructor(props) {
    super(props)

    this.handleUpload = this.handleUpload.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleUpload(event) {
    this.props.handleUpload();
  }

  handleDownload(event) {
    this.props.handleDownload();
  }
  
  render() {
    let list = this.props.files.map((file) => (
      <span key={file.name}>
        <p> {file.name} </p><p className="lastModify"> Modified at: {file.last_modify} </p>
        <button onClick={this.handleUpload}> Upload </button>
        <button onClick={this.handleDownload}> Download </button>
        <hr className="HorizontalLine"></hr>
      </span>
    ))

    return (
      <div>
        {list}
      </div>
    )
  }
}

export default ListFiles;