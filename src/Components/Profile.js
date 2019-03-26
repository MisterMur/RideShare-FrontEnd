import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'
import ReactModal from 'react-modal'

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={
      modal:false,
      user:props.user,
      name:props.user.name,
      companies:props.user.companies,
      experience:props.user.experience,
      location:props.user.location,
      rating:props.user.rating,
      id:props.user.id
    }
    console.log('profile constructor props',props)
  }
  componentWillReceiveProps(props){
    this.setState({
      user:props.user,
      name:props.user.name,
      companies:props.user.companies,
      experience:props.user.experience,
      location:props.user.location,
      rating:props.user.rating,
      id:props.user.id


    })
  }





  handleEdit = (e) => {
    console.log(e)
    this.setState({modal:true})
    // this.renderEditModal()
  }
  handleEditFormChange=(e)=>{
    console.log(e.target.value)
    console.log(e.target.name)
    let value = e.target.value;
    let name = e.target.name;

    this.setState({
      [name]: value
    })


  }
  handleAfterOpen=()=>{
    console.log('opened')
  }
  handleAfterClose=()=>{
    console.log('closed')
    this.setState({modal:false})
  }
  handleSubmit=(e)=>{
    e.preventDefault()
    console.log('in save edit user',this.state)
    this.patchEditProfile()

  }

  patchEditProfile(){
    const profileUrl=`http://localhost:3000/api/v1/users/${this.state.id}`
    fetch(profileUrl,{
      headers:{
        'accepts':'application/json',
        'content-type':'application/json'
      },
      method:'PATCH',
      body:JSON.stringify({
        name:this.state.name,
        experience:this.state.experience,
        companies:this.state.companies,
        location:this.state.location,
        rating:this.state.rating,
      })
    })
    .then(res=>{
      console.log(res)
      return res.json()
    })
    .then(editProfile=>{
      this.setState({
        modal:false,
        user: editProfile,
        name:editProfile.name,
        experience:editProfile.experience,
        companies:editProfile.companies,
        location:editProfile.location,
        rating:editProfile.rating
      })
    })
  }

  renderChecks = () => {
    // debugger
    if(this.props.allCompanies){
      // debugger
      let companies = this.props.allCompanies.map(company=> company.name)

      return companies.map(company=> {
        return(
          <label>{company}
            <input type="checkbox" value={company.name}></input>
          </label>
        )

      })
    }

  }

    // <Fragment>
    //   <label>Uber
    //     <input type="checkbox" value="Uber"></input>
    //   </label>
    //   <label>Lyft
    //     <input type="checkbox" value="Lyft"></input>
    //   </label>
    //   <label>Gettaxi
    //     <input type="checkbox" value="Gettaxi"></input>
    //   </label>
    // </Fragment>



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
          <label>Name:
            <input name="name" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.name}></input>
          </label><br/>

          <label>Experience:
            <input name="experience" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.experience}></input>
          </label><br/>

          <label>Rating:
            <input name="rating" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.rating}></input>
          </label><br/>

          <label>Car:
            <input name="car" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.car}></input>
          </label><br/>

          <label>Location:
            <input name="location" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.location}></input>
          </label><br/>

          <label>Companies:
            {this.renderChecks()}
          </label><br/>

          <button type="submit" onClick={(e)=>this.handleSubmit(e)}>Save Edit</button>
        </form>
        <button onClick={this.handleAfterClose}>Close Modal</button>


      </ReactModal>
    )
  }



  render() {
    console.log("rendering profile", this.state)

    // console.log("hit profile route", this.props)

    return (
      <Fragment>
        <div className = "container col-11">
          <div className="row justify-content-center">
            <div className="col-3 justify-content-center" id="profile-card-container">
              <ProfileCard user={this.state.user}/>
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
