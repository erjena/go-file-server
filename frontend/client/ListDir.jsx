import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

class ListDir extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event.target.id);
  }

  render() {
    let list = this.props.dirs.map((dir) => (
      <span key={dir}>
      <p id={dir} onClick={this.handleClick}>
        <FontAwesomeIcon icon={faFolderOpen} size="1x" className="icon"/>
        {dir}
      </p>
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