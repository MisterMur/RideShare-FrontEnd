import React,{Fragment} from "react";
import ReactModal from 'react-modal'

class Modal extends React.Component{

  state=({
    nameValue: this.props.props.user.name,
    experienceValue: this.props.props.user.experience,
    ratingValue: this.props.props.user.rating,
    locationValue: this.props.props.user.location,
    carValue: this.props.props.user.car,
    companiesValue: this.props.props.user.companies
  })

  componentDidMount(){
    // debugger
    this.setState({
      nameValue: this.props.props.user.name,
      experienceValue: this.props.props.user.experience,
      ratingValue: this.props.props.user.rating,
      locationValue: this.props.props.user.location,
      carValue: this.props.props.user.car,
      companiesValue: this.props.props.user.companies
    })
  }


  handleCheckChange = (company) => {
    console.log("handling check change")
    let companyIds = this.state.companiesValue.map(company => company.id)
    if(companyIds.includes(company.id)){
      // debugger
      let companiesCopy = [...this.state.companiesValue]
      // debugger
      let newCompanies = companiesCopy.filter(co => co.id !== company.id)
      this.setState({
        companiesValue: newCompanies
      })
    }
    else {
      // debugger
      let otherCompaniesCopy = [...this.state.companiesValue]
      otherCompaniesCopy.push(company)
      // debugger
      let newCompanies = otherCompaniesCopy
      this.setState({
        companiesValue: newCompanies
      })
    }
  }


  renderChecks = () => {
    if(this.props.state.user){
      // debugger
      let companyIds = this.state.companiesValue.map(company => company.id)
      return this.props.props.allCompanies.map(company=> {
        return(
          <label>{company.name}
            <input onChange={() => this.handleCheckChange(company)} type="checkbox" checked={companyIds.includes(company.id)}></input>
          </label>
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
              {this.renderChecks()}
            </label><br/>

            <button type="submit" onClick={(e, state)=>this.props.handleSubmit(e, this.state)}>Save Edit</button>
          </form>
          <button onClick={this.props.handleAfterClose}>Close Modal</button>


      </ReactModal>
    )}
  }

  render(){
    // debugger
    console.log(this.state)
    console.log(this.props)
    return(
      <Fragment>
        {this.renderEditModal()}
      </Fragment>
    )
  }

}

export default Modal
