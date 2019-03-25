import React from "react"
import Forum from "./Forum.js"

const ForumList = (props) => {
  const renderForum=()=>{
    if(props.user.forums){
      return props.user.forums.map((forum,key)=>
        <Forum
          key={key}
          idx={key+1}
          forum={forum}
        />
      )
    }
  }
  return (
    <div className="">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#id</th>
          <th scope="col">Tags</th>
          <th scope="col"></th>
          <th scope="col">Ended At</th>
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
