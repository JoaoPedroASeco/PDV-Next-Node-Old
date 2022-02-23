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
  cpf: '',
  cpf: '',
}

export default function ClienteForm({ props }) {
  const [values, setValues] = useState({initialValue})

  function onChange(ev) {
    const { naem, value } = ev.target;
  }

  const CreateCliente = () => {
    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;
    var saldo = 0;
    var cpf = document.getElementById("cpf").value;
    var funcao = document.getElementById("funcao").value;
    var id = localStorage.getItem("user-id");
    var idcliente = document.getElementById("id_cliente").value
    var rua = document.getElementById("endereco_rua").value
    var numero = document.getElementById("endereco_numero").value
    var bairro_cidade = document.getElementById("endereco_cidade_bairro").value
    var values = { id: idcliente, nome, telefone, saldo, cpf, funcao, rua, numero, bairro_cidade };

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
  };

  return (
    <Form className="container_form_cliente_cadastro ">
      <input id="id_cliente" type="hidden" />
      <h2 className="h2_title">Cadastro de Clientes:</h2>

      <Form.Item
        rules={[{ required: true, message: 'Por favor insira o Nome!' }]}>
        <input
          name="nome"
          id="nome"
          size="large"   
          type="nome"
          placeholder="Nome"
          className="input_form_full"
          onChange={onChange}
        />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: 'Por favor insira o Telefone!' }]}>
        <InputMask 
          id="telefone"
          name="telefone"
          placeholder="Telefone"
          className="input_form_full"
          mask="(99) 99999-9999" 
          maskChar=" "
          onChange={onChange}
        />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: 'Por favor insira o CPF!' }]}>
        <InputMask 
          id="cpf"
          name="cpf"
          placeholder="CPF"
          className="input_form_full"
          mask="999.999.999-99" 
          maskChar=" " 
          onChange={onChange}
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

      <Form.Item>
          <Button 
            size="large" 
            type="primary" 
            className="btn_crud"
            onClick={CreateCliente}
          >
            Create/ATT
          </Button>
      </Form.Item>
    </Form>
  )
}