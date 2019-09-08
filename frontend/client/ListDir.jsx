import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

class ListDir extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event.target.id);
  }

  handleDelete(event) {
    this.props.onDeleteClick(event.target.id, true);
  }

  render() {
    let list = this.props.dirs.map((dir, i) => (
      <span key={dir}>
      <p id={dir} onClick={this.handleClick}>
        <FontAwesomeIcon icon={faFolderOpen} size="1x" className="icon"/>
        {dir}
      </p>
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