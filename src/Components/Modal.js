import React,{Fragment} from "react";
import ReactModal from 'react-modal'
import {connect} from 'react-redux'

//lib imports
import axios from 'axios'

//constants imports
import {USERURL} from '../Constants'

//action imports
import {fetchCurrentUser} from '../Actions';


class Modal extends React.Component{

  state=({
    nameValue: this.props.props.user.name,
    experienceValue: this.props.props.user.experience,
    ratingValue: this.props.props.user.rating,
    locationValue: this.props.props.user.location,
    carValue: this.props.props.user.car,
    userCompanies:this.props.currentUser.companies,
    companiesValue: [],
    options:[],
    selectedFile:[],
  })

  componentDidMount(){
    this.setState({
      nameValue: this.props.currentUser.name,
      experienceValue: this.props.currentUser.experience,
      ratingValue: this.props.currentUser.rating,
      locationValue: this.props.currentUser.location,
      carValue: this.props.currentUser.car,
      companiesValue: this.props.companiesValue,
      allCompanies:this.props.companiesValue,
      userCompanies:this.props.currentUser.companies
    })
  }
handleCheckBox =(company)=>{
  if(this.state.userCompanies && this.state.allCompanies){
    this.state.allCompanies.map(c=>
      this.state.userCompanies.find(c)
    )

  }
}
fileUploadHandler=(event)=>{
  event.preventDefault()
  if(this.state.selectedFile){

    let fd = new FormData();
    fd.append('image',this.state.selectedFile,this.state.selectedFile.name)

    axios.post(USERURL+this.props.currentUser.id+'/imageupload',fd)
    .then(res=>res.json())
    .then(resUser=>
      this.props.fetchCurrentUser(resUser.user)
    );
  }



}

fileSelectedHandler=(event)=>{
  this.setState({selectedFile:event.target.files[0]})

}


onChange=(e,c)=> {
   // current array of options
   const options = this.state.options
   if (e.target.checked) {
     console.log('pushing into options',c)
     //add checked item to array of selecteed company options
       options.push(c)

   } else {
     //remove the unchecked item from array of selected company options
       options.pop(c)

   }
   // update the state with the new array of options
   this.setState({ options: options })
 }
renderCheckBoxes = () => {

  if(this.props.companiesValue){
    // create a list of company ids in the option array
    //  to use as keys to  distaguish if they are already in the array
    let companyIds = this.state.options.map(company => company.id)
    console.log('options company ids',companyIds)
    //map over list of all comapnies and create a checkbox for each
    return this.props.companiesValue.map((company,key)=> {
      return(
        <>
        <label>{company.name}
          <input type="checkbox" checked={companyIds.includes(company.id)} onChange={(e) => this.onChange(e,company)} ></input>
        </label>
        </>
      )
    })
  }
}

  handleEditFormChange=(e)=>{
    console.log('handling edit', e)
    let value = e.target.value;
    let name = e.target.name;

    this.setState({
      [name]: value
    })
  }



  renderEditModal = () => {
    //make modal smaller
    if(this.props.state.modal){
      // debugger
      return (
        <ReactModal
          isOpen={this.props.state.modal}
          onAfterOpen={this.props.handleAfterOpen}
          onRequestClose={this.props.handleAfterClose}
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
              <input name="nameValue" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.nameValue}></input>
            </label><br/>

            <label>Experience:
              <input name="experienceValue" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.experienceValue}></input>
            </label><br/>

            <label>Rating:
              <input name="ratingValue" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.ratingValue}></input>
            </label><br/>

            <label>Car:
              <input name="carValue" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.carValue}></input>
            </label><br/>

            <label>Location:
              <input name="locationValue" type="text" onChange={(e)=>this.handleEditFormChange(e)} value={this.state.locationValue}></input>
            </label><br/>

            <label>Companies:
              {this.renderCheckBoxes()}
            </label><br/>

            <div className="control">
            <label className="label">Upload image</label>
              <input type="file" name="file" onChange={this.fileSelectedHandler}/>
              <button onClick={this.fileUploadHandler}>Upload</button>
            </div>




            <button type="submit" onClick={(e, state)=>this.props.handleSubmit(e, this.state)}>Save Edit</button>
          </form>
          <button onClick={this.props.handleAfterClose}>Close Modal</button>


      </ReactModal>
    )}
  }

  render(){
    // debugger
    // console.log(this.state)
    // console.log(this.props)
    return(
      <Fragment>
        {this.renderEditModal()}
      </Fragment>
    )
  }

}
const mapDispatchToProps=dispatch=>({
  fetchCurrentUser: u=>dispatch(fetchCurrentUser(u))
})

export default connect(null,mapDispatchToProps)(Modal)
