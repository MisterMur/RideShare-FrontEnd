import React from "react"
import Forum from "./Forum.js"

const ForumList = (props) => {

  const renderForum=()=>{
    if(props.forums.length>0){

      function uniqueForums(array) {
       return array.filter((e, i) => array.findIndex(a => a.topic === e.topic) === i);
      }

      return uniqueForums(props.forums).map((forum,idx)=>{
        return (
            <Forum
              handleForumClick={props.handleForumClick}
              key={forum.id}
              idx={idx+1}
              forum={forum}
              />


        )

        }
      )
    }
    else{
      return (<>
        <tr>
          <td colSpan='1'>
             <p style={{align:'center',justify:'centered',}}>
               Not a member of any Forums
             </p>
          </td>
        </tr>
        </>)
    }
  }

  // <th scope="col">Num</th>
  return (
    <div className='forumstable' >
      <table className="table table-striped" >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Forum Topic</th>
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
