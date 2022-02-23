import React, { Component,useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import CurrencyInput from 'react-currency-masked-input'
import Swal from 'sweetalert2'
import auth from '../../services/auth';
import api from '../../services/api';

import {
	VuroxLayout,
	HeaderLayout,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import PainelDeProdutos from './PainelDeProdutos';
import PainelOperacional from './PainelOperacional';
import PainelFinanceiro from './PainelFinanceiro';
import SidebarComponent from './SidebarComponent'
import {CupomNaoFiscalComponent} from '../RepositoryCupons/CupomNaoFiscal/Component'

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

class PDV extends Component {

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
      btn_finalizar_state: true,
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
  
  ListClientes(busca) {
    api.post("clientelist",({busca})).then(resp => {
      const data = resp.data;
      this.setState({clientes: data});
   })
  }

  ListDadosUsuario() {
    api.get("configlist").then(resp => {
      const data = resp.data;
      this.setState({dados_usuario: data});
   })
  }

	AddMesa(codigo){
    if(!codigo){
      Toast.fire({
        icon: 'error',
        title: 'Digite um Nome Correto!'
      })
    }else {
    const values = {codigo}
    api.post('mesaadd',(values)).then(resp => {
      var data = resp.data
      this.ListMesa()
      document.getElementById("codigo_mesa").value = ""
      Toast.fire({
        icon: 'success',
        title: `Mesa "${codigo}" Criada!`,
      })
    })
    }

  }

  ListMesa(){
    api.get('mesalist').then(resp => {
      var data = resp.data.rows
      this.setState({mesas: data})
    })
  }

  finalizaMesa() {
		const idmesa = document.getElementById("id_mesa").value;
		const codigo = document.getElementById("val_codigo_mesa").value;
    var credito = this.state.total_consumo;
    var falta = this.state.falta;
    var troco = this.state.troco;

    if (falta == 0 && troco >= 0 ){
      const values = { idmesa , credito }

      api.post('finalizamesa',(values)).then(resp => {
        var bg_container_cupom = document.getElementById("container_imprime_cupom")
        var div_finalizar = document.getElementById("cupom_finaliza_mesa")
        bg_container_cupom.classList.add("hide")
        div_finalizar.classList.add("hide")
        this.setState({pedidos: []})
        this.ListPedido(idmesa,codigo)
        this.ListMesa()
      })
    }
  }

  AddCarteira(values) {
    const idmesa = document.getElementById("id_mesa").value;

    if(!idmesa){
      Swal.fire({
        title: 'Error!',
        text: 'Escolha uma MESA',
        icon: 'error',
        confirmButtonText: 'OK!'
      })
    }else {
      if(parseFloat(values.debito) > 0){
        const idmesa = document.getElementById("id_mesa").value;
        const codigo = document.getElementById("val_codigo_mesa").value;
        const user_id = localStorage.getItem("user-id");
        
        api.post("carteirainsert", (values)).then(resp => {
          this.ListMesa()
          this.ListClientes()
          this.setState({pedidos: []})
          this.ListPedido(idmesa,codigo)


          Toast.fire({
            icon: 'success',
            title: `Valor adocionado na carteira de: ${values.nome}!`
          })
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

  }

  ListTiposDePagamento(){
    api.get('tipopgto').then(res => {
      var data = res.data
      this.setState({btn_tipo_de_pagamento: data})
    })
  }

  ListPgtParc (id) {
    const values = {idmesa: id};

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

  AddPgtParc ( formapagamento, credito, valor_recebido ) {
    const idmesa = document.getElementById("id_mesa").value;
    if(!idmesa){
      Swal.fire({
        title: 'Error!',
        text: 'Escolha uma MESA',
        icon: 'error',
        confirmButtonText: 'OK!'
      })
    }else {
      if(credito > 0){
        const idmesa = document.getElementById("id_mesa").value;
        const codigo = document.getElementById("val_codigo_mesa").value;
        const tipooperacao = "PGT_PARCIAL";
        const values = { formapagamento, credito, idmesa, tipooperacao, status: "EM ABERTO", valor_recebido };
        const user_id = localStorage.getItem("user-id");

        auth(user_id).then(resp => {
          const create = resp.data[0].create_up;

          if(parseFloat(create) == 1) {
            api.post('pgtparcadd',(values)).then(resp => {
              this.ListPedido(idmesa,codigo)
              Toast.fire({
                icon: 'success',
                title: `Pagamento adicionado!`
              })
            })
          }else {
            Toast.fire({
              icon: 'error',
              title: 'Voce nao tem permissão!'
            })
          }
        })

      }else {
        Swal.fire({
          title: 'Error!',
          text: 'Digite um valor Valido!',
          icon: 'error',
          confirmButtonText: 'OK!'
        })
      }
    }
  }

  delPgtParc (id) {
    const codigo = document.getElementById("val_codigo_mesa").value;
    const idmesa = document.getElementById("id_mesa").value;
    const user_id = localStorage.getItem("user-id");

    auth(user_id).then(resp => {
      const create = resp.data[0].create_up;
      const update = resp.data[0].update;
      const list = resp.data[0].list;
      const del = resp.data[0].delete_up;

      if(parseFloat(create) == 1) {
        api.post('pgtparcdelete',({id})).then(resp => {this.ListPedido(idmesa,codigo)})
        Toast.fire({
          icon: 'success',
          title: `Pagamento removido!`
        })
      }else {
        Toast.fire({
          icon: 'error',
          title: 'Voce nao tem permissão!'
        })
      }
    })
  }

  delPedido (id, estoque, idproduto, nome, quantidade) {
    const codigo = document.getElementById("val_codigo_mesa").value;
    const idmesa = document.getElementById("id_mesa").value;
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
          this.ListPedido(idmesa,codigo)
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
		const idmesa = document.getElementById("id_mesa").value;
    const user_id = localStorage.getItem("user-id");
    const codigo = document.getElementById("val_codigo_mesa").value;
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
      }


      if(!idmesa){
        Swal.fire({
          title: 'Error!',
          text: 'Escolha uma MESA',
          icon: 'error',
          confirmButtonText: 'OK!'
        })
      }else {
        auth(user_id).then(resp => {
          const create = resp.data[0].create_up;
          if(parseFloat(create) == 1) {
            api.post('pedidoadd',(newValues)).then(resp => {
              var data = resp.data
              this.ListPedido(idmesa,codigo)
              this.ListProd(grupo, busca)
              var bg_add_produto = document.getElementById("bg_container_add_produto")
              bg_add_produto.classList.add("hide")
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
  }

  ListPedido(id,codigo) {
    const values = {id: id};
    api.post('consumolist',(values)).then(res => {
      var data = res.data;
      var total = 0;

      for (var i = 0; i < data.length; i++) {
        if (data[i].status != "BAIXADO") {
          var preco = parseFloat(data[i].preco) * parseFloat(data[i].quantidade);
          var contador1 = parseFloat(preco) + parseFloat(total);
          total = contador1;
          this.setState({pedidos: data})
        }
      }

      this.setState({total_consumo: total})
      this.setState({mesa_em_uso: codigo})
      this.ListPgtParc(id)
    })
  }

  ListProd(grupo, busca){
    const values = {grupo: grupo, busca: busca}
    api.post('produtolist',(values)).then(res => {
      var data = res.data
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

  componentDidMount() {
		this.ListGrupo()
		this.ListMesa()
    this.ListTiposDePagamento()
    this.ListClientes()
    this.ListDadosUsuario()
  }

  render() {
    return (
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='100%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className='custom_container_100_pdv'>
            <PainelDeProdutos props={this} />
            <PainelOperacional props={this} />
            <PainelFinanceiro props={this} />
            <CupomNaoFiscalComponent props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
        <VendaPorQuantidade props={this}/>
      </VuroxLayout>
    );
  }
}

export default PDV;
