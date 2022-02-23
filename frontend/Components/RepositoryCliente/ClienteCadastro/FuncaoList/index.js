export default function FuncaoList ({ props }) {
  return (
    <select className="select_form_2 m-b-20" id="funcao">
      {props.state.funcao.map(resp =>(<option key={resp.id}>{resp.funcao}</option>))}
    </select>
  );
}