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

import ClienteForm from './ClienteForm'
import ClienteList from './ClienteList'
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
      clientes: [],
      funcao: [],
      financeiro: [],
      saldofinal: [],
      id_cliente_financeiro: [],
      saldo_total: [],
      nome_cliente: [],
    }
  }

	formatMoney () {
		return new Intl.NumberFormat('pt', {
			style: 'currency',
			currency: 'BRL',
		})
	}

  setSaldo (soma) {
    this.setState({saldo_total: soma})
  }

  delPgtParc ( id, idcliente ) {

    swalWithBootstrapButtons.fire({
      title: 'Tem Certeza?',
      text: "Quer mesmo excluir este pagamento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        api.post("carteiradelete",({id})).then(resp => { 
          this.listFinanceiro(idcliente) 

          swalWithBootstrapButtons.fire(
            'Excluido!',
            'Pagamento excluido.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          'A ação foi cancelada!',
          'error'
        )
      }
    })
  }

  listClientes(busca) {
    api.post("clientelist",({busca})).then((resp) => {
      const data = resp.data
      this.setState({clientes: data})
    })
  }

  CreateCliente(values) {
    api.post("cliente", (values)).then((resp) => {
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
      document.getElementById("nome").value = "";
      document.getElementById("telefone").value ="";
      document.getElementById("cpf").value = "";
      document.getElementById("funcao").value = "*Escolha a Função*";
      document.getElementById("id_cliente").value = null;
      this.listClientes()
    })
  }

  listFuncao() {
    api.get('clientelistfuncao').then(resp => {
      const data = resp.data;
      this.setState({funcao: data})
    })
  }

  deleteCliente (id){
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
        api.post("clientedelete",(id)).then(resp => {
          this.listClientes()
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

  listFinanceiro (idcliente,nome) {
    api.post("carteiralist",({idcliente})).then(resp => {
      const data = resp.data;
      var saldo = 0;

      for (var i = 0; i < data.length; i++) {
        var credito = `${data[i].credito}`;
        var debito = `${data[i].debito}`;
        var contador = (parseFloat(credito) - parseFloat(debito)) + saldo;
        saldo = contador;
      }
      
      this.setState({financeiro: data});
      this.setState({id_cliente_financeiro: idcliente})
      this.setState({nome_cliente: nome})
      this.setState({saldo_total: saldo})
    })
  }

  addFinanceiro ( values ){
    api.post("carteiraaddfinanceiro", (values)).then(resp => {
      this.listFinanceiro(values.idcliente)
      if(parseFloat(values.credito) == 0) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Débito Adicionado!',
          showConfirmButton: false,
          timer: 1500
        })
      }else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Crédito Adicionado!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  componentDidMount() {
    this.listClientes()
    this.listFuncao()
  }

  render() {
  return (
    <div className="Container_Cliente_Cadastro">
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='50%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className='custom_container_100'>
            <ClienteForm props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
        <ContentLayout width='50%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className='custom_container_100'>
            <ClienteList props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
      </VuroxLayout>
    </div>
    );
  }
}

export default ListClienteCadastro;