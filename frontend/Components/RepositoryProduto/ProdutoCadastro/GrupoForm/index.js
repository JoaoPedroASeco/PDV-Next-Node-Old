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

  const CreateGrupoProduto = (e) => {
    e.preventDefault();
    var grupo = document.getElementById("input_grupo").value

    if(!grupo) {

    }else {
      props.CreateGrupo(grupo)
    }
  };

  const closeFormGrupo = () => {
    var container_grupo = document.getElementById("container_form_grupo_cadastro")
    var container_produto = document.getElementById("container_form_produto_cadastro")
    container_grupo.classList.add("hide")
    container_produto.classList.remove("hide")
  }

  const edit = ( grupo, id ) => {
    document.getElementById("input_grupo").value = grupo
    var values = { grupo, id }
    props.setState({dados_grupo: values})
  }

  return (
    <div className="container_form_produto_cadastro hide" id="container_form_grupo_cadastro">

      <form className="">
        <h2 className="h2_title">Cadastro de Grupo de Produtos:</h2>
        <input id="input_grupo" name="grupo" type="text" placeholder="Grupo" className="input_form_full" onChange={onChange}/>
        <button className="btn_geral" onClick={CreateGrupoProduto}>CRIAR/ATT</button>
      </form>

      <ul className="head_grupos head_table">
        <li className="list_grupo_id">ID</li>
        <li className="list_grupo_grupo">Grupo</li>
        <li className="list_grupo_acoes">Ações</li>
      </ul>

      <ul className="list_grupos list_geral">
        {props.state.grupo.map(resp => {
          return (
            <li key={resp.id}>
              <span className="list_grupo_id">{resp.id}</span>
              <span className="list_grupo_grupo">{resp.grupo}</span>
              <span className="list_grupo_acoes">
                <button onClick={function (){edit( resp.grupo, resp.id )}}><img src="./image/edit_buton.svg" alt="" /></button>
                <button onClick={function () {props.deleteGrupo(resp.id)}}><img src="./image/trash2.svg" alt="" /></button>
              </span>
            </li>
          )
        })}
      </ul>

      <button className="btn_novo_produto" onClick={closeFormGrupo}>Novo Produto</button>

    </div>
  )
}