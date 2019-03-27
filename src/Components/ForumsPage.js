import React, {Fragment} from "react";
import ForumsList from './ForumsList.js'


class Forums extends React.Component {

  constructor(props){
    super(props)
  }


  handleForumClick=(e)=>{
    console.log('in handleforum click',e)
  }

}
export default Forums
