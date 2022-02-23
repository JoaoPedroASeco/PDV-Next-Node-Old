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
  const edit = (nome,telefone,cpf,funcao,idpessoa, rua, numero, bairro_cidade) => {
    Toast.fire({
      icon: 'success',
      title: `Edição de Cliente!`
    })

    document.getElementById("nome").value = nome;
    document.getElementById("telefone").value = telefone;
    document.getElementById("cpf").value = cpf;
    document.getElementById("funcao").value = funcao;
    document.getElementById("id_cliente").value = idpessoa;
    document.getElementById("endereco_rua").value = rua;
    document.getElementById("endereco_numero").value = numero;
    document.getElementById("endereco_cidade_bairro").value = bairro_cidade;
  }
  
  const openFinanceiro = (idpessoa,nome) => {
    var client_list = document.getElementById("container_list_cliente")
    var financeiro_list = document.getElementById("container_financeiro_cliente")
    client_list.classList.add("hide");
    financeiro_list.classList.remove("hide");
    props.listFinanceiro(idpessoa,nome)
  }

  const closeFinanceiro = () => {
    var client_list = document.getElementById("container_list_cliente")
    var financeiro_list = document.getElementById("container_financeiro_cliente")
    client_list.classList.remove("hide");
    financeiro_list.classList.add("hide");
  }

  const openAddFinanceiro = () => {
    var var1 = document.getElementById("bg_add_credito_debito")
    var1.classList.remove("hide");
  }

  const closeAddFinanceiro = () => {
    var var1 = document.getElementById("bg_add_credito_debito")
    var1.classList.add("hide");
  }

  const addFinanceiro = (idpessoa,id,tipo) => {
    var valor = document.getElementById("valor_financeiro").value
    var valor = parseFloat(valor)
    if(parseFloat(valor) < 0 ){
      var valor = parseFloat(valor) * parseFloat(-1);
    }
    if(tipo == 0 ){
      var newSaldo = parseFloat(soma) + parseFloat(valor); 
      var newid = parseFloat(id) + parseFloat(1);
      const values = { idcliente: idpessoa, credito: valor, debito: 0, newSaldo, saldo: soma, id: newid }
      props.addFinanceiro(values)
    }else {
      if (soma < 0) {
        var newSaldo = parseFloat(soma) - parseFloat(valor) ;
        var newid = parseFloat(id) + parseFloat(1);
        const values = { idcliente: idpessoa, debito: valor, credito: 0, newSaldo, saldo: soma, id: newid }
        props.addFinanceiro(values)
      }else {
        var newSaldo = (parseFloat(valor) * -1) + parseFloat(soma);
        var newid = parseFloat(id) + parseFloat(1);
        const values = { idcliente: idpessoa, debito: valor, credito: 0, newSaldo, saldo: soma, id: newid }
        props.addFinanceiro(values)
      }
    }
  }

  const listCliente = (e) => {
		e.preventDefault();
		const busca = document.getElementById("busca_clientes").value
		props.listClientes(busca)
	}
  
  var soma = 0;

  var newSaldo = props.formatMoney().format(props.state.saldo_total)

  
  return (
    <div className="container_list_cliente_cadastro">
    
      <div className="container_list_cliente" id="container_list_cliente">

        <form onSubmit={listCliente}>
          <input type="text" className="input_form_full" id="busca_clientes" placeholder="Nome/Telefone" />
          <button type="submit" className="btn_BuscaGeralCliente"></button>
        </form>

        <ul className="header_list_cliente head_table">
          <li className="cliente_nome">Nome</li>
          <li className="cliente_funcao">Função</li>
          <li className="cliente_telefone">Telefone</li>
          <li className="">Ações</li>
        </ul>

        <ul className="list_clientes list_geral">
          {props.state.clientes.map(resp =>(
            <li key={resp.idpessoa}>
              <span className="cliente_nome">{resp.nome}</span>
              <span className="cliente_funcao">{resp.funcao}</span>
              <InputMask className="cliente_telefone" value={resp.telefone} mask="(99) 99999-9999" maskChar=" " disabled={true}/>
              <button onClick={function () {openFinanceiro(resp.idpessoa, resp.nome)}}><img src="./image/wallet_button.svg" /></button>
              <button onClick={function () {edit(resp.nome,resp.telefone,resp.cpf,resp.funcao,resp.idpessoa, resp.rua, resp.numero, resp.bairro_cidade)}}><img src="./image/edit_buton.svg" /></button>
              <button onClick={function () {props.deleteCliente({id: resp.idpessoa, nome: resp.nome})}}><img src="./image/trash2.svg" /></button>
            </li>
          ))}
        </ul>
      </div>

      <div className="container_financeiro_cliente hide padding-40-65" id="container_financeiro_cliente">

        <div className="container_btn_close_financeiro">
          <button className="btn_close_financeiro" onClick={closeFinanceiro}><img src="./image/x.svg" /></button>
        </div>

        <div className="container_header_financeiro">
          <h2 className="h2_title">Financeiro:</h2>
          <h4 className="h4">Saldo: <span>{newSaldo}</span></h4>
        </div>

        <div className="container_btn_add_financeiro">
          <h4 className="h4">Cliente: <span>{props.state.nome_cliente}</span></h4>
          <button className="btn_geral" onClick={openAddFinanceiro}>Add</button>
        </div>
        
        <ul className="header_list_financeio head_table">
          <li className="financeiro_data">Data</li>
          <li className="financeiro_pago">Pago</li>
          <li className="financeiro_haver">Em Haver</li>
          <li className="financeiro_saldo">Saldo</li>
          <li className="">Ação</li>
        </ul>

        <ul className="list_financeio list_geral">
          {props.state.financeiro.map(resp => {
            var contador = parseFloat(resp.credito) - parseFloat(resp.debito) + parseFloat(soma);
            soma = contador;
            var data_hora = `${resp.data_financeiro} ${resp.horario_financeiro}`
            var newDataFinanceiro = data_hora.replace(/-/g, '/')
	          var newCredito = props.formatMoney().format(resp.credito)
	          var newDebito = props.formatMoney().format(resp.debito)
	          var newSoma = props.formatMoney().format(soma)
            
            if(resp.statusfinal == 'EM ABERTO') {
              return (
                <li key={resp.id}>
                  <span className="financeiro_data">{newDataFinanceiro}</span>
                  <span className="financeiro_pago">{newCredito}</span>
                  <span className="financeiro_haver">{newDebito}</span>
                  <span className="financeiro_saldo">{newSoma}</span>
                  <button onClick={() => { props.delPgtParc( resp.id, resp.idcliente ) }} className=""><img src="./image/trash2.svg" /></button>
                </li>
              )
            }
          })}
        </ul>

        <div className="bg_add_credito_debito hide" id="bg_add_credito_debito">
          <div className="add_credito_debito" >

            <div className="container_close_add_financeiro">
              <h2 className="h2_title">Add Crédito/Débito:</h2>
              <button className="close_add_financeiro" onClick={closeAddFinanceiro}><img src="./image/x.svg" /></button>
            </div>

            <form className="container_add_credito_debito">
						  <CurrencyInput id="valor_financeiro" className="input_form_full" placeholder="Valor" name="myInput" />

              <div>
                <button className="btn_geral" onClick={function (e) {
                  e.preventDefault();
                  var i = props.state.financeiro.length;
                  var j = parseFloat(i) - parseFloat(1);
                  if(parseFloat(j) < 0 ){
                    addFinanceiro(props.state.id_cliente_financeiro, undefined, 0)
                  }else {
                    addFinanceiro(props.state.id_cliente_financeiro, props.state?.financeiro[j].id, 0)
                  }
                }}>Credito</button>
                <button className="btn_geral" onClick={function (e) {
                  e.preventDefault();
                  var i = props.state.financeiro.length;
                  var j = parseFloat(i) - parseFloat(1);
                  if(parseFloat(j) <= 0 ){
                    addFinanceiro(props.state.id_cliente_financeiro, undefined , 1)
                  }else {
                    addFinanceiro(props.state.id_cliente_financeiro, props.state?.financeiro[j].id, 1)
                  }
                }}>Debito</button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
}