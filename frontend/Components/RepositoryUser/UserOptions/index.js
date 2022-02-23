const UserOptions = ({props}) => {
  
  var inputDisabled = true;
  var inputType = "text";

   return (
     <div className="container_user_options">

      <div className="body_user_options">
        <h2 className="h2_title" >Dados do Usuario:</h2>
        <form>
          <label htmlFor="username_user">Nome:</label>
          <input id="username_user" type="text" className="input_pdv" value={props.state.dados_usuario.username} disabled={inputDisabled} />
          <label htmlFor="email_user">E-Mail:</label>
          <input id="email_user" type="text" className="input_pdv" value={props.state.dados_usuario.email} disabled={inputDisabled} />
          <label htmlFor="password_user">Senha:</label>
          <input id="password_user" type={inputType} className="input_pdv" value={props.state.dados_usuario.password} disabled={inputDisabled} />
        </form>
      </div>

     </div>
   )
 }

 export default UserOptions;