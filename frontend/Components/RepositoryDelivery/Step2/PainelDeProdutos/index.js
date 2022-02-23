 const BarraDeProdutos = ({props}) => {

	const ListProd1 = (grupo) => {
		const busca = document.getElementById("busca_produtos").value = ""
		const busca2 = document.getElementById("busca_produtos2").value = ""
		props.ListProd(grupo,busca)
		var var1 = document.getElementById("list_btn_grupo")
		var var2 = document.getElementById("list_btn_produtos")
		var1.classList.add("hide");
		var2.classList.remove("hide");
		
	}

	const ListProd2 = (e) => {
		e.preventDefault();
		const busca = document.getElementById("busca_produtos").value
		const busca2 = document.getElementById("busca_produtos2").value = ""
		const grupo = "";
		var var1 = document.getElementById("list_btn_grupo")
		var var2 = document.getElementById("list_btn_produtos")
		var1.classList.add("hide");
		var2.classList.remove("hide");
		props.ListProd(grupo,busca)
	}

	const ListProd3 = (e) => {
		e.preventDefault();
		const busca = document.getElementById("busca_produtos2").value
		const busca2 = document.getElementById("busca_produtos").value = ""
		var grupo = props.state.grupo_atual;
		if(grupo == "Todos") {
			var grupo = ""
			props.ListProd( grupo, busca)
		}else {
			props.ListProd( grupo, busca)	
		}
	}

	const hide_list_btn_produtos = (e) => {
		e.preventDefault();
		var var1 = document.getElementById("list_btn_grupo")
		var var2 = document.getElementById("list_btn_produtos")
		var1.classList.remove("hide");
		var2.classList.add("hide");
	}

	const addPedido = (idproduto,valor_de_venda,valor_de_custo, estoque, estoqueminimo, controle_quantidade, controleestoque, vendaporpeso, nome) => {
		const idmesa = 0;
		const idcliente = props.state.dados_cliente.idcliente;
		const iddelivery = props.state.dados_cliente.id;
		const container_venda = document.getElementById("bg_container_add_produto")
	
	  if(controleestoque == "S") {
      var quantidade = 1;
    	var values = { idcliente, idmesa, idproduto, valor_de_venda, valor_de_custo, estoque, estoqueminimo, controle_quantidade, controleestoque, vendaporpeso, nome, iddelivery }
			props.addPedido(values, quantidade)
    }else if(controle_quantidade == "S") {
    	var values = { idcliente, idmesa, idproduto, valor_de_venda, valor_de_custo, estoque, estoqueminimo, controle_quantidade, controleestoque, vendaporpeso, nome, iddelivery }
			container_venda.classList.remove("hide")
			props.setState({values_pedido: values})

			container_venda.addEventListener("click", () => {
				if (event.target.id == "bg_container_add_produto" || event.target.id == "fecha_venda_quantidade" ) {
					container_venda.classList.add("hide")
				}
			});

    }else if(vendaporpeso == "S") {
    	var values = { idcliente, idmesa, idproduto, valor_de_venda, valor_de_custo, estoque, estoqueminimo, controle_quantidade, controleestoque, vendaporpeso, nome, iddelivery }
			container_venda.classList.remove("hide")
			props.setState({values_pedido: values})

			container_venda.addEventListener("click", () => {
				if (event.target.id == "bg_container_add_produto" || event.target.id == "fecha_venda_quantidade" ) {
					container_venda.classList.add("hide")
				}
			});
    }
	}


	return (
		<div className="paineldeprodutos_pdv">

			<form onSubmit={ListProd2}>
				<input type="text" className="input_pdv" id="busca_produtos" placeholder="Codigo/Nome" />
				<button type="submit" className="btn_BuscaGeralProd"></button>
			</form>

			<div className="list_btn_grupo" id="list_btn_grupo">
				{props.state.grupos.map(resp => (
					<button 
						key={resp.id} 
						className="botao_grupo " 
						onClick={function (){ListProd1(resp.grupo)}}
					>
						{resp.grupo}
					</button>
				))}
			</div>

			<div className="list_btn_produtos hide" id="list_btn_produtos">

				<form onSubmit={ListProd3}>
					<div>
						<h2>{props.state.grupo_atual}:</h2>
						<button type="button" id="hide_list_btn_produtos" onClick={hide_list_btn_produtos}><img src="/image/x.svg" /></button>
					</div>
					<input type="text" className="input_form_full" id="busca_produtos2" placeholder="Codigo/Nome" />
					<button type="submit" className="btn_BuscaGeralProd"></button>
				</form>

				<ul>
					{props.state.produtos.map( resp => {
						var preco = (resp.preco)
						var newPreco = props.formatMoney().format(preco)

						if(resp.controleestoque == 'S') {
							if(parseFloat(resp.estoque) <= parseFloat(resp.estoqueminimo) && parseFloat(resp.estoque) > 0){
								return (
									<button className="botao_produto" key={resp.id} onClick={function (){addPedido( resp.id, resp.preco, resp.valor_de_custo, resp.estoque, resp.estoqueminimo, resp.controle_quantidade, resp.controleestoque, resp.vendaporpeso, resp.nome )}}>
										<span>
											<h5>{resp.codigo}</h5>
											<span>{resp.nome}</span>
											<h5>{newPreco}</h5>
										</span>
										<span className="baixo_estoque"></span>
									</button>
								)
							}else if(parseFloat(resp.estoque) <= 0){
								return (
									<button className="botao_produto" key={resp.id} onClick={function (){addPedido( resp.id, resp.preco, resp.valor_de_custo, resp.estoque, resp.estoqueminimo, resp.controle_quantidade, resp.controleestoque, resp.vendaporpeso, resp.nome )}}>
										<span>
											<h5>{resp.codigo}</h5>
											<span>{resp.nome}</span>
											<h5>{newPreco}</h5>
										</span>
										<span className="sem_estoque"></span>
									</button>
								)
							}else if(parseFloat(resp.estoque) > parseFloat(resp.estoqueminimo)){
								return (
									<button className="botao_produto" key={resp.id} onClick={function (){addPedido( resp.id, resp.preco, resp.valor_de_custo, resp.estoque, resp.estoqueminimo, resp.controle_quantidade, resp.controleestoque, resp.vendaporpeso, resp.nome )}}>
										<span>
											<h5>{resp.codigo}</h5>
											<span>{resp.nome}</span>
											<h5>{newPreco}</h5>
										</span>
									</button>
								)
							}
						}else {
							return (
								<button className="botao_produto" key={resp.id} onClick={function (){addPedido( resp.id, resp.preco, resp.valor_de_custo, resp.estoque, resp.estoqueminimo, resp.controle_quantidade, resp.controleestoque, resp.vendaporpeso, resp.nome )}}>
									<span>
										<h5>{resp.codigo}</h5>
										<span>{resp.nome}</span>
										<h5>{newPreco}</h5>
									</span>
								</button>
							)
						}
					})} 
				</ul>

			</div>
		</div>
	);
}

export default BarraDeProdutos;