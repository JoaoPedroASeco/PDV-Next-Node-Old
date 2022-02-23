import NumberFormat from 'react-number-format';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2'
import CurrencyInput from 'react-currency-masked-input'

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

export default function ClienteList ({ props }) {

  const edit = ( username, email, password, id, create, list, update, del ) => {
    Toast.fire({
      icon: 'success',
      title: `Edição de Cliente!`
    })

    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("password").value = password;
    document.getElementById("id_funcionario").value = id;

    if(create == 1){
      document.getElementById("create_up").checked = true;
    }
    if(list == 1){
      document.getElementById("list_up").checked = true;
    }
    if(update == 1){
      document.getElementById("update_up").checked = true;
    }
    if(del == 1){
      document.getElementById("delete_up").checked = true;
    }

  }

  const listFuncionario = (e) => {
		e.preventDefault();
		const busca = document.getElementById("busca_funcionarios").value
		props.listFuncionario(busca)
	}

  return (
    <div className="container_list_cliente_cadastro">
    
      <div className="container_list_cliente" id="container_list_cliente">
        <input id="id_funcionario" type="hidden" />
        <form onSubmit={listFuncionario}>
          <input type="text" className="input_form_full" id="busca_funcionarios" placeholder="Nome/Telefone" />
          <button type="submit" className="btn_BuscaGeralCliente"></button>
        </form>

        <ul className="header_list_cliente head_table">
          <li className="funcionario_nome">Nome</li>
          <li className="cliente_email">E-Mail</li>
          <li className="funcionario_create">C</li>
          <li className="funcionario_list">L</li>
          <li className="funcionario_update">U</li>
          <li className="funcionario_delete">D</li>
          <li className="">Ações</li>
        </ul>

        <ul className="list_funcionarios list_geral">
          {props.state.funcionarios.map(resp =>{
            var id = localStorage.getItem("user-id");
            
            var create = false;
            var list = false;
            var update = false;
            var del = false;

            if(resp.create_up == 1){
              var create = true;
            }
            if(resp.list_up == 1){
              var list = true;
            }
            if(resp.update_up == 1){
              var update = true;
            }
            if(resp.delete_up == 1){
              var del = true;
            }

            if(resp.second_id == id) {
              return (
                <li key={resp.us_id}>
                  <div className="user_data">
                    <span className="cliente_nome">{resp.username}</span>
                    <span className="cliente_email">{resp.email}</span>

                    <div className="user_permission">
                      <input className="funcionario_create" type="checkbox" checked={create}/>
                      <input className="funcionario_list" type="checkbox" checked={list}/>
                      <input className="funcionario_update" type="checkbox" checked={update}/>
                      <input className="funcionario_delete" type="checkbox" checked={del}/>
                    </div>

                    <button onClick={function () { edit( resp.username, resp.email, resp.password, resp.us_id, resp.create_up, resp.list_up, resp.update_up, resp.delete_up )}}><img src="./image/edit_buton.svg" /></button>
                    <button onClick={function () { props.deleteFuncionario({ id: resp.us_id, username: resp.username })}}><img src="./image/trash2.svg" /></button>
                  </div>
                </li>
              )
            }
          })}
        </ul>

      </div>

    </div>
  );
}