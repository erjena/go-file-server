import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

class RenderPath extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event.target.id);
  }

  render() {
    let renderPath = this.props.path.map((folderName, i) => (
      <span key={i}>
        <span className="rightArrow">
          <FontAwesomeIcon icon={faAngleRight} size="sm" />
        </span>
        <p id={i} className="renderPath" onClick={this.handleClick}>
          {folderName}
        </p>
      </span>
    ))
    return (
      <div>
        <span>
          <p id={-1} className="renderPath" onClick={this.handleClick}> Root </p>
        </span>
        {renderPath}
      </div>
    )
  }
}

export default RenderPath;