import React from "react";

let ListFiles = ({ files }) => (
  <div>
  {files.map(file => (
  <span key={file.name}>
    <p> {file.name} </p><p className="lastModify"> Modified at: {file.last_modify} </p>
    <p className="HorizontalLine">
      ______________________________________________________________________________________
    </p>
    </span>
  ))}
  </div>
)

// class ListFiles extends React.Component {
//   constructor(props) {
//     super(props)
//   }
  
//   render() {
//     console.log(this.props.files)
//     let list = this.props.files.map((file) => {
//       <span>
//         <p>file</p>
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

export default ListFiles;