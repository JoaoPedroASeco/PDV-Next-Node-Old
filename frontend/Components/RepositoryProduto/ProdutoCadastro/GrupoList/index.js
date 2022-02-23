export default function GrupoList ({ props }) {
  return (
    <div className="container_select_form">
      <select className="select_form" id="grupo">
        {props.state.grupo.map(resp =>(<option key={resp.id}>{resp.grupo}</option>))}
      </select>
    </div>
  );
}