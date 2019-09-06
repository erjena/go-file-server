import React from "react";

class ListFiles extends React.Component {
  constructor(props) {
    super(props)

    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload(event) {
    this.props.onClick(event.target.id);
  }
  
  render() {
    let list = this.props.files.map((file) => (
      <span key={file.name}>
        <div className="textContainer">
        <p> {file.name} </p>
        <p className="lastModify"> Modified at: {file.last_modify} </p>
        </div>
        <button id={file.name} onClick={this.handleDownload}> Download </button>
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