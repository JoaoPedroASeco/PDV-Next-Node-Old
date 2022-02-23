import React, { Component,useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2'
import auth from '../../services/auth';
import api from '../../services/api';

import {
	VuroxLayout,
	HeaderLayout,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

import SidebarComponent from './SidebarComponent'
import UserOptions from './UserOptions'

class User extends Component {

  constructor(props){
    super(props)
    this.state = {
      dados_usuario: [],
    }
  }

  BuscaDadosCliente () {
    api.post("userlist",({busca: ""})).then(resp => {
      console.log(resp)
      const id = localStorage.getItem("user-id");
      const data = resp.data;
      for (var i = 0; i < data.length; i++) {
        if(data[i].us_id == id) {
          this.setState({dados_usuario: data[i]})
        }
      }
    })
  }

  componentDidMount() {
    this.BuscaDadosCliente()
  }

  render() {
    return (
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='100%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className='custom_container_100'>
            <UserOptions props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
      </VuroxLayout>
    );
  }
}

export default User;
