import React, {useState, useContext} from 'react'
import Swal from 'sweetalert2'
import auth from '../../services/auth';
import api from '../../services/api';
import InputMask from 'react-input-mask';

import {   
    Form,
    Input,
    Button,
    Radio,
    Select,
    Typography,
    Space, 
    Row, 
    Col
} from 'antd';

import {
	VuroxLayout,
	HeaderLayout,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

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

const ListConfigComponent = ({ props }) => {

  var options = props.state.options;
  var cnpj_empresa = ""
  var endereco_empresa = ""
  var nome_empresa = ""
  var telefone_empresa = ""
  
  for (var i = 0; i < options.length; i++) {
    document.getElementById("cnpj_empresa").value = options[i].cnpj_empresa;
    document.getElementById("endereco_empresa").value = options[i].endereco_empresa;
    document.getElementById("nome_empresa").value = options[i].nome_empresa;
    document.getElementById("telefone_empresa").value = options[i].telefone_empresa;
  }

  const edit = () => {
    var inputs = document.getElementsByClassName("input_form_full")

    for (var i = 0; i < inputs.length; i++) {
      var disabled = inputs[i].disabled;
      if( disabled === true ) {
        inputs[i].disabled = false;
      }
    }
  }

  const cancelar = () => {
    var inputs = document.getElementsByClassName("input_form_full")

    for (var i = 0; i < inputs.length; i++) {
      var disabled = inputs[i].disabled;
      if( disabled === false ) {
        inputs[i].disabled = true;
      }
    }

    Toast.fire({
      icon: 'info',
      title: `Cancelado com sucesso!`
    })

    props.ListOptions()
  }

  const confirm = () => {
    var cnpj_empresa = document.getElementById("cnpj_empresa").value 
    var endereco_empresa = document.getElementById("endereco_empresa").value
    var nome_empresa = document.getElementById("nome_empresa").value
    var telefone_empresa = document.getElementById("telefone_empresa").value 

    var values = { cnpj_empresa, endereco_empresa, nome_empresa, telefone_empresa } 
    props.UpOptions(values);
  }
  
  return (
    <div className="container_form_configs">
      <div className="left_side_configs">

        <form className="form_configs">
          <h2 className="h2_title">Configurações Gerais</h2>
          <label htmlFor="nome_empresa">Nome da Empresa:</label>
          <input className="input_form_full" size="large" id="nome_empresa" placeholder="Nome da Empresa"  disabled={true} />

          <label htmlFor="endereco_empresa">Endereço Da Empresa:</label>
          <input className="input_form_full" size="large" id="endereco_empresa" placeholder="Endereço Da Empresa"  disabled={true} />

          <label htmlFor="telefone_empresa">Telefone Da Empresa:</label>
          <input className="input_form_full" size="large" id="telefone_empresa" placeholder="Telefone Da Empresa"  disabled={true} />
    
          <label htmlFor="cnpj_empresa">CNPJ Da Empresa:</label>
          <input className="input_form_full" id="cnpj_empresa" placeholder="CNPJ Da Empresa"  disabled={true}/>
        </form>

        <div className="submit_form_configs">
          <button className="btn_geral " onClick={edit}>Editar</button>
          <span/>
          <button className="btn_geral btn_config" onClick={() => {confirm()}}>Confirmar</button>
          <span/>
          <button className="btn_geral btn_config" onClick={ () => {cancelar()}}>Cancelar</button>
        </div>

      </div>
    </div>
  );
}

class ListConfig extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      options: [],
    }
  }

  ListOptions() {
    this.setState({options: []});
    api.get("configlist").then(resp => {
      const data = resp.data;
      this.setState({options: data});
   })
  }

  UpOptions (values) {
    api.post("configupdate",(values)).then(resp => {
      this.ListOptions()
      Toast.fire({
        icon: 'success',
        title: `Dados atualizados!`
      })
   })
  }

  componentDidMount() {
    this.ListOptions()
  }

	render() {
		return (
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='100%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className='custom_container_100_pdv'>
            <ListConfigComponent props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
      </VuroxLayout>
		);
	}
}

export default ListConfig;