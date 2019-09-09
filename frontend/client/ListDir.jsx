import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

class ListDir extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event.target.id);
  }

  handleRename(event) {
    let newName = prompt("Please enter new directory name: ");
    if (newName !== null) {
      this.props.onRenameClick(event.target.id, newName)
    }
  }

  handleDelete(event) {
    this.props.onDeleteClick(event.target.id, true);
  }

  render() {
    let list = this.props.dirs.map((dir) => (
      <span key={dir}>
      <p id={dir} onClick={this.handleClick}>
        <FontAwesomeIcon icon={faFolderOpen} size="1x" className="icon"/>
        {dir}
      </p>
      <button className="renameButton" id={dir} onClick={this.handleRename}> Rename </button>
      <button className="deleteButton" id={dir} onClick={this.handleDelete}> Delete </button>
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

export default ListDir;