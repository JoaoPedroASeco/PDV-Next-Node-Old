import React,  {Component,useEffect, useRef, useState, useContext} from 'react'
import { useReactToPrint } from 'react-to-print';
import {connect} from 'react-redux'
import { useRouter } from "next/router";
import Swal from 'sweetalert2'
import api from '../services/api';

import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import SidebarComponent from '../Components/RepositoryDelivery/step3/SidebarComponent'

import { vuroxContext } from '../context'

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

import {CupomDelivery} from '../Components/RepositoryCupons/CupomPedidoDelivery/Component'

const Pedidos_DeliveryComponent = ({props}) => {
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => { setFormLayout(layout) };

  const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 }, } : null;

  const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 }, } : null;

  const {menuState} = props.context

  const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	const { toggleMenu } = useContext(vuroxContext)

  const listDelivery1 = (e) => {
    e.preventDefault();
    const busca = document.getElementById("busca1_list_delivery").value
    props.listDelivery(busca,0)
  }

  const listDelivery2 = (e) => {
    e.preventDefault();
    const busca = document.getElementById("busca2_list_delivery").value
    props.listDelivery(busca,1)
  }

  const openFinalizados = () => {
    const a_caminho = document.getElementById("pedidos_delivery_acaminho")
    const finalizados = document.getElementById("pedidos_delivery_finalizados")

    a_caminho.classList.add("hide")
    finalizados.classList.remove("hide")
  }

  const closeFinalizados = () => {
    const a_caminho = document.getElementById("pedidos_delivery_acaminho")
    const finalizados = document.getElementById("pedidos_delivery_finalizados")

    a_caminho.classList.remove("hide")
    finalizados.classList.add("hide")
  }

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const updateStatusDelivery = ( iddelivery, idcliente, status, entregador,nomePessoaDelivery, horarioDelivery, newTotal, newTroco, telefone, rua, numero, bairro_cidade ) => {
    var bg_cupom = document.getElementById("container_imprime_cupom")
    var modalcupom = document.getElementById("cupom_delivery")
    bg_cupom.classList.remove("hide")
    modalcupom.classList.remove("hide")
    const data = { iddelivery, idcliente, status, entregador, nomePessoaDelivery, horarioDelivery, newTotal, newTroco, telefone, rua, numero, bairro_cidade }
    props.setState({dados_delivery_em_preparo_2: data})

		bg_cupom.addEventListener("click", () => {
			if(event.target.id == "container_imprime_cupom" ) {
			  bg_cupom.classList.add("hide");
			}
		});
  }

  var total_consumo_delivery = 0;

  return (
    <React.Fragment>
      <HeaderLayout className="sticky-top">
        <HeaderDark />
      </HeaderLayout>
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='100%' className='vurox-scroll-x '>
          <VuroxComponentsContainer className='custom_container_100_pdv container_pedidos_delivery'>

            <div className="pedidos_delivery">

              <h2 className="h2_title titulo_pedidos_em_preparo">Deliveries em Preparo:</h2>

              <form onSubmit={listDelivery1}>
                <input type="text" className="input_form_full" id="busca1_list_delivery" placeholder="Nome/Telefone" />
                <button type="submit" className="btn_BuscaGeralCliente"></button>
              </form>

              <ul className="head_table">
                <li><button className="" id="" onClick={ () => {props.listDelivery(undefined, undefined, 3, props.state.list_tempo )}}><img src="./image/order_time.svg" /></button></li>
                <li><button className="" id="" onClick={ () => {props.listDelivery(undefined, undefined, 1, props.state.list_pessoa)}}><img src="./image/order_user.svg" /></button></li>
                <li><button className="" id="" onClick={ () => {props.listDelivery(undefined, undefined, 2, props.state.list_motoboy)}}><img src="./image/order_motoboy.svg" /></button></li>
              </ul>

              <ul className="list_delivery_geral">
                {props.state.list_delivery_preparo.map(resp => {
                  const iddelivery1 = resp.iddelivery;
                  const status = resp.status;
                  const id_status = resp.idstatus;
                  const id_entregador = resp.identregador;
                  var selectentregador = `entregador_delivery${resp.idcliente}${resp.iddelivery}`
                  var selectstatus = `status_delivery${resp.idcliente}${resp.iddelivery}`
                  var newTroco = props.formatMoney().format(resp.troco)
                  var newTotal = props.formatMoney().format(resp.total)
                  var nomePessoaDelivery = resp.nome;
                  var horarioDelivery = resp.horario;
                  var TelefoneDelivery = resp.telefone;
                  var rua = resp.rua;
                  var numero = resp.numero;
                  var bairro_cidade = resp.bairro_cidade;

                  if( status == "PREPARO PARA ENVIO" ){
                    return (
                      <li key={resp.iddelivery}>

                        <div className="dados_deliver">
                          <div className="ver_consumo_delivery_btn">
                            <button title="Exibir Consumo" className="btn_geral show_consumo_delivery" id={`show_consumo_delivery${resp.iddelivery}`} onClick={ () =>{props.listConsumoDelivery(resp.iddelivery,resp.idcliente)}}><img src="./image/ver_consumo.svg" alt="Ver Consumo" /></button>
                            <button title="Esconder Consumo" className="btn_geral close_consumo_delivery hide" id={`close_consumo_delivery${resp.iddelivery}`}><img src="./image/close_consumo_delivery.svg" alt="Ver Consumo" /></button>
                          </div>

                          <div className="container_descricao_delivery">

                            <div className="descricao_delivery">

                              <div className="descricao_1">
                                <span className="delivery_nome">{nomePessoaDelivery}</span>
                                <span className="delivery_horario"><span>{horarioDelivery}</span></span>
                              </div>

                              <div className="descricao_2">
                                <span className="">Total: {newTotal}</span>
                                <span className="delivery_troco">Troco: {newTroco}</span>
                              </div>

                            </div>

                            <div className="container_entregador_delivery">
                              <label>Motoboy:</label>
                              <select className="select_form_3 entregador_delivery" id={selectentregador}>
                                {props.state.entregador.map(resp => {
                                  const identregador = resp.id;
                                  const entregador = resp.nome;
                                  if (id_entregador == identregador){                            
                                    return (
                                      <option>{resp.nome}</option>
                                    )
                                  } else {
                                    return (
                                      <option>{resp.nome}</option>
                                    )
                                  }
                                })}
                              </select>
                            </div>
                          </div>

                          <div className="finaliza_devolve_delivery">
                            <button  className="btn_geral entregue_delivery" onClick={ () => { updateStatusDelivery({ iddelivery: resp.iddelivery, idcliente: resp.idcliente, status: "A CAMINHO", nomePessoaDelivery, horarioDelivery, newTotal, newTroco, TelefoneDelivery, rua, numero , bairro_cidade }) }}>E</button>
                          </div>

                        </div>

                        <div className="container_consumo_delivery hide" id={`container_consumo_delivery${resp.iddelivery}`}> 
                          <ul >
                            {props.state.consumo_delivery.map(resp => {
                              const iddelivery2 = resp.id
                              var preco = parseFloat(resp.preco) * parseFloat(resp.quantidade);
                              var contador = parseFloat(preco) + parseFloat(total_consumo_delivery);
                              total_consumo_delivery = contador;
                              var newPreco = props.formatMoney().format(preco)
                              return (
                                <li>
                                  <span className="nome_pedido_delivery">{resp.quantidade} x</span>
                                  <span className="nome_pedido_delivery">{resp.nome}</span>
                                  <span className="preco_pedido_delivery">{newPreco}</span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </li>
                    )
                  }
                })}
              </ul>

            </div>

            <div className="pedidos_delivery" id="pedidos_delivery_acaminho">

              <div className="titulo_pedidos_delivery">
                <h2 className="h2_title">Deliveries Enviados:</h2>
                <button className="btn_geral" onClick={() => {openFinalizados()}} >Finalizados</button>
              </div>

              <form onSubmit={listDelivery2}>
                <input type="text" className="input_form_full" id="busca2_list_delivery" placeholder="Nome/Telefone" />
                <button type="submit" className="btn_BuscaGeralCliente"></button>
              </form>

              <ul className="head_table">
                <li><button className="" id="" onClick={ () => {props.listDelivery(undefined, undefined, 3, props.state.list_tempo )}}><img src="./image/order_time.svg" /></button></li>
                <li><button className="" id="" onClick={ () => {props.listDelivery(undefined, undefined, 1, props.state.list_pessoa)}}><img src="./image/order_user.svg" /></button></li>
                <li><button className="" id="" onClick={ () => {props.listDelivery(undefined, undefined, 2, props.state.list_motoboy)}}><img src="./image/order_motoboy.svg" /></button></li>
              </ul>

              <ul className="list_delivery_geral">
                {props.state.list_delivery.map(resp => {
                  const iddelivery1 = resp.iddelivery;
                  const status = resp.status;
                  const id_status = resp.idstatus;
                  const id_entregador = resp.identregador;
                  var selectentregador = `entregador_delivery${resp.idcliente}${resp.iddelivery}`
                  var selectstatus = `status_delivery${resp.idcliente}${resp.iddelivery}`
                  var newTroco = props.formatMoney().format(resp.troco)
                  var newTotal = props.formatMoney().format(resp.total)

                  if( status == "A CAMINHO" ){
                    return (
                      <li key={resp.iddelivery}>

                        <div className="dados_deliver">
                          <div className="ver_consumo_delivery_btn">
                            <button title="Exibir Consumo" className="btn_geral show_consumo_delivery" id={`show_consumo_delivery${resp.iddelivery}`} onClick={ () =>{props.listConsumoDelivery(resp.iddelivery,resp.idcliente)}}><img src="./image/ver_consumo.svg" alt="Ver Consumo" /></button>
                            <button title="Esconder Consumo" className="btn_geral close_consumo_delivery hide" id={`close_consumo_delivery${resp.iddelivery}`}><img src="./image/close_consumo_delivery.svg" alt="Ver Consumo" /></button>
                          </div>

                          <div className="container_descricao_delivery">

                            <div className="descricao_delivery">
                              <div className="descricao_1">
                                <span className="delivery_nome">{resp.nome}</span>
                                <span className="delivery_horario"><span>{resp.horario}</span><span>Motoboy: {resp.entregador}</span></span>
                              </div>
                              <div className="descricao_2">
                                <span className="">Total: {newTotal}</span>
                                <span className="delivery_troco">Troco: {newTroco}</span>
                              </div>
                            </div>

                          </div>

                          <div className="finaliza_devolve_delivery">
                            <button title="Pedido Entregue" className="btn_geral entregue_delivery" onClick={() => {props.finalizaGeralDelivery({ iddelivery: resp.iddelivery, status: "ENTREGUE"})}}>E</button>
                            <button title="Pedido Devolvido" className="btn_geral devolvido_delivery" onClick={() => {props.finalizaGeralDelivery({ iddelivery: resp.iddelivery, status: "DEVOLVIDO"})}}>D</button>
                          </div>
                        </div>

                        <div className="container_consumo_delivery hide" id={`container_consumo_delivery${resp.iddelivery}`}> 
                          <ul >
                            <li><button onClick={() => {props.updateStatusDelivery({ iddelivery: resp.iddelivery, idcliente: resp.idcliente, status: "PREPARO PARA ENVIO", entregador: resp.entregador})}}>Voltar pedido para em preparo</button></li>
                            {props.state.consumo_delivery.map(resp => {
                              
                              const iddelivery2 = resp.id
                              var preco = parseFloat(resp.preco) * parseFloat(resp.quantidade);
                              var contador = parseFloat(preco) + parseFloat(total_consumo_delivery);
                              total_consumo_delivery = contador;
                              var newPreco = props.formatMoney().format(preco)
                              return (
                                <li>
                                  <span className="nome_pedido_delivery">{resp.quantidade} x</span>
                                  <span className="nome_pedido_delivery">{resp.nome}</span>
                                  <span className="preco_pedido_delivery">{newPreco}</span>
                                </li>
                              )

                            })}
                          </ul>
                        </div>

                      </li>
                    )
                  }
                })}
              </ul>

            </div>

            <div className="pedidos_delivery hide" id="pedidos_delivery_finalizados">

              <div className="titulo_pedidos_delivery">
                <h2 className="h2_title">Deliveries Finalizados:</h2>
                <button className="btn_geral" onClick={() => {closeFinalizados()}}>A Caminho</button>
              </div>

              <form onSubmit={listDelivery2}>
                <input type="text" className="input_form_full" id="busca2_list_delivery" placeholder="Nome/Telefone" />
                <button type="submit" className="btn_BuscaGeralCliente"></button>
              </form>

              <ul className="head_table">
              </ul>

              <ul className="list_delivery_geral">
                {props.state.list_delivery.map(resp => {
                  const iddelivery1 = resp.iddelivery;
                  const status = resp.status;
                  const id_status = resp.idstatus;
                  const id_entregador = resp.identregador;
                  var selectentregador = `entregador_delivery${resp.idcliente}${resp.iddelivery}`
                  var selectstatus = `status_delivery${resp.idcliente}${resp.iddelivery}`
                  var newTroco = props.formatMoney().format(resp.troco)
                  var newTotal = props.formatMoney().format(resp.total)

                  if( status == "ENTREGUE" || status == "DEVOLVIDO" ) {
                    return (
                      <li key={resp.iddelivery}>

                        <div className="dados_deliver">

                          <div className="ver_consumo_delivery_btn">
                            <button title="Exibir Consumo" className="btn_geral show_consumo_delivery" id={`show_consumo_delivery${resp.iddelivery}`} onClick={ () =>{props.listConsumoDelivery(resp.iddelivery,resp.idcliente)}}><img src="./image/ver_consumo.svg" alt="Ver Consumo" /></button>
                            <button title="Esconder Consumo" className="btn_geral close_consumo_delivery hide" id={`close_consumo_delivery${resp.iddelivery}`}><img src="./image/close_consumo_delivery.svg" alt="Ver Consumo" /></button>
                          </div>

                          <div className="container_descricao_delivery">

                            <div className="descricao_delivery">
                              <div className="descricao_1">
                                <span className="delivery_nome">{resp.nome}</span>
                                <span className="delivery_horario"><span>{resp.horario}</span><span>Motoboy: {resp.entregador}</span></span>
                              </div>
                              <div className="descricao_2">
                                <span className="">Total: {newTotal}</span>
                                <span className="delivery_troco">Troco: {newTroco}</span>
                              </div>
                            </div>

                          </div>

                        </div>

                        <div className="container_consumo_delivery hide" id={`container_consumo_delivery${resp.iddelivery}`}> 
                          <ul>
                            <li><button onClick={() => {props.updateStatusDelivery({ iddelivery: resp.iddelivery, idcliente: resp.idcliente, status: "PREPARO PARA ENVIO", entregador: resp.entregador})}}>Voltar pedido para em preparo</button></li>
                            {props.state.consumo_delivery.map(resp => {
                              const iddelivery2 = resp.id
                              var preco = parseFloat(resp.preco) * parseFloat(resp.quantidade);
                              var contador = parseFloat(preco) + parseFloat(total_consumo_delivery);
                              total_consumo_delivery = contador;
                              var newPreco = props.formatMoney().format(preco)
                              return (
                                <li>
                                  <span className="nome_pedido_delivery">{resp.quantidade} x</span>
                                  <span className="nome_pedido_delivery">{resp.nome}</span>
                                  <span className="preco_pedido_delivery">{newPreco}</span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </li>
                    )
                  }
                })}
              </ul>

            </div>

          </VuroxComponentsContainer>
        </ContentLayout>
      </VuroxLayout>
    </React.Fragment>
  );
}

class ContainerDelivery extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list_delivery: [],
      list_delivery_preparo: [],
      consumo_delivery: [],
      entregador: [],
      status: [],
      total_consumo_delivery: [],
      dados_usuario: [],
      dados_delivery_em_preparo_2: [],
      list_tempo: true,
      list_pessoa: true,
      list_motoboy: true,
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

  finalizaGeralDelivery ({iddelivery, status}) {

    if(status == "ENTREGUE") {
      var newStatus = "Entregue"
    }else if(status == "DEVOLVIDO"){
      var newStatus = "Devolvido"
    }
    swalWithBootstrapButtons.fire({
      title: 'Finalizar ?',
      text: `O pedido foi ${newStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        api.post("finalizageraldelivery",({id: iddelivery, status})).then( resp => {
          this.listDelivery()

          swalWithBootstrapButtons.fire(
            `Pedido ${newStatus}!`,
            'Sucesso ao finalizar!',
            'success'
          )
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Ação cancelada',
          'Voce cancelou a Ação',
          'error'
        )
      }
    })
  }

  updateStatusDelivery ({iddelivery, idcliente, status, entregador}) {

    if(!entregador) {
      var entregador = document.getElementById(`entregador_delivery${idcliente}${iddelivery}`).value
    }

    const values = { status, entregador, iddelivery }
    api.post("updatestatusdelivery",(values)).then(resp => {
      this.listDelivery()
      if(status == "A CAMINHO") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'O Pedido Foi Enviado!',
          showConfirmButton: false,
          timer: 1500
        })
      }else if(status == "PREPARO PARA ENVIO") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'O Pedido Voltou para Preparo!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  listEntregador () {
    api.get("listentregador").then(resp => {
      const data = resp.data;
      this.setState({entregador: data})
    })
  }

  listStatus () {
    api.get("liststatus").then(resp => {
      const data = resp.data;
      this.setState({status: data})
    })
  }

  listDelivery(busca,n,order,boolean) {
    api.post("listdelivery",({ busca, order, boolean })).then(resp => {
      const data = resp.data;
      if(parseFloat(order) == 3 && boolean == false ){
        this.setState({list_tempo: true})
      }
      if(parseFloat(order) == 3 && boolean == true) {
        this.setState({list_tempo: false})
      }

      if(parseFloat(order) == 1 && boolean == false ){
        this.setState({list_pessoa: true})
      }

      if(parseFloat(order) == 1 && boolean == true) {
        this.setState({list_pessoa: false})
      }

      if(parseFloat(order) == 2 && boolean == false ){
        this.setState({list_motoboy: true})
      }
      if(parseFloat(order) == 2 && boolean == true) {
        this.setState({list_motoboy: false})
      }

      if( parseFloat(n) == 0) {
        this.setState({list_delivery_preparo: []})
      }
      if( parseFloat(n) == 1){
        this.setState({list_delivery: []})
      }

      if (!n) {
        this.setState({list_delivery_preparo: []})
        this.setState({list_delivery: []})
      }

      if(!n) {
        for (var i = 0; i < data.length; i++) {
          var status = `${data[i].status}`;
          if(status == "PREPARO PARA ENVIO") {
            this.setState({list_delivery_preparo: data})
          }else if(status == "A CAMINHO" || status == "ENTREGUE" || status == "DEVOLVIDO"){
            this.setState({list_delivery: data})
          }
        }
      }else if( parseFloat(n) == 0) {
        for (var i = 0; i < data.length; i++) {
          var status = `${data[i].status}`;
          if(status == "PREPARO PARA ENVIO") {
            this.setState({list_delivery_preparo: data})
          }
        }
      }else if( parseFloat(n) == 1) {
        for (var i = 0; i < data.length; i++) {
          var status = `${data[i].status}`;
          if(status == "A CAMINHO" || status == "ENTREGUE" || status == "DEVOLVIDO"){
            this.setState({list_delivery: data})
          }
        }
      }
    })
  }

  listConsumoDelivery(id,idcliente) {
    const hide_consumos = document.getElementsByClassName("container_consumo_delivery")
    const hide_show_consumo = document.getElementsByClassName("show_consumo_delivery")
    const hide_close_consumo = document.getElementsByClassName("close_consumo_delivery")

    const list_consumo = document.getElementById(`container_consumo_delivery${id}`)
    const show_consumo = document.getElementById(`show_consumo_delivery${id}`)
    const close_consumo = document.getElementById(`close_consumo_delivery${id}`)
    
    for (var i = 0; i < hide_consumos.length; i++) {
      hide_consumos[i].classList.add("hide")
    }
    for (var i = 0; i < hide_show_consumo.length; i++) {
      hide_show_consumo[i].classList.remove("hide")
    }
    for (var i = 0; i < hide_close_consumo.length; i++) {
      hide_close_consumo[i].classList.add("hide")
    }

    list_consumo.classList.remove("hide")
    show_consumo.classList.add("hide")
    close_consumo.classList.remove("hide")

    api.post("listconsumodelivery",({id,idcliente}) ).then(resp => {
      var data = resp.data.rows;
      this.setState({consumo_delivery: data});
    })

    close_consumo.addEventListener("click", () => {
      if (event.target.id = `close_consumo_delivery${id}`) {
        list_consumo.classList.add("hide")
        close_consumo.classList.add("hide")
        show_consumo.classList.remove("hide")
      }
    });
  }

  componentDidMount() {
    this.listDelivery();
    this.listEntregador();
    this.listStatus();
    this.ListDadosUsuario();
  }

	render() {
  return (
    <div>
      <Pedidos_DeliveryComponent props={this} />
      <CupomDelivery props={this} />
    </div>
		);
	}
}

export default connect(state=>state)(ContainerDelivery);