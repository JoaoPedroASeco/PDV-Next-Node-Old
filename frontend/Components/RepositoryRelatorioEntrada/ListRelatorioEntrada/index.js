const ListRelatorioEntrada = ({ props }) => {

  const ListRelatorio = (e) => {
    e.preventDefault();
    var inicio = document.getElementById("data_inicio_entrada").value
    var fim = document.getElementById("data_fim_entrada").value
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
      var inicio = document.getElementById("data_inicio_entrada").value = data
      var fim = document.getElementById("data_fim_entrada").value = data
      var newdatainicio = `${data}` + " " + `00:00:00`;
      var newdatafim = `${data}` + " " + `23:59:59`;
    } else {
      var inicio = document.getElementById("data_inicio_entrada").value
      var fim = document.getElementById("data_fim_entrada").value
      var newdatainicio = `${inicio}` + " " + `00:00:00`;
      var newdatafim = `${fim}` + " " + `23:59:59`;
    }
    var values = { inicio: newdatainicio, fim: newdatafim }
    props.ListRelatorioEntrada(values)
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

  var soma = 0;
  var dinheiro = 0;
  var cartao = 0
  var rua = 0;
  var carteira = 0;
  var pix = 0;

  return (
    <div className="container_relatorio">

      <div className="header_relatorio">
        <h2 className="h2_title">Relatorio de Entrada</h2>
        <form >
          <label htmlFor="">Inicio:</label>
          <input type="date" className="input_form_meio" id="data_inicio_entrada" />
          <label htmlFor="">Fim:</label>
          <input type="date" className="input_form_meio" id="data_fim_entrada" />
        </form>
          <button className="btn_geral" onClick={ListRelatorio}>Pesquisa</button>
          <button className="btn_geral" onClick={() => {imprimeCupom()}} >Imprimir</button>
      </div>

      <ul className="header_list head_table">
        <li className="entrada_registro">registro</li>
        <li className="entrada_valor">valor</li>
        <li className="entrada_pgto">pgto</li>
        <li className="entrada_soma">soma</li>
      </ul>

      <ul className="list_relatorio list_geral">
        {props.state.relatorios_entrada.map(resp => {
          if(resp.formapagamento != "TOTAL MESA" && resp.formapagamento != "TOTAL DELIVERY"){
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
              <li key={resp.created_at} >
                <span className="entrada_registro">{resp.created_at} {resp.horario}</span>
                <span className="entrada_valor">{props.formatMoney().format(resp.credito)}</span>
                <span className="entrada_pgto">{resp.formapagamento}</span>
                <span className="entrada_soma">{props.formatMoney().format(soma)}</span>
              </li>
            )
          }
        })}
      </ul>

      <ul className="footer_list ">
        <li>Dinheiro:<span> {props.formatMoney().format(dinheiro)}</span></li>
        <li>Cartão:<span></span> {props.formatMoney().format(cartao)}</li>
        <li>Vendas Rua:<span></span> {props.formatMoney().format(rua)}</li>
        <li>Carteira:<span></span> {props.formatMoney().format(carteira)}</li>
        <li>PIX:<span></span> {props.formatMoney().format(pix)}</li>
      </ul>

    </div>
  );
}

export default ListRelatorioEntrada;