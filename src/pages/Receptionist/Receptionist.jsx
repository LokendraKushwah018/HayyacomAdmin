import React from 'react'
import Container from '../../components/Container'

const Receptionist = () => {
  return (
    <Container>
    <div className='content-wrapper'>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h3>User Event </h3>
          </div>  
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right mr-5"> 
            <p type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">          
              <button className="btn text-white" style={{backgroundColor:"#6F0A12"}}>Add Event  <i className='fas fa-plus'/></button></p>
            </ol>
          </div>  
        </div>
      </div>
    </section>
    </div>
    </Container>
  )
}

export default Receptionist
