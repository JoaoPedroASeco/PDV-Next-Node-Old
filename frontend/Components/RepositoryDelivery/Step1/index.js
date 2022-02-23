import React, { useState } from 'react'
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2'

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

import FuncaoList from '../FuncaoList'

const initialValue = {
  nome: '',
  telefone: '',
  cpf: '',
}

const Step1 = ({ props }) => {
  const [values, setValues] = useState({initialValue})

  function onChange(ev) {
    const { naem, value } = ev.target;
  }

  const edit = (nome,telefone,cpf,funcao,idpessoa, rua, numero, bairro_cidade) => {
    document.getElementById("nome_delivery").value = nome;
    document.getElementById("telefone_delivery").value = telefone;
    document.getElementById("cpf_delivery").value = cpf;
    document.getElementById("funcao_delivery").value = funcao;
    document.getElementById("id_cliente_delivery").value = idpessoa;
    document.getElementById("endereco_rua").value = rua;
    document.getElementById("endereco_numero").value = numero;
    document.getElementById("endereco_cidade_bairro").value = bairro_cidade;

    var cliente = document.getElementsByClassName("cliente")
    for(var i = 0; i < cliente.length; i++){
      cliente[i].classList.remove('selecionado');
    }

    var cliente_id = document.getElementById(`cliente_${idpessoa}`)
    cliente_id.classList.add("selecionado")
  }

  const open_Delivery = (nome,telefone,cpf,idcliente,id, rua, numero, cidade_bairro) => {
    const data = (nome,telefone,cpf,idcliente,id)

    if(data == undefined) {
      var nome = document.getElementById("nome_delivery").value;
      var telefone = document.getElementById("telefone_delivery").value;
      var cpf = document.getElementById("cpf_delivery").value;
      var idcliente = document.getElementById("id_cliente_delivery").value;
    }

    var values = { idcliente, nome, telefone, status: "EM ATENDIMENTO", id };
    props.openDelivery(values);
  }

  const CreateCliente = () => {
    var nome = document.getElementById("nome_delivery").value;
    var telefone = document.getElementById("telefone_delivery").value;
    var cpf = document.getElementById("cpf_delivery").value;
    var funcao = document.getElementById("funcao_delivery").value;
    var idcliente = document.getElementById("id_cliente_delivery").value;
    var rua = document.getElementById("endereco_rua").value;
    var numero = document.getElementById("endereco_numero").value;
    var bairro_cidade = document.getElementById("endereco_cidade_bairro").value;
    var id = localStorage.getItem("user-id");
    var saldo = 0;
    var values = { id: idcliente, nome, telefone, saldo, cpf, funcao, rua, numero, bairro_cidade }

    if ( !nome || !telefone || !cpf ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Preencha todos os campos!',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      props.CreateCliente(values);
    }  
  }

	const busca_cliente = (e) => {
		e.preventDefault();
		const busca = document.getElementById("busca_cliente2").value
		props.ListClientes(busca)
	}

  const openEmAtendimento = () => {
    var listagem_clientes = document.getElementById("container_lista_clientes")
    var em_atendimento = document.getElementById("container_em_atendimento")
    listagem_clientes.classList.add("hide")
    em_atendimento.classList.remove("hide")
  }

  const closeEmAtendimento = () => {
    var listagem_clientes = document.getElementById("container_lista_clientes")
    var em_atendimento = document.getElementById("container_em_atendimento")
    listagem_clientes.classList.remove("hide")
    em_atendimento.classList.add("hide")
  }

  return (

    <div className="step1_delivery custom_container_100_pdv" id="container_delivery_step1">

      <div className="container_lista_clientes" id="container_lista_clientes">

        <div className="header_delivery">
          <h2 className="h2_title">1º - Selecione um Cliente:</h2>
          <button className="btn_geral" onClick={openEmAtendimento}>EM ATENDIMENTO</button>
        </div>

        <form onSubmit={busca_cliente}>
          <input type="text" className="input_form_full" id="busca_cliente2" />
          <button type="submit" className="busca_cliente_btn"></button>
        </form>

        <ul className="header_clientes_delivery head_table">
          <li className="delivery_nome">Nome</li>
          <li className="delivery_funcao">Funcao</li>
          <li className="delivery_telefone">Telefone</li>
        </ul>

        <ul className="list_clientes_delivery">
          {props.state.clientes.map( resp => ( <button key={resp.idpessoa} className="cliente" id={`cliente_${resp.idpessoa}`} onClick={function () {edit(resp.nome,resp.telefone,resp.cpf,resp.funcao,resp.idpessoa,resp.rua, resp.numero, resp.bairro_cidade)}}><span className="delivery_nome">{resp.nome}</span><span className="delivery_funcao">{resp.funcao}</span><InputMask className="delivery_telefone" mask="(99) 99999-9999" maskChar={null} value={resp.telefone} disabled={true} /> </button> ))}
        </ul>

      </div>

      <div className="container_em_atendimento hide" id="container_em_atendimento">

        <div className="header_delivery">
          <h2 className="h2_title" >Em Atendimento: </h2>
          <button onClick={closeEmAtendimento}><img src="./image/x.svg" /></button>
        </div>

        <form onSubmit={busca_cliente}>
          <input type="text" className="input_form_full" id="busca_cliente2" />
          <button type="submit" className="busca_cliente_btn"></button>
        </form>

        <ul className="header_clientes_delivery head_table">
          <li className="delivery_nome">Nome</li>
          <li className="delivery_funcao">Funcao</li>
          <li className="delivery_telefone">Telefone</li>
        </ul>

        <ul className="list_clientes_delivery">
          {props.state.em_atendimento.map(resp => { 
            return (
              <button key={`${resp.idcliente}_${resp.id}`} onClick={function () {open_Delivery( resp.nome, resp.telefone, resp.cpf, resp.idcliente, resp.id)}}><span className="delivery_nome">{resp.nome}</span><span className="delivery_funcao">{resp.funcao}</span><span className="delivery_telefone">{resp.telefone}</span></button>
            )
          })}
        </ul>

      </div>

      <div className="container_form_clientes_delivery">
        <Form name="user_signup" className="login-section form_crud">
          <input id="id_cliente_delivery" type="hidden" />

          <div className="header_delivery">
            <h2 className="h2_title">2º - Cadastro de Delivery:</h2>
          </div>

          <Form.Item
            name="nome">
            <input
              id="nome_delivery"
              size="large"   
              type="nome"
              placeholder="Nome"
              className="input_form_full"
            />
          </Form.Item>

          <Form.Item
            name="telefone">
            <input
                id="telefone_delivery"
                size="large"   
                type="telefone"
                placeholder="Telefone"
                className="input_form_full"
            />
          </Form.Item>

          <Form.Item
            name="cpf">
            <input
                id="cpf_delivery"
                size="large"   
                type="cpf"
                placeholder="CPF"
                className="input_form_full"
            />
          </Form.Item>

          <div className="div_meio_a_meio">

            <Form.Item>
              <input 
                id="endereco_rua"
                name="rua"
                placeholder="Rua"
                type="text"
                className="input_form_full endereco_rua"
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item>
              <input 
                id="endereco_numero"
                name="numero"
                placeholder="Numero"
                type="number"
                className="input_form_full endereco_numero"
                onChange={onChange}
              />
            </Form.Item>

          </div>

          <Form.Item>
            <input 
              id="endereco_cidade_bairro"
              name="cidade_bairro"
              placeholder="Cidade/Bairro"
              className="input_form_full"
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item name="funcao">
            <FuncaoList props={props} />
          </Form.Item>

          <div className="btn_form_delivery">
            <button className="btn_geral" onClick={open_Delivery}>Delivery</button>
            <span />
            <button className="btn_geral" onClick={CreateCliente}>Criar/Att</button>
          </div>

        </Form>
      </div>

    </div>
  )
}

export default Step1;