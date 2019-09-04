import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import "../public/main.css";

let ListDir = ({ dirs }) => (
  <div>
  {dirs.map(dir => (
  <span key={dir}>
    <p><FontAwesomeIcon icon={faFolderOpen} size="2x" className="icon"/>  {dir} </p>
    <p className="HorizontalLine">
      ______________________________________________________________________________________
    </p>
    </span>
  ))}
  </div>
)

// class ListDir extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     console.log(this.props.dirs)
//     let list = this.props.dirs.map((dir) => {
//       <span>
//         <p>Here goes icon: </p><p>dir</p>
//         <p>---------------------------------------------------------------------------------</p>
//       </span>
//     })
//     return (
//       <div>
//         {list}
//       </div>
//     )
//   }
// }

export default ListDir;