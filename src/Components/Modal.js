import React,{Fragment} from "react";
import ReactModal from 'react-modal'

class Modal extends React.Component{


  renderChecks = () => {
    if(this.props.props.allCompanies){
      if(this.props.state.companies){
        let companyIds = this.props.state.companies.map(company => company.id)
        return this.props.props.allCompanies.map(company=> {

          return(
            <label>{company.name}
              <input onChange={this.handleCheckChange} type="checkbox" checked={companyIds.includes(company.id)}></input>
            </label>
          )
        })
      }
    }
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
              <input name="name" type="text" onChange={(e)=>this.props.handleEditFormChange(e)} value={this.props.state.name}></input>
            </label><br/>

            <label>Experience:
              <input name="experience" type="text" onChange={(e)=>this.props.handleEditFormChange(e)} value={this.props.state.experience}></input>
            </label><br/>

            <label>Rating:
              <input name="rating" type="text" onChange={(e)=>this.props.handleEditFormChange(e)} value={this.props.state.rating}></input>
            </label><br/>

            <label>Car:
              <input name="car" type="text" onChange={(e)=>this.props.handleEditFormChange(e)} value={this.props.state.car}></input>
            </label><br/>

            <label>Location:
              <input name="location" type="text" onChange={(e)=>this.props.handleEditFormChange(e)} value={this.props.state.location}></input>
            </label><br/>

            <label>Companies:
              {this.renderChecks()}
            </label><br/>

            <button type="submit" onClick={(e)=>this.props.handleSubmit(e)}>Save Edit</button>
          </form>
          <button onClick={this.props.handleAfterClose}>Close Modal</button>


      </ReactModal>
    )}
  }

  render(){
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
