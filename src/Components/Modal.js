import React,{Fragment} from "react";
import ReactModal from 'react-modal'
import {connect} from 'react-redux'

//lib imports
import axios from 'axios'
import { Form } from 'semantic-ui-react'
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';




//action imports
import {fetchCurrentUser} from '../Actions';

//constants imports
import {USERURL} from '../Constants'

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
  const {currentUser} = this.props;
  const {selectedFile} = this.state;
  event.preventDefault()
  if(this.state.selectedFile){

    let fd = new FormData();
    fd.append('image',selectedFile,selectedFile.name)
    console.log(`fileuploadhandler - fd:`,fd);
    console.log(`fileuploadhandler - currentuser:`, currentUser)

    axios.post(USERURL+currentUser.id+'/imageupload',{
      "profilePic": fd,
      "user": currentUser
    })
    // .then(res=>res.json())
    .then(res=>{

      this.props.fetchCurrentUser(res.data)
    }
    );
  }
}

fileSelectedHandler= async (event)=>{
  const {currentUser} = this.props;
  // const {selectedFile} = this.state;
  this.setState({selectedFile:event.target.files[0]})
  if(event.target.files[0]){
    let fd = new FormData();
    fd.append('image',event.target.files[0])
     await fetch(USERURL+currentUser.id+`/imageupload`, {
      method: "POST",
      body: fd
    });
    // const uploadedImage = await data.json();
    // if (uploadedImage) {

    // } else {
    //   console.log("Error Found");
    // }

  }
}


onChange=(e,c)=> {
   // current array of options
   const options = this.state.options
   if (e.target.checked) {
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
    //map over list of all comapnies and create a checkbox for each

    return this.props.companiesValue.map((company,key)=> {
      return(
        <div key={key}>
        <label>{company.name}
          <Checkbox label={company.name} checked={companyIds.includes(company.id)}  onChange={(e) => this.onChange(e,company)}  />
        </label>
        </div>
      )
    })
  }
}

  handleEditFormChange=(e)=>{
    let value = e.target.value;
    let name = e.target.name;

    this.setState({
      [name]: value
    })
  }



  renderEditModal = () => {
    //make modal smaller
    if(this.props.state.modal){

      return (
        <div >
          <ReactModal
            id='editmodal'
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

            <br/>
            <Form>
              <div className='row'>
                <div className='col-4'>
                  <div className="control">
                    <input type="file" name="file" id='file' className='inputfile' onChange={this.fileSelectedHandler}/>
                    <label htmlFor="file" className='btn-2'>Upload Profile Picture</label>
                  </div>

                  <br/>

                  <Form.Field>
                    <label><h4>Companies:</h4></label>
                    <br/>
                    {this.renderCheckBoxes()}
                </Form.Field>



              </div>

                <div className='col-8'>
                  <Form.Field>
                    <TextField
                      name="nameValue"
                      label="Name"
                      value={this.state.nameValue}
                      onChange={(e)=>this.handleEditFormChange(e)}
                      style={{width:'50%'}}
                      />
                  </Form.Field>
                  <br/>

                  <Form.Field>
                    <TextField
                      name="experienceValue"
                      type="number"
                      label="Experience"
                      value={this.state.experienceValue}
                      onChange={(e)=>this.handleEditFormChange(e)}
                      style={{width:'50%'}}
                      />
                  </Form.Field>
                  <br/>

                  <Form.Field>
                    <TextField
                      name="ratingValue"
                      type="number"
                      label="Rating"
                      value={this.state.ratingValue}
                      onChange={(e)=>this.handleEditFormChange(e)}
                      style={{width:'50%'}}
                      />
                  </Form.Field>
                  <br/>

                  <Form.Field>
                    <TextField
                      name="carValue"
                      type="text"
                      label="Car"
                      value={this.state.carValue}
                      onChange={(e)=>this.handleEditFormChange(e)}
                      style={{width:'50%'}}
                      />
                  </Form.Field>
                  <br/>

                  <Form.Field>
                    <TextField
                      name="locationValue"
                      type="text"
                      label="Base Location"
                      value={this.state.locationValue}
                      onChange={(e)=>this.handleEditFormChange(e)}
                      style={{width:'50%'}}

                      />
                  </Form.Field>
                  <br/>
                </div>


              </div>



              <button className='btn-primary savebutton' type="submit" onClick={(e, state)=>this.props.handleSubmit(e, this.state)}>Save</button>
            </Form>


          </ReactModal>
        </div>
    )}
  }

  render(){

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
