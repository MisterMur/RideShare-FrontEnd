import React from "react"
import Forum from "./Forum.js"

const ForumList = (props) => {
  const renderForum=()=>{
    if(props.forums){
      return props.forums.map((forum,key)=>
        <Forum
          key={key}
          idx={key+1}
          forum={forum}
        />
      )
    }
  }
  return (
    <div >
      <table className="table table-striped" id="profile-forums">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Num</th>
            <th className="col" scope="col">Topic</th>
          </tr>
        </thead>
        <tbody>
          {renderForum()}
        </tbody>
      </table>
    </div>
  )
}

export default ForumList
