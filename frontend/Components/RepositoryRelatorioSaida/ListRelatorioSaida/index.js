const ListRelatorioEntrada = ({ props }) => {

  const ListRelatorio = (e) => {
    e.preventDefault();
    var inicio = document.getElementById("data_inicio_saida").value
    var fim = document.getElementById("data_fim_saida").value
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
      var inicio = document.getElementById("data_inicio_saida").value = data
      var fim = document.getElementById("data_fim_saida").value = data
      var newdatainicio = `${data}` + " " + `00:00:00`;
      var newdatafim = `${data}` + " " + `23:59:59`;
    } else {
      var inicio = document.getElementById("data_inicio_saida").value
      var fim = document.getElementById("data_fim_saida").value
      var newdatainicio = `${inicio}` + " " + `00:00:00`;
      var newdatafim = `${fim}` + " " + `23:59:59`;
    }
    var values = { inicio: newdatainicio, fim: newdatafim }
    props.ListRelatorioSaida(values)
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
  
  return (
    <div className="container_relatorio">

      <div className="header_relatorio">
        <h2 className="h2_title ">Relatorio de Saida</h2>
        <form>
          <label htmlFor="">Inicio:</label>
          <input type="date" className="input_form_meio" id="data_inicio_saida" />
          <label htmlFor="">Fim:</label>
          <input type="date" className="input_form_meio" id="data_fim_saida" />
        </form>
        <button className="btn_geral" onClick={ListRelatorio}>Pesquisa</button>
        <button className="btn_geral" onClick={() => {imprimeCupom()}} >Imprimir</button>
      </div>

        <ul className="header_list head_table">
          <li className="saida_produto">Produto</li>
          <li className="saida_qtd">Quantidade</li>
          <li className="saida_total">Total R$(uni)</li>
        </ul>

        <ul className="list_relatorio list_geral">
          {props.state.relatorios_saida.map(resp => {
            const contador = parseFloat(resp.valor_de_venda) * parseFloat(resp.quantidade);
            const contador2 = parseFloat(resp.valor_de_venda) * parseFloat(resp.quantidade) + parseFloat(totalvendas);
            totalvendas = contador2;
            const contador3 = parseFloat(resp.quantidade) + parseFloat(totalitens);
            totalitens = contador3;
            return (
              <li key={resp.idproduto}>
                <span className="saida_produto">{resp.nome}</span>
                <span className="saida_qtd">{resp.quantidade}</span>
                <span className="saida_total">{props.formatMoney().format(contador)}</span>
              </li>
            )
          })}
        </ul>


        <ul className="footer_list">
          <li>Total itens vendidos: <span>{totalitens}</span></li>
          <li>Total Vendas: <span>{props.formatMoney().format(totalvendas)}</span></li>
        </ul>

    </div>
  );
}

export default ListRelatorioEntrada;