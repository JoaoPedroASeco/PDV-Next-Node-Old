import React, { Component,useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2'
import auth from '../../services/auth';
import api from '../../services/api';

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import PainelDeProdutos from './step2/PainelDeProdutos';
import PainelOperacional from './step2/PainelOperacional';
import PainelFinanceiro from './step2/PainelFinanceiro';
import SidebarComponent from './step2/SidebarComponent'
import {CupomNaoFiscalComponent} from '../RepositoryCupons/CupomNaoFiscal/Component'
import Step1 from './Step1/index';

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

const VendaPorQuantidade = ({props}) => {

  const addPedido = () => {
    var vendaporpeso = props.state.values_pedido.vendaporpeso;

    if(vendaporpeso == "S") {
      var val_input = document.getElementById("venda_quantidade").value
      var quantidade = parseFloat(val_input)/ 1000;

    }else {
      var quantidade = document.getElementById("venda_quantidade").value
    }

    var bg_add_produto = document.getElementById("bg_container_add_produto")
    var values = props.state.values_pedido

		bg_add_produto.addEventListener("click", () => {
			if (event.target.id == "bg_container_add_produto" || event.target.id == "fecha_venda_quantidade" ) {
        bg_add_produto.classList.add("hide")
			}
		});

    props.addPedido(values,quantidade)
    bg_add_produto.classList.add("hide")

  }

  return (
    <div className="bg_container_add_produto hide" id="bg_container_add_produto">

      <div className="container_venda_por_peso">
        <div className="header_venda_po_peso">
          <h2>Digite a quantidade desejada</h2>
        </div>
        <div className="body_venda_po_peso">
          <input className="input_form_full" id="venda_quantidade" type="number" placeholder="Quantidade"/>
        </div>
        <div className="footer_venda_po_peso">
          <button className="btn_geral" onClick={addPedido}>Adicinar</button>
          <span></span>
          <button className="btn_geral" id="fecha_venda_quantidade">Cancelar</button>
        </div>
      </div>

    </div>
  )
}

class Delivery extends Component {

  constructor(props){
    super(props)
    this.state = {
      clientes: [],
      produtos: [],
			grupos: [],
      grupo_atual: [],
			mesas: [],
      pedidos: [],
      btn_tipo_de_pagamento: [],
      mesa_em_uso: [],
      pagamentos_parciais: [],
      total_consumo: 0,
      total_dinheiro: 0,
      total_cartao: 0,
      total_parcial: 0,
      falta: 0,
      troco: 0,
      funcao: [],
      em_atendimento: [],
      dados_cliente: {idcliente: "", nome: "", telefone: ""},
      em_preparo: [],
      list_delivery_enviado: [],
      consumo_delivery: [],
      dados_usuario: [],
      dados_cliente_carteira: [],
      values_pedido: [],
    }
  }

  formatMoney () {
		return new Intl.NumberFormat('pt', {
			style: 'currency',
			currency: 'BRL',
		})
	}

  ListDadosUsuario() {
    api.get("configlist").then(resp => {
      const data = resp.data;
      this.setState({dados_usuario: data});
   })
  }

  cancelaDelivery(id) {

    Swal.fire({
      title: 'Tem Certeza?',
      text: "Quer mesmo cancelar o pedido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0339A6',
      cancelButtonColor: '#0339A6',
      confirmButtonText: 'Sim, Quero!'
    }).then((result) => {

      if (result.isConfirmed) {
        api.post("canceladelivery", ({id})).then((resp) => {
          const var1 = document.getElementById("container_delivery_step1")
          const var2 = document.getElementById("container_delivery_step2")
          var1.classList.remove("hide")
          var2.classList.add("hide")
          this.listEmAtendimento();
        })

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pedido Cancelado!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  openDelivery(values) {
    if(!values.idcliente || values.idcliente == "" || values.telefone == "") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Selecione um Cliente!',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      if(values.id == undefined){
        api.post("opendelivery", (values)).then((resp) => {
          
          if(resp.data.message == "Success") {
            const var1 = document.getElementById("container_delivery_step1")
            const var2 = document.getElementById("container_delivery_step2")
            var1.classList.add("hide")
            var2.classList.remove("hide")
            var dados__cliente = {idcliente: values.idcliente, nome: values.nome, telefone: values.telefone, id: resp.data.data }
            this.setState({ dados_cliente: dados__cliente })
            this.ListPedido( undefined, this.state.dados_cliente.id, values.idcliente );
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Pedido Aberto',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }else {
        const var1 = document.getElementById("container_delivery_step1")
        const var2 = document.getElementById("container_delivery_step2")
        var1.classList.add("hide")
        var2.classList.remove("hide")
        this.setState({dados_cliente: values})
        this.ListPedido(undefined,values.id,values.idcliente);
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Continue o Atendimento!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  finalizaDelivery() {
		const idcliente = this.state.dados_cliente.idcliente;
		const iddelivery = this.state.dados_cliente.id;
    var credito = this.state.total_consumo;
    var falta = this.state.falta;
    var troco = this.state.troco;

    if (falta == 0 && troco >= 0 ){
      const values = { idcliente , credito, troco, iddelivery }

      api.post('finalizadelivery',(values)).then(resp => {
        this.ListClientes()
        const var1 = document.getElementById("container_delivery_step1")
        const var2 = document.getElementById("container_delivery_step2")
        var1.classList.remove("hide")
        var2.classList.add("hide")
        this.ListPedido(undefined,this.state.dados_cliente.id,this.state.dados_cliente.idcliente);
        this.listEmAtendimento()
        var bg_container_cupom = document.getElementById("container_imprime_cupom")
        var div_finalizar = document.getElementById("cupom_finaliza_delivery")
        bg_container_cupom.classList.add("hide")
        div_finalizar.classList.add("hide")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pedido foi para Preparo!',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }

  AddCarteira(values) {
    if(parseFloat(values.debito) > 0){
      const user_id = localStorage.getItem("user-id");
      
      api.post("insertcarteiradelivery", (values)).then(resp => {
        const var1 = document.getElementById("container_delivery_step1")
        const var2 = document.getElementById("container_delivery_step2")
        var1.classList.remove("hide")
        var2.classList.add("hide")

        this.ListPedido(undefined,this.state.dados_cliente.id,this.state.dados_cliente.idcliente);
        this.ListClientes()
        this.listEmAtendimento();
      })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pedido foi para Preparo!',
        showConfirmButton: false,
        timer: 1500
      })

    }else {
      Swal.fire({
        title: 'Error!',
        text: 'Impossivel Adicinar!',
        icon: 'error',
        confirmButtonText: 'OK!'
      })
    }
  }

  CreateCliente(values) {
    api.post("cliente", (values)).then((resp) => {
      document.getElementById("nome_delivery").value = "";
      document.getElementById("telefone_delivery").value ="";
      document.getElementById("cpf_delivery").value = "";
      document.getElementById("funcao_delivery").value = "*Escolha a Função*";
      document.getElementById("id_cliente_delivery").value = null;
      document.getElementById("endereco_rua").value = "";
      document.getElementById("endereco_numero").value = "";
      document.getElementById("endereco_cidade_bairro").value = "";

      this.ListClientes();
      if(!values.id) {
        Toast.fire({
          icon: 'success',
          title: 'Cliente Criado!'
        })
      }else {
        Toast.fire({
          icon: 'success',
          title: 'Cliente Atualizado!'
        })
      }
    })
  }

  AddPgtParc (formapagamento ,credito, valor_recebido) {
    if(credito > 0) {
      const idcliente = this.state.dados_cliente.idcliente
      const codigo = this.state.dados_cliente.idcliente
      const tipooperacao = "PGT_PARCIAL";
      const values = { formapagamento, credito,idmesa: undefined, tipooperacao, status: "EM ABERTO", idcliente, valor_recebido };
      const user_id = localStorage.getItem("user-id");

      auth(user_id).then(resp => {
        const create = resp.data[0].create_up;

        if(parseFloat(create) == 1) {
          api.post('pgtparcadd',(values)).then(resp => {
            this.ListPgtParc(undefined,idcliente) 
            Toast.fire({icon: 'success',title: `Pagamento adicionado!`})
          })
        }else {
          Toast.fire({icon: 'error',title: 'Voce nao tem permissão!'})
        }
      })
    }
  }

  delPgtParc (id, valor) {
		const idcliente = this.state.dados_cliente.idcliente;
    api.post('pgtparcdelete',({id})).then(resp => {
      this.ListPedido(undefined,this.state.dados_cliente.id,this.state.dados_cliente.idcliente)
    })
  }

  delPedido (id, estoque, idproduto, nome, quantidade) {
		const idcliente = this.state.dados_cliente.idcliente;
    var new_estoque = parseFloat(estoque) + parseFloat(quantidade);

    var values = { id, estoque: new_estoque, idproduto }
    const user_id = localStorage.getItem("user-id");

    var input_1 = document.getElementById("busca_produtos").value
    var input_2 = document.getElementById("busca_produtos2").value

    var grupo = this.state.grupo_atual;

    if(input_1 == "" && input_2 != "" && grupo != "Todos") {
      var busca = input_2;
      var grupo = this.state.grupo_atual;
    }else if(input_2 == "" && input_1 != "" && grupo == "Todos" ){
      var busca = input_1;
      var grupo = "";
    }else if(input_1 == "" && input_2 == "" && grupo != "Todos" ) {
      var busca = "";
      var grupo = grupo = this.state.grupo_atual;
    }else if( input_1 == "" && input_2 == "" && grupo == "Todos" ) {
      var busca = "";
      var grupo = "";
    }

    this.setState({values_pedido: []})

    auth(user_id).then(resp => {
      const del = resp.data[0].delete_up;

      if(parseFloat(del) == 1) {
        api.post('pedidodelete',(values)).then(resp => {
          this.ListPedido(undefined,this.state.dados_cliente.id,this.state.dados_cliente.idcliente)
          this.ListProd(grupo, busca)
        })
        Toast.fire({
          icon: 'success',
          title: `${nome} removido!`
        })
      }else {
        Toast.fire({
          icon: 'error',
          title: 'Voce nao tem permissão!'
        })
      }
    })
  }
  
  addPedido(values,quantidade){
    const user_id = localStorage.getItem("user-id");
    var new_estoque = parseFloat(values.estoque) - parseFloat(quantidade);

    var input_1 = document.getElementById("busca_produtos").value
    var input_2 = document.getElementById("busca_produtos2").value
    var grupo = this.state.grupo_atual;

    if(input_1 == "" && input_2 != "" && grupo != "Todos") {
      var busca = input_2;
      var grupo = this.state.grupo_atual;
    }else if(input_2 == "" && input_1 != "" && grupo == "Todos" ){
      var busca = input_1;
      var grupo = "";
    }else if(input_1 == "" && input_2 == "" && grupo != "Todos" ) {
      var busca = "";
      var grupo = grupo = this.state.grupo_atual;
    }else if( input_1 == "" && input_2 == "" && grupo == "Todos" ) {
      var busca = "";
      var grupo = "";
    }

    this.setState({values_pedido: []})

    if(!quantidade) {
      Swal.fire({
        title: 'Error!',
        text: 'Digite uma quantidade!',
        icon: 'error',
        confirmButtonText: 'OK!'
      })
    }else {
      const newValues = {
        controle_quantidade: values.controle_quantidade,
        controleestoque: values.controleestoque,
        estoque: values.estoque,
        estoqueminimo: values.estoqueminimo,
        idcliente: values.idcliente,
        idmesa: values.idmesa,
        idproduto: values.idproduto,
        nome: values.nome,
        valor_de_custo: values.valor_de_custo,
        valor_de_venda: values.valor_de_venda,
        vendaporpeso: values.vendaporpeso,
        quantidade: quantidade,
        estoque: new_estoque,
        iddelivery: values.iddelivery,
      }

      auth(user_id).then(resp => {
        const create = resp.data[0].create_up;

        if(parseFloat(create) == 1) {
          api.post('pedidoadd',(newValues)).then(resp => {
            var data = resp.data
            this.ListPedido(undefined,this.state.dados_cliente.id,this.state.dados_cliente.idcliente)
            this.ListProd(grupo, busca)

          })

          Toast.fire({
            icon: 'success',
            title: `${values.nome} adicionado!`
          })
          
        }else {
          Toast.fire({
            icon: 'error',
            title: 'Voce nao tem permissão!'
          })
        }
      })
    }
  }

  listEmAtendimento() {
    api.get("listematendimento").then(resp => {
      const data = resp.data;
      this.setState({em_atendimento: data});
   })
  }

  ListPedido(id,iddelivery,idcliente) {
    const values = {id: undefined, iddelivery, idcliente }
    api.post('consumolist',(values)).then(resp => {
      var data = resp.data;
      var total = 0;

      for (var i = 0; i < data.length; i++) {
        var preco = parseFloat(data[i].preco) * parseFloat(data[i].quantidade);
        var contador1 = parseFloat(preco) + parseFloat(total);
        total = contador1;
      }

      this.setState({pedidos: data})
      this.setState({total_consumo: total})
      this.ListPgtParc(undefined,idcliente)
    })
  }

  ListProd(grupo, busca){
    const values = {grupo: grupo, busca: busca}
    api.post('produtolist',(values)).then(resp => {
      var data = resp.data
        this.setState({produtos: data})
        if (!grupo) {
          this.setState({grupo_atual: "Todos"})
        }else {
          this.setState({grupo_atual: grupo})
        }
    })
  }

	ListGrupo(){
		api.post('grupoprodutolist').then(resp => {
			var data = resp.data
			this.setState({grupos: data})
    })
	}

  ListClientes(busca) {
    api.post("clientelist",({busca})).then(resp => {
      const data = resp.data;
      this.setState({clientes: data});
   })
  }

  listFuncao() {
    api.get('clientelistfuncao').then(resp => {
      const data = resp.data;
      this.setState({funcao: data})
    })
  }

  ListTiposDePagamento(){
    api.get('tipopgto').then(resp => {
      var data = resp.data
      this.setState({btn_tipo_de_pagamento: data})
    })
  }

  ListPgtParc (id,idcliente) {
    const values = {idmesa: id,idcliente};

    api.post('pgtparclist',(values)).then(resp => {
      var data = resp.data;
      this.setState({pagamentos_parciais: data})

      var dinheiro = 0;
      var cartao = 0;
      var valor_recebido = 0;

      for (var i = 0; i < data.length; i++) {
        var credito = `${data[i].credito}`;
        var formapagamento = `${data[i].formapagamento}`;
        var contador = parseFloat(data[i].valor_recebido) + parseFloat(valor_recebido);
        var valor_recebido = contador;

        if(formapagamento == "DINHEIRO" || formapagamento == "RUA" ){
          var contadorDinheiro = parseFloat(dinheiro) + parseFloat(credito);
          dinheiro = contadorDinheiro;
        }
        if(formapagamento == "CARTAO-C" || formapagamento == "CARTAO-D" || formapagamento == "PIX"){
          var contadorCartao = parseFloat(cartao) + parseFloat(credito);
          cartao = contadorCartao;
        }
      }

      var total = this.state.total_consumo;
      var recebido_parcial = parseFloat(dinheiro) + parseFloat(cartao);
      var diferenca = parseFloat(recebido_parcial) - parseFloat(total);

      var old_troco = this.state.troco;

      if(!valor_recebido){
        var troco = 0; 
      }else {
        var troco = parseFloat(total) - parseFloat(valor_recebido)
      }

      if(diferenca >= 0 ) {
        this.setState({falta: 0})
        this.setState({troco: parseFloat(troco * -1)})
        var btn_finalizar = document.getElementById("finaliza_caixa");
        btn_finalizar.classList.remove("off");
        this.setState({btn_finalizar_state: false})
      }else {
        var newDiferenca = parseFloat(diferenca * -1)
        this.setState({troco: 0})
        this.setState({falta: newDiferenca.toFixed(2)})
        var btn_finalizar = document.getElementById("finaliza_caixa");
        btn_finalizar.classList.add("off");
        this.setState({btn_finalizar_state: true})
      }

      if ( parseFloat(total) == 0 ) {
        var btn_finalizar = document.getElementById("finaliza_caixa");
        btn_finalizar.classList.add("off");
        this.setState({btn_finalizar_state: true})
      }

      this.setState({total_dinheiro: dinheiro})
      this.setState({total_cartao: cartao})
      this.setState({total_parcial: recebido_parcial.toFixed(2)})
    })
  }

  componentDidMount() {
		this.ListGrupo();
    this.ListTiposDePagamento();
    this.ListClientes();
    this.listFuncao();
    this.listEmAtendimento();
    this.ListDadosUsuario();
  }

  render() {
    return (
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='100%' className='vurox-scroll-x '>
          <VuroxComponentsContainer className='container_delivery'>
            <Step1 props={this} />
            <div className="step2_delivery hide custom_container_100_pdv"  id="container_delivery_step2">
              <PainelDeProdutos props={this} />
              <PainelOperacional props={this} />
              <PainelFinanceiro props={this} />
              <CupomNaoFiscalComponent props={this} />
            </div>
          </VuroxComponentsContainer>
        </ContentLayout>
        <VendaPorQuantidade props={this}/>
      </VuroxLayout>
    );
  }
}

export default Delivery;