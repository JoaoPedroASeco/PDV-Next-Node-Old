import React, { useState } from 'react';

const PainelFinanceiro = ({props}) => {

	const delPgtParc = (id, valor) => {
		props.delPgtParc(id, valor)
	}

	const finalizaDelivery = () => {
		var imprime_cupom = document.getElementById("container_imprime_cupom")
		var div_imprime_cupom = document.getElementById("imprime_cupom3")
		div_imprime_cupom.classList.remove("hide")
		imprime_cupom.classList.remove("hide")

		imprime_cupom.addEventListener("click", () => {
			if (event.target.className == "bg_container_imprime_cupom" ) {
				imprime_cupom.classList.add("hide");
			}
		});
	}

	var newTotal = props.formatMoney().format(props.state.total_consumo)
	var newTotal2 = newTotal.split("R$")
	var newDinheiro = props.formatMoney().format(props.state.total_dinheiro)
	var newCartao = props.formatMoney().format(props.state.total_cartao)
	var newRecebidoParcial = props.formatMoney().format(props.state.total_parcial)
	var newFalta = props.formatMoney().format(props.state.falta)
	var newTroco = props.formatMoney().format(props.state.troco)

	return (
		<div className="container_painel_financeiro_pdv">

			<div className="painel_operacional">

				<div className="container_total_consumo">
					<span className="">R$</span>
					<span className="total_consumo">{newTotal2}</span>
				</div>

				<div className="container_dinheiro_cartao">
					<span className="dinheiro_cartao">Dinheiro<span> {newDinheiro}</span></span>
					<span className="dinheiro_cartao">Cartão<span> {newCartao}</span></span>
				</div>

				<div className="container_list_pgtparc">
					<ul>
						{props.state.pagamentos_parciais.map(resp => {
							var valor = props.formatMoney().format(resp.credito)
							return(
								<li className="pgt_parcial" key={resp.id} >
									{resp.formapagamento} 
									<span>
										{valor}
										<button onClick={function () {delPgtParc(resp.id, resp.credito)}}>
											<img src="/image/trash2.svg" />
										</button>
									</span>
								</li>
							)
						})}
					</ul>
				</div>

				<div className="container_resumo_consumo">
					<span className="resumo_consumo">Recebido:<span>{newRecebidoParcial}</span></span>
					<span className="resumo_consumo">Falta:<span>{newFalta}</span></span>
					<span className="resumo_consumo">Troco:<span>{newTroco}</span></span>
				</div>
			</div>

			<div className="finalizar_painel_operacional">
				<button className="finaliza_caixa off" id="finaliza_caixa" onClick={finalizaDelivery} disabled={props.state.btn_finalizar_state}>Finalizar</button>
        <button className="finaliza_caixa2" onClick={() => {props.cancelaDelivery(props.state.dados_cliente.id)}}>Cancelar</button>
			</div>

		</div>
	);
}

export default PainelFinanceiro;