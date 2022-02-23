import Swal from 'sweetalert2'
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

export default function ProdutoList ({ props }) {
  
  const edit = (nome,grupo,codigo,preco,valor_de_custo,estoque,estoqueminimo,cod_barras,varcontrole_quantidade,varcontroleestoque,varvendaporpeso,id) => {
    Toast.fire({
      icon: 'success',
      title: `Edição de Produto!`
    })
    document.getElementById("nome").value = nome;
    document.getElementById("grupo").value = grupo;
    document.getElementById("codigo").value = codigo;
    document.getElementById("preco").value = preco;
    document.getElementById("valor_de_custo").value = valor_de_custo;
    document.getElementById("estoque").value = estoque;
    document.getElementById("estoqueminimo").value = estoqueminimo;
    document.getElementById("cod_barras").value = cod_barras;

    if(varcontrole_quantidade == "S" ){
      document.getElementById("controle_quantidade").checked = true;
    }else{
      document.getElementById("controle_quantidade").checked = false;
    }

    if(varcontroleestoque == "S" ){
      document.getElementById("controleestoque").checked = true;
    }else{
      document.getElementById("controleestoque").checked = false;
    }

    if(varvendaporpeso == "S" ){
      document.getElementById("vendaporpeso").checked = true;
    }else{
      document.getElementById("vendaporpeso").checked = false;
    }
    document.getElementById("id_produto").value = id;
  }

  const del = (id) => {
    props.deleteProduto(id)
  }

	const ListProd2 = (e) => {
		e.preventDefault();
		const busca = document.getElementById("busca_produtos").value
		const grupo = "";
		props.ListProd(grupo,busca)
	}

  return (
    <div className="container_list_produto_cadastro padding-40-65">

			<form onSubmit={ListProd2}>
				<input type="text" className="input_form_full" id="busca_produtos" placeholder="Codigo/Nome" />
				<button type="submit" className="btn_BuscaGeralProd"></button>
			</form >

      <ul className="header_list_produtos head_table">
        <li className="produto_nome">Nome</li>
        <li className="produto_grupo">Grupo</li>
        <li className="produto_estoque">Estoque</li>
        <li className="produto_preco">Preço</li>
        <li className="produto_acoes">Ações</li>
      </ul>

      <ul className="list_produtos list_geral">
        {props.state.produtos.map(resp =>{
          var newPreco = props.formatMoney().format(resp.preco)

          return (
            <li key={resp.id}>
              <span className="produto_nome">{resp.nome}</span>
              <span className="produto_grupo">{resp.grupo}</span>
              <span className="produto_estoque">{resp.estoque}</span>
              <span className="produto_preco">{newPreco}</span>
              <button onClick={function (){edit(
                resp.nome,
                resp.grupo,
                resp.codigo,
                resp.preco,
                resp.valor_de_custo,
                resp.estoque,
                resp.estoqueminimo,
                resp.cod_barras,
                resp.controle_quantidade,
                resp.controleestoque,
                resp.vendaporpeso,
                resp.id,
                )}}><img src="./image/edit_buton.svg" alt="" /></button>
              <button onClick={function () {del(resp.id)}}><img src="./image/trash2.svg" alt="" /></button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}