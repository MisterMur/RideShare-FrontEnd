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
      <table className="table" id="profile-forums">
        <thead>
          <tr>
            <th class="col" scope="col">Num</th>
            <th class="col-6" scope="col">Topic</th>
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
