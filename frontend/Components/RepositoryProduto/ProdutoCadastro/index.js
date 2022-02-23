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

import ProdutoForm from './ProdutoForm'
import GrupoForm from './GrupoForm'
import ProdutoList from './ProdutoList'
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

class ListProdutoCadastro extends Component {
  constructor(props){
    super(props)
    this.state = {
      produtos: [],
      grupo: [],
      dados_grupo: [],
    }
  }

  formatMoney () {
		return new Intl.NumberFormat('pt', {
			style: 'currency',
			currency: 'BRL',
		})
	}

  ListProd(grupo, busca){
    const values = {grupo: grupo, busca: busca}
    api.post('produtolist',(values)).then(res => {
      var data = res.data
      this.setState({produtos: data})
      if (!grupo) {
        this.setState({grupo_atual: "Todos"})
      }else {
        this.setState({grupo_atual: grupo})
      }
    })
  }

  CreateProduto(values) {
    api.post("produto", (values)).then((resp) => {
      
      if(!values.id || values.id == "") {
        Toast.fire({
          icon: 'success',
          title: `Produto criado!`
        })
      }else {
        Toast.fire({
          icon: 'success',
          title: `Dados do produto atualizado!`
        })
      }
      document.getElementById("nome").value = "";
      document.getElementById("codigo").value = "";
      document.getElementById("preco").value = "";
      document.getElementById("valor_de_custo").value  = "";
      document.getElementById("estoque").value = "";
      document.getElementById("estoqueminimo").value = "";
      document.getElementById("cod_barras").value = "";
      document.getElementById("id_produto").value = ""; 
      document.getElementById("vendaporpeso").checked = false;
      document.getElementById("controleestoque").checked = false;
      document.getElementById("controle_quantidade").checked = false;
      this.ListProd()
    })

  }

  CreateGrupo (grupo) {
    var id = this.state.dados_grupo.id
    var values = { grupo, id}

    api.post("grupoproduto",(values)).then(resp => {
      this.listGrupo()
      if(!id || id == "") {
        Toast.fire({
          icon: 'success',
          title: `Produto criado!`
        })
      }else {
        Toast.fire({
          icon: 'success',
          title: `Dados do produto atualizado!`
        })
      }
      this.setState({dados_grupo: []})
    }) 
  }

  listGrupo() {
    api.post('grupoprodutolist',({busca: ""})).then(resp => {
      const data = resp.data;
      this.setState({grupo: data})
    })
  }

  deleteGrupo (id){
    swalWithBootstrapButtons.fire({
      title: 'Tem Certeza?',
      text: "Quer mesmo deletar este produto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        api.post("grupoprodutodelete",({id})).then(resp => {
          this.listGrupo()

          swalWithBootstrapButtons.fire(
            'Deletado!',
            'Grupo deletado!',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          'Ação cancelada!',
          'error'
        )
      }
    })
  }

  deleteProduto (id){
    swalWithBootstrapButtons.fire({
      title: 'Tem Certeza?',
      text: "Quer mesmo deletar este produto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        api.post("produtodelete",({id})).then(resp => {
          this.ListProd()

          swalWithBootstrapButtons.fire(
            'Deletado!',
            'Produto deletado!',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          'Ação cancelada!',
          'error'
        )
      }
    })
  }

  componentDidMount() {
    this.ListProd()
    this.listGrupo()
  }

  render() {
  return (
    <div className="">
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='50%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className='custom_container_50'>
            <ProdutoForm props={this} />
            <GrupoForm props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
        <ContentLayout width='50%' className='vurox-scroll-x '>
          <VuroxComponentsContainer className=' custom_container_50'>
            <ProdutoList props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
      </VuroxLayout>
    </div>
    );
  }
}

export default ListProdutoCadastro;