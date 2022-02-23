import React, { Component,useState, useContext } from 'react';
import { vuroxContext } from '../../../context'
import Sidebar from 'Templates/HeaderSidebar';
import api from '../../../services/api'
import auth from '../../../services/auth'
import Swal from 'sweetalert2'

import {
	VuroxLayout,
	HeaderLayout,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import FuncionarioForm from './FuncionarioForm'
import FuncionarioList from './FuncionarioList'
import SidebarComponent from './SidebarComponent'

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

class ListClienteCadastro extends Component {

  constructor(props){
    super(props)
    this.state = {
      funcionarios: [],
      funcao: [],
      financeiro: [],
      saldofinal: [],
      id_cliente_financeiro: [],
      saldo_total: [],
      nome_cliente: [],
    }
  }

  listFuncionario ( busca ) {
    api.post("userlist",({busca})).then((resp) => {
      var data = resp.data
      this.setState({funcionarios: data})
    })
  }

  CreateFuncionario ( values ) {
    api.post("user", (values)).then((resp) => {

      if(!values.id || values.id == "") {
        Toast.fire({
          icon: 'success',
          title: `Cliente criado!`
        })
      }else {
        Toast.fire({
          icon: 'success',
          title: `Dados do cliente atualizado!`
        })
      }

      document.getElementById("username").value = "";
      document.getElementById("password").value ="";
      document.getElementById("email").value = "";
      document.getElementById("create_up").checked = false;
      document.getElementById("list_up").checked = false;
      document.getElementById("update_up").checked = false;
      document.getElementById("delete_up").checked = false;
      document.getElementById("id_funcionario").value = null;
      this.listFuncionario()
    })
  }

  deleteFuncionario ( id ){
    swalWithBootstrapButtons.fire({
      title: 'Tem Certeza?',
      text: "Quer mesmo deletar este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        api.post("deluser",(id)).then(resp => {
          this.listFuncionario()
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  componentDidMount () {
    this.listFuncionario()
  }

  render() {
  return (
    <div className="Container_Cliente_Cadastro">
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='50%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className='custom_container_100'>
            <FuncionarioForm props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
        <ContentLayout width='50%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className='custom_container_100'>
            <FuncionarioList props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
      </VuroxLayout>
    </div>
    );
  }
}

export default ListClienteCadastro;