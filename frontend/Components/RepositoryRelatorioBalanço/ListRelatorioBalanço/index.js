const ListRelatorioBalanço = ({ props }) => {

  const ListRelatorio = (e) => {
    e.preventDefault();
    var inicio = document.getElementById("data_inicio_balanco").value
    var fim = document.getElementById("data_fim_balanco").value
    var date = new Date();
    var dia = date.getDate();
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
    var data = ano + "-" + newmes + "-" + newdia;
    if (!inicio && !fim ) {
      var inicio = document.getElementById("data_inicio_balanco").value = data
      var fim = document.getElementById("data_fim_balanco").value = data
      var newdatainicio = `${data}` + " " + `00:00:00`;
      var newdatafim = `${data}` + " " + `23:59:59`;
    } else {
      var inicio = document.getElementById("data_inicio_balanco").value
      var fim = document.getElementById("data_fim_balanco").value
      var newdatainicio = `${inicio}` + " " + `00:00:00`;
      var newdatafim = `${fim}` + " " + `23:59:59`;
    }
    var values = { inicio: newdatainicio, fim: newdatafim }
    props.ListRelatorioBalanço(values)
  }

  const imprimeCupom = (e) => {
    var bg_modal = document.getElementById("container_imprime_cupom")
    var modal = document.getElementById("imprime_cupom")

    bg_modal.classList.remove("hide")
    modal.classList.remove("hide")

    bg_modal.addEventListener("click", () => {
      if (event.target.id == "container_imprime_cupom" ) {
        bg_modal.classList.add("hide")
        modal.classList.add("hide")
      }
    });
  }

  var totalitens = 0;
  var totalvendas = 0;
  var totalcusto = 0;
  var totallucro = 0;


  return (
    <div className="container_relatorio">

      <div className="header_relatorio">
        <h2 className="h2_title h2_balanco">Relatorio de Balanço</h2>
        <form >
          <label htmlFor="">Inicio:</label>
          <input type="date" className="input_form_meio" id="data_inicio_balanco" />
          <label htmlFor="">Fim:</label>
          <input type="date" className="input_form_meio" id="data_fim_balanco" />
        </form>
        <button className="btn_geral" onClick={ListRelatorio}>Pesquisa</button>
        <button className="btn_geral" onClick={() => {imprimeCupom()}} >Imprimir</button>
      </div>

      <ul className="header_list head_table">
        <li className="balanco_produto">Produto</li>
        <li className="balanco_qtd">Quantidade</li>
        <li className="balanco_venda">Venda</li>
        <li className="balanco_custo">Custo</li>
        <li className="balanco_lucro">Lucro</li>
      </ul>

      <ul className="list_relatorio list_geral">
        {props.state.relatorios_balanco.map(resp => {
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
          
          var newtotalvendasuni = props.formatMoney().format(totalvendasuni)
          var newtotalcustouni = props.formatMoney().format(totalcustouni)
          var newsoma = props.formatMoney().format(soma)
          
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

      <ul className="footer_list">
        <li>Total itens: <span>{totalitens}</span></li>
        <li>Venda: <span>{props.formatMoney().format(totalvendas)}</span></li>
        <li>Custo: <span>{props.formatMoney().format(totalcusto)}</span></li>
        <li>Total: <span>{props.formatMoney().format(parseFloat(totalvendas) - parseFloat(totalcusto))}</span></li>
      </ul>
    </div>
  );
}

export default ListRelatorioBalanço;