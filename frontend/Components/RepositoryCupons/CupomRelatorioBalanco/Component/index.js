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

    var totalitens = 0;
    var totalvendas = 0;
    var totalcusto = 0;
    var totallucro = 0;
    
    return (
      <div className="cupom_geral saida" id="cupom_nao_fiscal"> 

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

        <h3 className="titulo_cupom">R E L A T O R I O - B A L A N Ç O</h3>

        <span className="line"></span>

        <div className="data_cupom">
          <h3>Data/Hora:</h3>
          <h3>{data}</h3>
        </div>
        
        <span className="line"></span>

          <h3 className="titulo_cupom">Consumo</h3>

        <span className="line"></span>

        <div className="list_consumo_cupom saida" >

          <ul>
            <li className="balanco_produto">Produto</li>
            <li className="balanco_qtd">QTD</li>
            <li className="balanco_venda">Venda</li>
            <li className="balanco_custo">Custo</li>
            <li className="balanco_lucro">Lucro</li>
          </ul>

          <ul class="listagem_consumo_cupom saida">
            {this.props.props.state.relatorios_balanco.map(resp => {
              var contador = parseFloat(resp.valor_de_venda) * parseFloat(resp.quantidade);
              var contador2 = parseFloat(resp.valor_de_venda) * parseFloat(resp.quantidade) + parseFloat(totalvendas);
              totalvendas = contador2;
              var contador3 = parseFloat(resp.quantidade) + parseFloat(totalitens);
              totalitens = contador3;
              var contador4 = parseFloat(resp.valor_de_custo) * parseFloat(resp.quantidade) + parseFloat(totalcusto);
              totalcusto = contador4;
              var totalvendasuni = parseFloat(resp.valor_de_venda) * parseFloat(resp.quantidade)
              var totalcustouni = parseFloat(resp.valor_de_custo) * parseFloat(resp.quantidade)
              var soma = parseFloat(totalvendasuni) - parseFloat(totalcustouni);
              
              var newtotalvendasuni = this.props.props.formatMoney().format(totalvendasuni)
              var newtotalcustouni = this.props.props.formatMoney().format(totalcustouni)
              var newsoma = this.props.props.formatMoney().format(soma)
              
              return (
                <li key={resp.idproduto}>
                  <span className="balanco_produto">{resp.nome}</span>
                  <span className="balanco_qtd">{resp.quantidade}</span>
                  <span className="balanco_venda">{newtotalvendasuni}</span>
                  <span className="balanco_custo">{newtotalcustouni}</span>
                  <span className="balanco_lucro">{newsoma}</span>
                </li>
              )
            })}
          </ul>

          <span className="line"></span>

          <div className="total_consumo_cupom footer_cupom_entrada">
            <h3>Total itens: <span>{totalitens}</span></h3>
            <h3>Venda: <span>{this.props.props.formatMoney().format(totalvendas)}</span></h3>
            <h3>Custo: <span>{this.props.props.formatMoney().format(totalcusto)}</span></h3>
            <h3>Total: <span>{this.props.props.formatMoney().format(parseFloat(totalvendas) - parseFloat(totalcusto))}</span></h3>
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
          <h3>o Relatorio de Balanço?</h3>
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