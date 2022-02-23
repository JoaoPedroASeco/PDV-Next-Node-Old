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
import { UserOutlined, MailOutlined, LockOutlined, FacebookFilled, GoogleOutlined, GithubOutlined, BookOutlined, HomeOutlined, PhoneOutlined, BarcodeOutlined, IdcardOutlined  } from '@ant-design/icons';        
import FuncaoList from '../FuncaoList'

const initialValue = {
  nome: '',
  telefone: '',
  cpf: '',
}

export default function FuncionarioForm({ props }) {
  const [values, setValues] = useState({initialValue})

  function onChange(ev) {
    const { naem, value } = ev.target;
  }

  const CreateFuncionario = () => {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var second_id = localStorage.getItem("user-id");
    var roleId = 2;
    var idfuncionario = document.getElementById("id_funcionario").value;
    var create = document.getElementById("create_up").checked
    var list = document.getElementById("list_up").checked
    var update = document.getElementById("update_up").checked
    var del = document.getElementById("delete_up").checked

    if(create == true) {
      var newCreate = 1;
    }else {
      var newCreate = 0;
    }

    if(list == true) {
      var newList = 1;
    }else {
      var newList = 0;
    }

    if(update == true) {
      var newUpdate = 1;
    }else {
      var newUpdate = 0;
    }

    if(del == true) {
      var newDelete = 1;
    }else {
      var newDelete = 0;
    }

    var values = { id: idfuncionario, username, email, password, roleId, second_id, create: newCreate, list: newList, update: newUpdate, del: newDelete}
    
    if ( !username || !email || !password ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Preencha todos os campos!',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      props.CreateFuncionario(values);
    }
  };

  return (
    <Form className="container_form_cliente_cadastro ">
      <input id="id_funcionario" type="hidden" />
      <h2 className="h2_title">Cadastro de Funcionarios:</h2>

        <input
          name="username"
          id="username"
          size="large"   
          type="text"
          prefix={<BookOutlined className="site-form-item-icon" />}
          placeholder="Nome de Usuario"
          className="input_form_full"
          onChange={onChange}
        />

        <input 
          id="email"
          name="email"
          placeholder="E-Mail"
          className="input_form_full"
          onChange={onChange}
        />

        <input 
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          className="input_form_full"
          maskChar=" " 
          onChange={onChange}
        />

        <div className="userpermission_form">
          <div>
            <div>
              <label>Create: </label>
              <input 
                id="create_up"
                name="create"
                type="checkbox"
              />
            </div>

            <div>
              <label>List: </label>
              <input 
                id="list_up"
                name="list"
                type="checkbox"
              />
            </div>

            <div>
              <label>Update: </label>
              <input 
                id="update_up"
                name="update"
                type="checkbox"
              />
            </div>

            <div>
              <label>Del: </label>
              <input 
                id="delete_up"
                name="delete"
                type="checkbox"
              />
            </div>
          </div>
        </div>


        <button 
          size="large" 
          type="primary" 
          className="btn_geral btn_crud"
          onClick={CreateFuncionario}
        >
          Create/ATT
        </button>

    </Form>
  )
}