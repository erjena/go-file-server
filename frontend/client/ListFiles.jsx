import React from "react";

class ListFiles extends React.Component {
  constructor(props) {
    super(props)

    this.handleDownload = this.handleDownload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDownload(event) {
    this.props.onClick(event.target.id);
  }

  handleDelete(event) {
    this.props.onDeleteClick(event.target.id, false);
  }
  
  render() {
    let list = this.props.files.map((file) => (
      <span key={file.name}>
        <div className="textContainer">
        <p> {file.name} </p>
        <p className="lastModify"> Modified at: {file.last_modify} </p>
        </div>
        <button id={file.name} onClick={this.handleDownload}> Download </button>
        <button className="deleteButton" id={file.name} onClick={this.handleDelete}> Delete </button>
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