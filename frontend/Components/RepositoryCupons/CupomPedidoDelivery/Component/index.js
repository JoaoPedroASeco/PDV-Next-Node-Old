import React, { Component,useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import InputMask from 'react-input-mask';

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
    var total_consumo_delivery = 0;
    return (
      <div className="cupom_geral hide" id="cupom_nao_fiscal"> 
        <div className="local_cupom">
          {this.props.props.state.dados_usuario.map(resp => {
            return (
              <h3>{resp.nome_empresa}</h3>
            )
          })}
        </div>

        <span className="line"></span>

        {this.props.props.state.dados_usuario.map(resp => {
          return (
            <div className="subtitulo_cupom">
              <h3>{resp.endereco_empresa}</h3>
              <h3>CNPJ: {resp.cnpj_empresa}</h3>
              <h3>Telefone: {resp.telefone_empresa}</h3>
            </div>
          )
        })}

        <span className="line"></span>

        <h3 className="titulo_cupom">C U P O M - D E L I V E R Y</h3>

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
          
          <ul class="listagem_consumo_cupom pedido_delivery">
            {this.props.props.state.consumo_delivery?.map(resp => {
              const iddelivery2 = resp.iddelivery
              var preco = resp.preco;
              var contador = parseFloat(preco) + parseFloat(total_consumo_delivery);
              total_consumo_delivery = contador;
              var newPreco = this.props.props.formatMoney().format(resp.preco)

              return (
                <li>
                  <span className="cupom_nome_pedido_delivery">{resp.nome}</span>
                  <span className="cupom_quantidade_pedido_delivery">{resp.quantidade}</span>
                  <span className="cupom_preco_pedido_delivery">{newPreco}</span>
                </li>
              )
            })}
          </ul>

          <div className="total_consumo_cupom">
            <h3>Total:</h3>
            <h3>{this.props.props.state.dados_delivery_em_preparo_2.iddelivery?.newTotal}</h3>
          </div>

        </div>

        <div className="relatorio_pagamentos">
        
          <div>
            <h3>Troco: </h3>
            <span>{this.props.props.state.dados_delivery_em_preparo_2.iddelivery?.newTroco}</span>
          </div>

          <div>
            <h3>Cliente: </h3>
            <span>{this.props.props.state.dados_delivery_em_preparo_2.iddelivery?.nomePessoaDelivery}</span>
          </div>

          <div>
            <h3>Telefone do Cliente: </h3>
            <span><InputMask className="delivery_telefone" mask="(99) 99999-9999" maskChar={null} value={this.props.props.state.dados_delivery_em_preparo_2.iddelivery?.TelefoneDelivery} disabled={true} /></span>
          </div>

          <div>
            <h3>Rua: </h3>
            <span>{this.props.props.state.dados_delivery_em_preparo_2.iddelivery?.rua}</span>
          </div>

          <div>
            <h3>Numero: </h3>
            <span>{this.props.props.state.dados_delivery_em_preparo_2.iddelivery?.numero}</span>
          </div>

          <div>
            <h3>Cidade/Bairro: </h3>
            <span>{this.props.props.state.dados_delivery_em_preparo_2.iddelivery?.bairro_cidade}</span>
          </div>

        </div>

        <span className="line"></span>

        <div className="observacoes_cupom">
          <h3>Observações:</h3>
        </div>

        <span className="line"></span>

        <div className="footer_cupom">
          <h3>Obrigado pela preferencia!</h3>
        </div>

        <span className="line"></span>

      </div>
    )
  }
}

export const CupomDelivery = ({props}) => {

  const componentRef = useRef();

  const handlePrint = useReactToPrint ({
    content: () => componentRef.current,
  });

  const mostraCupom = async () => {
    var cupom = document.getElementById("cupom_nao_fiscal")
    var container_cupom = document.getElementById("cupom_delivery")
    var bg_cupom = document.getElementById("container_imprime_cupom")
    cupom.classList.remove("hide")
    var iddelivery = props.state.dados_delivery_em_preparo_2.iddelivery.iddelivery
    var idcliente = props.state.dados_delivery_em_preparo_2.iddelivery.idcliente
    var status = props.state.dados_delivery_em_preparo_2.iddelivery.status
    await props.listConsumoDelivery(iddelivery,idcliente)
    await props.updateStatusDelivery({iddelivery, idcliente, status})
    container_cupom.classList.add("hide")
    bg_cupom.classList.add("hide")
    await handlePrint()
  }

  const naoMostraCupom = async () => {
    var container_cupom = document.getElementById("cupom_delivery")
    var bg_cupom = document.getElementById("container_imprime_cupom")
    var iddelivery = props.state.dados_delivery_em_preparo_2.iddelivery.iddelivery
    var idcliente = props.state.dados_delivery_em_preparo_2.iddelivery.idcliente
    var status = props.state.dados_delivery_em_preparo_2.iddelivery.status
    await props.updateStatusDelivery({iddelivery, idcliente, status})
    container_cupom.classList.add("hide")
    bg_cupom.classList.add("hide")
  }

	return (
    <div className="bg_container_imprime_cupom delivery hide" id="container_imprime_cupom">

      <div className="container_imprime_cupom hide" id="cupom_delivery">
        <div className="header_imprime_cupom">
          <h2>Imprimir?</h2>
        </div>
        <div className="footer_imprime_cupom">
          <button className="btn_geral btn_finaliza_cupom" id="btn_fecha_carteira" onClick={naoMostraCupom} >Não!</button>
          <span />
          <button className="btn_geral btn_finaliza_cupom" id="btn_adiciona_valor_carteira" onClick={mostraCupom}>Imprimir!</button>
        </div>
      </div>

      <div className="container_cupom">
        <ComponentToPrint ref={componentRef} props={props} />
      </div>

    </div>
	);
}