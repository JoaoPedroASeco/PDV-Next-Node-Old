import React, { Component,useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

class ComponentToPrint extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
  
  render() {
    var date = new Date();
    var dia = date.getDate();
    var hora = date.getHours();
    var minuto = date.getMinutes();
    var segundo = date.getSeconds();

    if (dia < 10) {
      var newdia = 0 + "" + dia;
    } else if (dia == 10) {
      var newdia = dia;
    } else if (dia > 10) {
      var newdia = dia;
    }
    var mes = date.getUTCMonth();
    mes = parseFloat(mes) + parseFloat(1);
    if (mes < 10) {
      var newmes = 0 + "" + mes;
    } else if (mes == 10) {
      newmes = parseFloat(mes) + parseFloat(1);
    } else if (mes > 10) {
      newmes = 0 + "" + parseFloat(mes) + parseFloat(1);
    }
    var ano = date.getUTCFullYear();
    var data = `${newdia}/${newmes}/${ano} ${hora}:${minuto}:${segundo}`;

    var newTotal = this.props.props.formatMoney().format(this.props.props.state.total_consumo)
    var newDinheiro = this.props.props.formatMoney().format(this.props.props.state.total_dinheiro)
    var newCartao = this.props.props.formatMoney().format(this.props.props.state.total_cartao)
    var newRecebidoParcial = this.props.props.formatMoney().format(this.props.props.state.total_parcial)
    var newFalta = this.props.props.formatMoney().format(this.props.props.state.falta)
    var newTroco = this.props.props.formatMoney().format(this.props.props.state.troco)
    
    return (
      <div className="cupom_geral hide" id="cupom_nao_fiscal"> 
        <div className="local_cupom">
          {this.props.props.state.dados_usuario.map(resp => {
            return (
              <h3 key={`${resp.id}_${resp.nome_empresa}`}>{resp.nome_empresa}</h3>
            )
          })}
        </div>

        <span className="line"></span>

        {this.props.props.state.dados_usuario.map(resp => {
          return (
            <div key={resp.id} className="subtitulo_cupom">
              <h3>{resp.endereco_empresa}</h3>
              <h3>CNPJ: {resp.cnpj_empresa}</h3>
              <h3>Telefone: {resp.telefone_empresa}</h3>
            </div>
          )
        })}

        <span className="line"></span>

        <h3 className="titulo_cupom">C U P O M - N Ã O - F I S C A L</h3>

        <span className="line"></span>

        <div className="data_cupom">
          <h3>Data/Hora:</h3>
          <h3>{data}</h3>
        </div>
        
        <span className="line"></span>

          <h3 className="titulo_cupom">Consumo</h3>

        <span className="line"></span>

        <div className="list_consumo_cupom" >
          <ul>
            <li className="cupom_descricao">Descrição</li>
            <li className="cupom_quantidade">QTD</li>
            <li className="cupom_valor">Valor</li>
          </ul>
          
          <ul className="listagem_consumo_cupom">
            {this.props.props.state.pedidos.map(resp => {
              if(resp.status != "BAIXADO") {
                var preco = this.props.props.formatMoney().format(parseFloat(resp.preco) * parseFloat(resp.quantidade))

                return (
                  <li key={`${resp.id}_${resp.nome}`}>
                    <span className="cupom_descricao">{resp.nome}</span>
                    <span className="cupom_quantidade">{resp.quantidade}</span>
                    <span className="cupom_valor">{preco}</span>
                  </li>
                )
              }
            })}
          </ul>

          <div className="total_consumo_cupom">
            <h3>Total:</h3>
            <h3>{newTotal}</h3>
          </div>

        </div>

        <span className="line"></span>

        <div className="relatorio_pagamentos">
          <div>
            <h3>Pago no cartão:</h3>
            <span>{newCartao}</span>
          </div>

          <div>
            <h3>Pago no Dinheiro:</h3>
            <span>{newDinheiro}</span>
          </div>

          <div>
            <h3>Troco: </h3>
            <span>{newTroco}</span>
          </div>

          <div>
            <h3>Em haver: </h3>
            <span>{newFalta}</span>
          </div>
        </div>

        <span className="line"></span>

        <div className="observacoes_cupom">
          <h3>Observações:</h3>
        </div>

        <span className="line"></span>

        <div className="footer_cupom">
          <h3>Obrigado e Volte Sempre !</h3>
        </div>

        <span className="line"></span>

      </div>
    )
  }
}

export const CupomNaoFiscalComponent = ({props}) => {

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const mostraCupom = async () => {
    var cupom = document.getElementById("cupom_nao_fiscal")
    var imprime_cupom = document.getElementById("imprime_cupom")
    var finaliza_cupom = document.getElementById("cupom_finaliza_mesa")
    cupom.classList.remove("hide")
    await handlePrint()
    imprime_cupom.classList.add("hide")
    finaliza_cupom.classList.remove("hide")
  }

  const mostraCupom2 = async () => {
    var cupom = document.getElementById("cupom_nao_fiscal")
    var imprime_cupom = document.getElementById("imprime_cupom2")
    var finaliza_cupom = document.getElementById("cupom_finaliza_carteira")
    cupom.classList.remove("hide")
    await handlePrint()
    imprime_cupom.classList.add("hide")
    finaliza_cupom.classList.remove("hide")
  }

  const mostraCupom3 = async () => {
    var cupom = document.getElementById("cupom_nao_fiscal")
    var imprime_cupom = document.getElementById("imprime_cupom3")
    var finaliza_cupom = document.getElementById("cupom_finaliza_delivery")
    cupom.classList.remove("hide")
    await handlePrint()
    imprime_cupom.classList.add("hide")
    finaliza_cupom.classList.remove("hide")
  }

  const mostraCupom4 = async () => {
    var cupom = document.getElementById("cupom_nao_fiscal")
    var imprime_cupom = document.getElementById("imprime_cupom4")
    var finaliza_cupom = document.getElementById("cupom_finaliza_carteira_delivery")
    cupom.classList.remove("hide")
    await handlePrint()
    imprime_cupom.classList.add("hide")
    finaliza_cupom.classList.remove("hide")
  }

  const naoMostraCupom = async () => {
    var imprime_cupom = document.getElementById("imprime_cupom")
    var finaliza_cupom = document.getElementById("cupom_finaliza_mesa")
    imprime_cupom.classList.add("hide")
    finaliza_cupom.classList.remove("hide")
  }

  const naoMostraCupom2 = async () => {
    var imprime_cupom = document.getElementById("imprime_cupom2")
    var finaliza_cupom = document.getElementById("cupom_finaliza_carteira")
    imprime_cupom.classList.add("hide")
    finaliza_cupom.classList.remove("hide")
  }

  const naoMostraCupom3 = async () => {
    var imprime_cupom = document.getElementById("imprime_cupom3")
    var imprime_cupom2 = document.getElementById("imprime_cupom2")
    var finaliza_cupom = document.getElementById("cupom_finaliza_delivery")
    imprime_cupom.classList.add("hide")
    imprime_cupom2.classList.add("hide")
    finaliza_cupom.classList.remove("hide")
  }

  const naoMostraCupom4 = async () => {
    var imprime_cupom = document.getElementById("imprime_cupom4")
    var finaliza_cupom = document.getElementById("cupom_finaliza_carteira_delivery")
    imprime_cupom.classList.add("hide")
    finaliza_cupom.classList.remove("hide")
  }

	return (
    <div className="bg_container_imprime_cupom hide" id="container_imprime_cupom">

      <div className="container_imprime_cupom hide" id="imprime_cupom">
        <div className="header_imprime_cupom">
          <h2>Deseja Imprimir</h2>
        </div>
        <div className="body_imprime_cupom">
          <h3>o cupom não fiscal?</h3>
        </div>
        <div className="footer_imprime_cupom ">
          <button className="btn_geral" id="btn_nao_imprimir_cupom" onClick={naoMostraCupom}>Não</button>
          <span></span>
          <button className="btn_geral" onClick={mostraCupom}>Sim, Imprimir!</button>
        </div>
      </div>

      <div className="container_imprime_cupom hide" id="imprime_cupom2">
        <div className="header_imprime_cupom">
          <h2>Deseja Imprimir</h2>
        </div>
        <div className="body_imprime_cupom">
          <h3>o cupom não fiscal?</h3>
        </div>
        <div className="footer_imprime_cupom">
          <button className="btn_geral" id="btn_nao_imprimir_cupom" onClick={naoMostraCupom2}>Não</button>
          <span></span>
          <button className="btn_geral" onClick={mostraCupom2}>Sim, Imprimir!</button>
        </div>
      </div>

      <div className="container_imprime_cupom hide" id="imprime_cupom3">
        <div className="header_imprime_cupom">
          <h2>Deseja Imprimir</h2>
        </div>
        <div className="body_imprime_cupom">
          <h3>o cupom não fiscal?</h3>
        </div>
        <div className="footer_imprime_cupom">
          <button className="btn_geral" id="btn_nao_imprimir_cupom" onClick={naoMostraCupom3}>Não</button>
          <span></span>
          <button className="btn_geral" onClick={mostraCupom3}>Sim, Imprimir!</button>
        </div>
      </div>

      <div className="container_imprime_cupom hide" id="imprime_cupom4">
        <div className="header_imprime_cupom">
          <h2>Deseja Imprimir</h2>
        </div>
        <div className="body_imprime_cupom">
          <h3>o cupom não fiscal?</h3>
        </div>
        <div className="footer_imprime_cupom">
          <button className="btn_geral" id="btn_nao_imprimir_cupom" onClick={naoMostraCupom4}>Não</button>
          <span></span>
          <button className="btn_geral" onClick={mostraCupom4}>Sim, Imprimir!</button>
        </div>
      </div>

      <div className="container_imprime_cupom hide" id="cupom_finaliza_mesa">
        <div className="header_imprime_cupom">
          <h2>Finalizar?</h2>
        </div>
        <div className="footer_imprime_cupom">
          <button className="btn_geral btn_finaliza_cupom" onClick={() => {
            props.finalizaMesa()
            
            setTimeout(() => {
              document.getElementById("mesa_1").click(); 
            }, 300); 
          }}>Finalizar</button>
        </div>
      </div>

      <div className="container_imprime_cupom hide" id="cupom_finaliza_delivery">
        <div className="header_imprime_cupom">
          <h2>Finalizar?</h2>
        </div>
        <div className="footer_imprime_cupom">
          <button className="btn_geral btn_finaliza_cupom" onClick={() => {
            props.finalizaDelivery()
          }}>Finalizar</button>
        </div>
      </div>

      <div className="container_imprime_cupom hide" id="cupom_finaliza_carteira_delivery">
        <div className="header_imprime_cupom">
          <h2>Finalizar?</h2>
        </div>
        <div className="footer_imprime_cupom">
          <button className="btn_geral btn_finaliza_cupom" id="btn_adiciona_valor_carteira" onClick={() => {
            const debito = props.state.falta;
            const total = props.state.total_consumo;
            const credito = 0;
            const idcliente = props.state.dados_cliente.idcliente;
            const idcarteira = props.state.dados_cliente_carteira.idcarteira;
            const iddelivery = props.state.dados_cliente.id
            const nome = props.state.dados_cliente_carteira.nome;
            const troco = props.state.troco;
            const values = { idcliente, idcarteira, debito,credito, idmesa: 0, troco, nome, iddelivery, total }
            props.AddCarteira(values) 

            var imprime_cupom = document.getElementById("imprime_cupom4")
            var finaliza_cupom = document.getElementById("cupom_finaliza_carteira_delivery")
		        var bg_container_cupom = document.getElementById("container_imprime_cupom")
            var carteira = document.getElementById("painel_carteira")
            carteira.classList.add("hide");
            imprime_cupom.classList.add("hide")
            finaliza_cupom.classList.add("hide")
            bg_container_cupom.classList.add("hide")

          }}>Adicionar a Carteira!</button>
        </div>
      </div>

      <div className="container_imprime_cupom hide" id="cupom_finaliza_carteira">
        <div className="header_imprime_cupom">
          <h2>Finalizar?</h2>
        </div>
        <div className="footer_imprime_cupom">
          <button className="btn_geral btn_finaliza_cupom" id="btn_adiciona_valor_carteira" onClick={() => {
            const debito = props.state.falta;
            const idcliente = props.state.dados_cliente_carteira.idcliente;
            const nome = props.state.dados_cliente_carteira.nome;
            const credito = 0;
            const idmesa = document.getElementById("id_mesa").value;
            var values = { idcliente, debito,credito, idmesa, nome }
            props.AddCarteira(values)
            var bg_container_cupom = document.getElementById("container_imprime_cupom").classList.add("hide")
            var div_imprime_cupom = document.getElementById("imprime_cupom2").classList.add("hide")
            var div_finaliza_cupom = document.getElementById("cupom_finaliza_carteira").classList.add("hide")

          }}>Adicionar a Carteira!</button>
        </div>
      </div>

      <div className="container_cupom">
        <ComponentToPrint ref={componentRef} props={props} />
      </div>

    </div>
	);
}