import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'
import ReactModal from 'react-modal'

class Profile extends React.Component {


  state={
    modal:false,
    name:this.props.user.name,
    companies:this.props.user.companies,
    location:this.props.user.location,
    rating:this.props.user.rating,
    id:this.props.user.id

  }



  handleEdit = (e) => {
    console.log(e)
    this.setState({modal:true})
    // this.renderEditModal()
  }
  handleEditFormChange=(e)=>{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });


  }
  handleAfterOpen=()=>{
    console.log('opened')
  }
  handleAfterClose=()=>{
    console.log('closed')
    this.setState({modal:false})
  }
  handleSubmit=()=>{
    console.log('in save edit')
  }

  postEditProfile(){
    const profileUrl=`http://localhost:3000/api/v1/users/${this.state.id}`
    fetch(profileUrl,{
      method:'PATCH',
      body:JSON.stringify({
        name:this.state.name,

      })
    })
  }
  renderEditModal(){
    //make modal smaller
    return (
      <ReactModal
        isOpen={this.state.modal}
        onAfterOpen={this.handleAfterOpen}
        onRequestClose={this.handleAfterClose}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        data={{
          background: "green"
        }}

        contentLabel="example modal"
        >

        <form>
          <input type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.props.user.name}></input><br/>
          <input type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.props.user.experience}></input><br/>
          <input type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.props.user.rating}></input><br/>
          <input type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.props.user.car}></input><br/>
          <input type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.props.user.location}></input><br/>
          <button type="submit" onClick={this.handleSubmit}>Save Edit</button>
        </form>
        <button onClick={this.handleAfterClose}>Close Modal</button>


      </ReactModal>
    )
  }



  render() {

    // console.log("hit profile route", this.props)

    return (
      <Fragment>
        <div className = "container col-11">
          <div className="row justify-content-center">
            <div className="col-3 justify-content-center" id="profile-card-container">
              <ProfileCard user={this.props.user}/>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="edit-profile" onClick={this.handleEdit}> Edit Profile </button>
{/****************************************************************/}
              {this.renderEditModal()}



            {/****************************************************************/}

            </div>


            <div className="col" id="profile-rides-list">
              <RideList rides={this.props.user.rides}/>
              <ForumsList forums={this.props.user.forums}/>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Profile
