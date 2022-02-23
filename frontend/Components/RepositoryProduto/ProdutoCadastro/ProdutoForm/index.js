import React, { useState } from 'react'
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-masked-input'
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
import { UserOutlined, MailOutlined, LockOutlined, FacebookFilled, GoogleOutlined, GithubOutlined, BookOutlined, HomeOutlined, PhoneOutlined, BarcodeOutlined, IdcardOutlined  } from '@ant-design/icons';        
import GrupoList from '../GrupoList'

const initialValue = {
  nome: '',
  codigo: '',
  estoque: '',
  estoqueminimo: '',
  valor_de_custo: '',
  preco: '',
  cod_barras: '',
}

export default function ProdutoForm({ props }) {
  const [values, setValues] = useState({initialValue})

  function onChange(ev) {
    const { naem, value } = ev.target;
  }

  function onChange2() {
    var varcontrole_quantidade = document.getElementById("controle_quantidade").checked
    var varcontroleestoque = document.getElementById("controleestoque").checked
    var varvendaporpeso = document.getElementById("vendaporpeso").checked
    if(varvendaporpeso == true ){
      document.getElementById("controle_quantidade").checked = false
      document.getElementById("controleestoque").checked = false
    }
    if(varcontroleestoque == true ){
      document.getElementById("vendaporpeso").checked = false
      document.getElementById("controle_quantidade").checked = false
    }
    if(varcontrole_quantidade == true ){
      document.getElementById("controleestoque").checked = false
      document.getElementById("vendaporpeso").checked = false
    }
  }

  const CreateProduto = () => {
    const nome = document.getElementById("nome").value
    const grupo = document.getElementById("grupo").value
    const codigo = document.getElementById("codigo").value
    const preco = document.getElementById("preco").value
    const valor_de_custo = document.getElementById("valor_de_custo").value
    const estoque = document.getElementById("estoque").value
    const estoqueminimo = document.getElementById("estoqueminimo").value
    const cod_barras = document.getElementById("cod_barras").value
    const varcontrole_quantidade = document.getElementById("controle_quantidade").checked
    const varcontroleestoque = document.getElementById("controleestoque").checked
    const varvendaporpeso = document.getElementById("vendaporpeso").checked

    if(varcontrole_quantidade == true ){
      var controle_quantidade = "S";
    }else{
      var controle_quantidade = "N";
    }

    if(varcontroleestoque == true ){
      var controleestoque = "S";
    }else{
      var controleestoque = "N";
    }

    if(varvendaporpeso == true ){
      var vendaporpeso = "S";
    }else{
      var vendaporpeso = "N";
    }
    
    if (varcontrole_quantidade == false && varcontroleestoque == false && varvendaporpeso == false ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Preencha todos os campos!',
        showConfirmButton: false,
        timer: 1500
      })
    }else if (!nome || !grupo || !codigo || !preco || !valor_de_custo || !cod_barras ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Preencha todos os campos!',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
    const id_produto = document.getElementById("id_produto").value
    const values = {id: id_produto, nome, grupo, codigo, preco, estoque, estoqueminimo , valor_de_custo , vendaporpeso , cod_barras, controle_quantidade, controleestoque }

    props.CreateProduto(values);
    }
  };

  const openFormGrupo = () => {
    var container_grupo = document.getElementById("container_form_grupo_cadastro")
    var container_produto = document.getElementById("container_form_produto_cadastro")
    container_grupo.classList.remove("hide")
    container_produto.classList.add("hide")
  }

  return (
    <Form className="container_form_produto_cadastro" id="container_form_produto_cadastro">
      <h2 className="h2_title">Cadastro de Produtos:</h2>
      <input type='hidden' id="id_produto" />

      <div className="div_meio_a_meio">
        <Form.Item rules={[{ required: true, message: 'Por favor insira o Nome!' }]}>

          <input
              id="nome"
              name="nome"
              size="large"   
              type="nome"
              prefix={<BookOutlined className="site-form-item-icon" />}
              placeholder="Nome"
              className="input_form_meio"
              onChange={onChange}
          />

        </Form.Item>

        <Form.Item rules={[{ required: true, message: 'Por favor insira o Codigo!' }]}>

          <input
              id="codigo"
              name="codigo"
              size="large"   
              type="codigo"
              prefix={<BookOutlined className="site-form-item-icon" />}
              placeholder="Codigo"
              className="input_form_meio"
              onChange={onChange}

          />
        </Form.Item>
      </div>

      <div className="div_meio_a_meio">

        <Form.Item rules={[{ required: true, message: 'Por favor insira o Estoque!' }]}>

          <input
              id="estoque"
              name="estoque"
              size="large"   
              type="number"
              prefix={<BookOutlined className="site-form-item-icon" />}
              placeholder="Estoque"
              className="input_form_meio"
              disabled={false}
              onChange={onChange}

          />

        </Form.Item>
        
        <Form.Item rules={[{ required: true, message: 'Por favor insira o Estoque Minimo!' }]}>

          <input
              id="estoqueminimo"
              size="large"   
              name="estoqueminimo"
              type="number"
              prefix={<BookOutlined className="site-form-item-icon" />}
              placeholder="Estoque Minimo"
              className="input_form_meio"
              disabled={false}
              onChange={onChange}

          />
        </Form.Item>

      </div>

      <div className="div_meio_a_meio">
      
        <CurrencyInput
          id="valor_de_custo"
          name="valor_de_custo"
          type="number"
          placeholder="Valor De Custo"
          className="input_form_meio"
          intlconfig={{ locale: 'pt-BR', currency: 'BRL' }}
          decimalslimit={2}
          onChange={onChange}
        />

        <CurrencyInput
          id="preco"
          name="preco"
          className="input_form_meio"
          placeholder="Preço"
          name="myInput" 
          intlconfig={{ locale: 'pt-BR', currency: 'BRL' }}
          decimalslimit={2}
          onChange={onChange}
        />
      </div>

      <div className="div_meio_a_meio">
        <Form.Item  rules={[{ required: true, message: 'Por favor insira o Preço!' }]}>

          <input
              id="cod_barras"
              size="large"  
              name="cod_barras" 
              type="cod_barras"
              prefix={<BookOutlined className="site-form-item-icon" />}
              placeholder="Código de Barras"
              className="input_form_meio"
              onChange={onChange}
          />
        </Form.Item>
        
        <Form.Item>
          <GrupoList props={props} />
        </Form.Item>

      </div>

      <Form.Item className="label_checkbox">
        <label htmlFor="vendaporpeso">Venda Por Peso:</label>
        <input
            id="vendaporpeso"
            size="large"   
            type="checkbox"
            name="vendaporpeso"
            prefix={<BookOutlined className="site-form-item-icon" />}
            placeholder="Venda Por Peso"
            className=""
            onChange={onChange2}
        />
      </Form.Item>

      <Form.Item className="label_checkbox">
        <label  htmlFor="controleestoque">Controle Estoque:</label>
        <input
            id="controleestoque"
            size="large"   
            name="controleestoque"
            type="checkbox"
            prefix={<BookOutlined className="site-form-item-icon" />}
            placeholder="Controle Estoque"
            className=""
            onChange={onChange2}
        />
      </Form.Item>

      <Form.Item className="label_checkbox">
        <label  htmlFor="controle_quantidade">Controle de Qauntidade:</label>
        <input
            id="controle_quantidade"
            size="large"   
            type="checkbox"
            name="controle_quantidade"
            prefix={<BookOutlined className="site-form-item-icon" />}
            placeholder="Controle Estoque"
            className=""
            onChange={onChange2}
        />

      </Form.Item>

      <Form.Item className="">
        <button className="btn_novo_grupo" onClick={openFormGrupo}>Novo Grupo +</button>
      </Form.Item >

      <Form.Item>
        <Button size="large" type="primary" className="btn_crud" onClick={CreateProduto}>CRIAR/ATT</Button>
      </Form.Item>

    </Form>
  )
}