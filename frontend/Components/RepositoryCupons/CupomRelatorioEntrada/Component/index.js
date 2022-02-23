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


    var soma = 0;
    var dinheiro = 0;
    var cartao = 0
    var rua = 0;
    var carteira = 0;
    var pix = 0;
    
    return (

      <div className="cupom_geral entrada hide" id="cupom_nao_fiscal"> 
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

        <h3 className="titulo_cupom">R E L A T O R I O - E N T R A D A</h3>

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
            <li className="entrada_registro">registro</li>
            <li className="entrada_valor">valor</li>
            <li className="entrada_pgto">pgto</li>
            <li className="entrada_soma">soma</li>
          </ul>

          <ul class="listagem_consumo_cupom entrada">
            {this.props.props.state.relatorios_entrada.map(resp => {
              if(resp.formapagamento != "TOTAL MESA"){
                var contador = parseFloat(soma) + parseFloat(resp.credito)
                soma = contador;
                if(resp.formapagamento == "DINHEIRO"){
                  var contador2 = parseFloat(dinheiro) + parseFloat(resp.credito)
                  dinheiro = contador2;
                }
                if(resp.formapagamento == "CARTAO-D" || resp.formapagamento == "CARTAO-C" ){
                  var contador3 = parseFloat(cartao) + parseFloat(resp.credito)
                  cartao = contador3;
                }
                if(resp.formapagamento == "RUA"){
                  var contador4 = parseFloat(rua) + parseFloat(resp.credito)
                  rua = contador4;
                }
                if(resp.formapagamento == "CARTEIRA"){
                  var contador5 = parseFloat(carteira) + parseFloat(resp.credito)
                  carteira = contador5;
                }
                if(resp.formapagamento == "PIX"){
                  var contador5 = parseFloat(carteira) + parseFloat(resp.credito)
                  pix = contador5;
                }
                return (
                  <li key={resp.created_at}>
                    <span className="entrada_registro">{resp.created_at} {resp.horario}</span>
                    <span className="entrada_valor">{this.props.props.formatMoney().format(resp.credito)}</span>
                    <span className="entrada_pgto">{resp.formapagamento}</span>
                    <span className="entrada_soma">{this.props.props.formatMoney().format(soma)}</span>
                  </li>
                )
              }
            })}
          </ul>

          <span className="line"></span>

          <div className="total_consumo_cupom footer_cupom_entrada">
            <h3>Dinheiro: {this.props.props.formatMoney().format(dinheiro)}</h3>
            <h3>Cartao: {this.props.props.formatMoney().format(cartao)}</h3>
            <h3>Rua: {this.props.props.formatMoney().format(rua)}</h3>
            <h3>Carteira: {this.props.props.formatMoney().format(carteira)}</h3>
            <h3>PIX: {this.props.props.formatMoney().format(pix)}</h3>

          </div>

          <span className="line"></span>
        </div>
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
    var bg_modal = document.getElementById("container_imprime_cupom")
    var modal = document.getElementById("imprime_cupom")
    var modal2 = document.getElementById("imprime_cupom")
    cupom.classList.remove("hide")
    bg_modal.classList.add("hide")
    modal.classList.add("hide")
    modal2.classList.remove("hide")

    await handlePrint()
  }

  const naoMostraCupom = async () => {
    var cupom = document.getElementById("cupom_nao_fiscal")
    var bg_modal = document.getElementById("container_imprime_cupom")
    var modal = document.getElementById("imprime_cupom")
    var modal2 = document.getElementById("imprime_cupom")
    cupom.classList.add("hide")
    bg_modal.classList.add("hide")
    modal.classList.add("hide")
    modal2.classList.add("hide")
  }

	return (
    <div className="bg_container_imprime_cupom entrada hide" id="container_imprime_cupom">

      <div className="container_imprime_cupom hide" id="imprime_cupom">
        <div className="header_imprime_cupom">
          <h2>Deseja Imprimir</h2>
        </div>
        <div className="body_imprime_cupom">
          <h3>o Relatorio de Entrada?</h3>
        </div>
        <div className="footer_imprime_cupom ">
          <button className="btn_geral" id="btn_nao_imprimir_cupom" onClick={naoMostraCupom}>Não</button>
          <span></span>
          <button className="btn_geral" onClick={mostraCupom}>Sim, Imprimir!</button>
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

      <div className="container_cupom">
        <ComponentToPrint ref={componentRef} props={props} />
      </div>

    </div>
	);
}