import React from "react";

class ListFiles extends React.Component {
  constructor(props) {
    super(props)

    this.handleDownload = this.handleDownload.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDownload(event) {
    this.props.onClick(event.target.id);
  }

  handleRename(event) {
    let newName = prompt("Please enter new file name: ");
    if (newName !== null) {
      this.props.onRenameClick(event.target.id, newName)
    }
  }

  handleDelete(event) {
    this.props.onDeleteClick(event.target.id, false);
  }
  
  render() {
    let list = this.props.files.map((file) => (
      <span key={file.name}>
        <div className="textContainer">
        <p id={file.name} onClick={this.handleDownload}> {file.name} </p>
        <p className="lastModify"> Modified at: {file.last_modify} </p>
        </div>
        <button className="renameButton" id={file.name} onClick={this.handleRename}> Rename </button>
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