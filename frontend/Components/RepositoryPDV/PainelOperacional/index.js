import React, { Component,useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-masked-input'

const initialValue = {
  valor_recebido: '',
}

const CaixaOperacional = ({props}) => {
  const ref = useRef(null);
  const [values, setValues] = useState({initialValue})

  function onChange(ev) {
    const { naem, value } = ev.target;
  }

  useEffect(() => {
    setTimeout(() => {
      ref.current.click();
    }, 500); 
  }, []);

	const AddMesa = (e) => {
		e.preventDefault();
		const codigoMesa = document.getElementById("codigo_mesa").value
		props.AddMesa(codigoMesa)
	}

	const ListPedido = (idmesa,codigo) => {
		props.ListPedido(idmesa,codigo)
		document.getElementById("id_mesa").value = idmesa;
		document.getElementById("val_codigo_mesa").value = codigo;
	}

	const AddPgtParc = (formadepagamento) => {
		var credito = document.getElementById("consumo_pgtparc").value
		var falta = props.state.falta;
		var troco = props.state.troco;
	
		if(!credito){
			credito = document.getElementById("consumo_pgtparc").value = props.state.falta;
		}else if(parseFloat(credito) == 0) {
			credito = document.getElementById("consumo_pgtparc").value = props.state.falta;
		}
		var valor_recebido = credito;

		if(parseFloat(credito) > parseFloat(falta) ) {
			var newTroco = (parseFloat(credito) - parseFloat(falta)) + parseFloat(troco)
			var credito = falta;
		}

		props.AddPgtParc( formadepagamento, credito, valor_recebido )
	}

	const OpenCarteira = () => {
		var carteira = document.getElementById("painel_carteira")
		carteira.classList.remove("hide");
	}

	const CloseCarteira = () => {
		var carteira = document.getElementById("painel_carteira")
		carteira.classList.add("hide");
	}

	const busca_cliente = (e) => {
		e.preventDefault();
		const busca = document.getElementById("busca_cliente").value
		props.ListClientes(busca)
	}

	const AddCarteira = (idcliente, nome) => {
		var values = {idcliente, nome}
		props.setState({dados_cliente_carteira: values })
		var bg_container_cupom = document.getElementById("container_imprime_cupom")
		var div_imprime_cupom = document.getElementById("imprime_cupom2")
		var div_finaliza_cupom = document.getElementById("cupom_finaliza_carteira")
		bg_container_cupom.classList.remove("hide")
		div_imprime_cupom.classList.remove("hide")

		var btn_add_carteira = document.getElementById("btn_adiciona_valor_carteira")

		bg_container_cupom.addEventListener("click", () => {
			if (event.target.className == "bg_container_imprime_cupom" ) {
				bg_container_cupom.classList.add("hide")
				div_imprime_cupom.classList.add("hide")
				div_finaliza_cupom.classList.add("hide")
			}
		});
	}

	return (
		<div className="container_painel_operacional_pdv">
			<div className="painel_operacional">

				<div className="header_caixaoperacional">
					<input type="hidden" id="id_mesa" />
					<input type="hidden" id="val_codigo_mesa" />

					<form onSubmit={AddMesa}>
						<input type="text" id="codigo_mesa" placeholder="Nova Mesa"/>
						<button type="submit" className="btn_add_mesa"></button>
					</form>

					<ul>
						{props.state.mesas.map(resp => {
							if(parseFloat(resp.id) == 1){
								return (
									<button ref={ref} className="mesa_btn" id={`mesa_${resp.id}`} key={resp.id} onClick={function () {ListPedido(resp.id, resp.codigo)}}>
										{resp.codigo}
									</button>
								)
							}else {
								return (
									<button className="mesa_btn" id={`mesa_${resp.id}`} key={resp.id} onClick={function () {ListPedido(resp.id, resp.codigo)}}>
										{resp.codigo}
									</button>
								)
							}
						})}
					</ul>

				</div>

				<div className="body_caixaoperacional">

					<h5>Consumo: <span>{props.state.mesa_em_uso}</span></h5>
					<ul>
						{props.state.pedidos.map(resp => {
							if(resp.status != "BAIXADO") {
								var idproduto = (resp.idproduto)
								var preco = parseFloat(resp.preco) * parseFloat(resp.quantidade);
								var newPreco = props.formatMoney().format(preco)

								return (
									<li key={resp.pedidoid}> 
										<span className="consumo_codigo">{resp.codigo}</span>
										<span className="consumo_nome">{resp.nome}</span>
										<span className="consumo_preco">{newPreco}</span>
										<button className="consumo_delete" onClick={function () {props.delPedido( resp.id, resp.estoque, idproduto, resp.nome, resp.quantidade)}}><img src="/image/trash2.svg" /></button>
									</li>
								)
							}
						})} 
					</ul>
				</div>

				<div className="footer_caixaoperacional">
					<ul>
						<button  onClick={OpenCarteira}>Carteira</button>
						{props.state.btn_tipo_de_pagamento.map(resp => (<button className="btn_pagamentos" key={resp.id} onClick={function () {AddPgtParc(resp.codigo)}}>{resp.descricao}</button>))}
						<CurrencyInput name="valor_recebido" id="consumo_pgtparc"  placeholder="Valor Recebido" name="myInput" onChange={onChange} />
					</ul>
				</div>
			</div>

			<div className="painel_carteira hide" id="painel_carteira">

				<div className="header_carteira">
					<div>
						<h2>Carteira:</h2>
						<button type="button" onClick={CloseCarteira}><img src="/image/x.svg" /></button>
					</div>
					<form onSubmit={busca_cliente}>
						<input type="text" id="busca_cliente" placeholder="Nome / CPF / Telefone"/>
						<button type="submit" className="busca_cliente_btn"><img src="/image/search.svg" /></button>
					</form>
					<ul>
						<li className="carteira_nome">Nome</li>
						<li className="carteira_funcao">Função</li>
						<li className="carteira_cpf">CPF</li>
						<li className="carteira_telefone">Telefone</li>
						<li className="carteira_saldo">Saldo</li>
					</ul>
				</div>

				<div className="listagem_clientes_carteira">
					<ul>
						{props.state.clientes.map(resp => {
							var saldo = (resp.saldofinal)
							var newSaldo = props.formatMoney().format(saldo)
							var newSaldo2 = newSaldo.split("R$")

							if(saldo == null ) {
								var saldo = 0;
							}

							return (
								<button 
									key={resp.idpessoa} 
									className="cliente_carteira" 
									onClick={function () {AddCarteira(resp.idpessoa, resp.nome)}}>
										<span className="carteira_nome">{resp.nome}</span>
										<span className="carteira_funcao">{resp.funcao}</span>
										<span className="carteira_cpf">{resp.cpf}</span>
										<span className="carteira_telefone">{resp.telefone}</span>
										<span className="carteira_saldo">R$ {newSaldo2}</span>
								</button>)
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default CaixaOperacional