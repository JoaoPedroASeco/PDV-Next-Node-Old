import React, { Component,useEffect, useRef, useState } from 'react';
import {connect} from 'react-redux'
import { useRouter } from "next/router";
import api from '../services/api';
import HeaderDarkBlank from 'Templates/HeaderDarkBlank';
import Sidebar from 'Templates/HeaderSidebar';
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
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
import Swal from 'sweetalert2'

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

const initialValue = {
  username_singin: null,
  email_signin: null,
  password_signin: null,
}

const LoginComponent = ({props}) => {
  const router = useRouter();
  const [values, setValues] = useState({initialValue})

  function onChange(ev) {
    const { name, value } = ev.target;
  }

  const Login = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email_login").value;
    const password = document.getElementById("password_login").value;
    const values = { email, password }

    if( !email || !password){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Preencha todos os campos!',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      api.post("login", values).then((resp) => {
        const token = resp.data.token.token;
        const id = resp.data.user[0].id;

        if (token == "Dados invalido: PasswordMisMatchException: E_PASSWORD_MISMATCH: Cannot verify user password" || token == `Dados invalido: UserNotFoundException: E_USER_NOT_FOUND: Cannot find user with email as ${values.email}`) {

        } else {
          localStorage.setItem("app-token", token);
          localStorage.setItem("user-id", id);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login feito com Sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(function(){ router.push("/") }, 1000);
        }
      }).catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Dados Incorretos',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }

  }

  const Sign_in = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username_signin").value;
    const email = document.getElementById("email_signin").value;
    const password = document.getElementById("password_signin").value;
    const roleId = 1;
    const second_id = 0;
    const values = { username, email, password, roleId, second_id }

    if(!values.username || !values.email || !password){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Preencha todos os campos!',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      props.CreateUser(values)
    }
  }

  const open_sign_in = (e) => {
    var login = document.getElementById("form_login")
    var singin = document.getElementById("form_sign_in")

    login.classList.add("hide")
    singin.classList.remove("hide")
  }

  const close_sign_in = (e) => {
    var login = document.getElementById("form_login")
    var singin = document.getElementById("form_sign_in")

    login.classList.remove("hide")
    singin.classList.add("hide")
  }

  return (
    <React.Fragment >
      <VuroxLayout className="container_login" id="container_login">

        <img className="fixed_logo"  src="/image/logo-primora.svg" alt="" /> 
        <img className="fixed_img"  src="/image/img-login.svg" />

        <form className="form_login" id="form_login" onSubmit={Login} >
          <h1>Faça seu login</h1>
          <input className="input_form_full" type="email" placeholder="Email" id="email_login" />
          <input className="input_form_full" type="password" placeholder="Password" id="password_login" />
          <button className="form_login_btn" type="submit" >Log-in</button>
          <span>Não tem uma conta ? <a onClick={open_sign_in}>clique aqui</a></span>
        </form>

        <form className="form_login hide" id="form_sign_in" >
          <h1>Cadastre-se:</h1>
          <input className="input_form_full" name="username_singin" type="username" placeholder="Nome de Usuario" id="username_signin" onChange={onChange}/>
          <input className="input_form_full" name="email_signin" type="email" placeholder="E-mail" id="email_signin" onChange={onChange}/>
          <input className="input_form_full" name="password_signin" type="password" placeholder="Password" id="password_signin" onChange={onChange}/>
          <button className="form_login_btn" onClick={Sign_in}>continuar</button>
          <span>Ja tenho uma conta ! <a onClick={close_sign_in}>Fazer Login</a></span>
        </form>
							
      </VuroxLayout>
      
    </React.Fragment>
  );
}

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  CreateUser(values) {

    api.post("user", (values)).then(resp => {
      console.log(resp)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sucesso ao Cadastrar!',
        showConfirmButton: false,
        timer: 1500
      })

      var login = document.getElementById("form_login")
      var singin = document.getElementById("form_sign_in")

      login.classList.remove("hide")
      singin.classList.add("hide")
    }).catch(err => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Usuario existente!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  componentDidMount() {}
	render() {
  return (
    <LoginComponent props={this} />
		);
	}
}

export default connect(state=>state)(Login)