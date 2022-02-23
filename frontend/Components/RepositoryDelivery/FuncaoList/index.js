export default function FuncaoList ({ props }) {
  return (
    <select className="select_form_2" id="funcao_delivery">
      {props.state.funcao.map(resp =>(<option key={resp.id}>{resp.funcao}</option>))}
    </select>
  );
}