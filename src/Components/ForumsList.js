import React, {Fragment} from "react"
import Forum from "./Forum.js"

const ForumList = (props) => {

  const renderForum=()=>{
    if(props.forums){

      function uniqueForums(array) {
       return array.filter((e, i) => array.findIndex(a => a.topic === e.topic) === i);
      }

      return uniqueForums(props.forums).map((forum,key)=>{
        return <Fragment>
          <Forum
            handleForumClick={props.handleForumClick}
            key={key}
            idx={key+1}
            forum={forum}
          />
        </Fragment>
        }
      )
    }
  }

  return (
    <div className="profile-forums">
      <table className="table table-striped" >
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
