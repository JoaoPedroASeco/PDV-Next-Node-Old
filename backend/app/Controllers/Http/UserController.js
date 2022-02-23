"use strict";

const User = use("App/Models/User");
const Database = use("Database");

class UserController {

  async create({ request , response }) {
    const { id, username , email , password, roleId, second_id, create, list, update, del } = request.all();
    
    if(!id) {
      const data = { username , email , password, second_id };

      const userId = await User.create(data);

      const user_id = parseFloat(userId.id);

      const inserRoles = await Database
        .insert({ user_id, role_id: roleId })
        .into('userroles');

      const userPermissions = await Database
        .raw(`INSERT INTO userpermissions 
        ( user_id, role_id, create_up, update_up, list_up, delete_up, created_at, updated_at ) VALUES 
        ( ${user_id}, ${roleId}, ${create},${update}, ${list}, ${del}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`)

      return userId;
    }else {
      const user = await Database
        .raw(`UPDATE users SET  
        username = '${username}', email = '${email}'
        WHERE id = ${id}`)

      const userPermissions = await Database
        .raw(`UPDATE userpermissions SET  
        create_up = ${create}, update_up = ${update}, list_up = ${list}, delete_up = ${del}
        WHERE user_id = ${id}`)

      return "success"
    }
  }

  async list({ request , response }) {
    const { busca } = request.all();

    try{
      if(!busca){
        const user = await Database
          .raw(`SELECT *, us.id as us_id FROM users AS us
          INNER JOIN userpermissions as up on us.id = up.user_id
          GROUP BY (us.id, us.username, up.id)
          ORDER BY us.username ASC`)
        
        return user.rows;
      }else{
        const user = await Database
          .raw(`SELECT *, us.id as us_id FROM users AS us
          INNER JOIN userpermissions as up on us.id = up.user_id
          WHERE (lower(us.username) ~* '${busca}' ) OR (lower(us.email) ~* '${busca}' ) 
          GROUP BY (us.id, us.username, up.id)
          ORDER BY us.username ASC`);
        
        return user.rows;
      }
    }catch (err){
      return `Err: ${err}`
    }
  }

  async token({ request, response, auth }) {
    try {
      const { email, password } = request.all();

      const user = await Database.table("users").where("users.email","=",email);

      const token = await auth.attempt(email, password);

      return { token, user };
    } catch (error) {
      response.send("Dados invalido: " + error);
    }
  }

  login({ request, response, auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "Não Autorizado !";
    }

    response.send({ message: "Autorizado", Usuario: auth.user });
  }

  async auth({ request, response }) {
    const { user_id } = request.all();

    try{
      const user_level = await Database.table('users').innerJoin('userroles', function () {
        this.on('users.id', 'userroles.user_id')
            .orOn( 'users.id', 'userroles.user_id' )
      }).innerJoin('roles', function () {
        this.on('userroles.role_id', 'roles.id')
            .orOn('userroles.role_id', 'roles.id')
      }).innerJoin('userpermissions', function () {
        this.on('users.id', 'userpermissions.user_id')
            .orOn('userroles.user_id', 'userpermissions.id')
      }).where( 'users.id', '=' , user_id )

      return user_level
    }catch (err){
      return `Error: ${err}`;
    }
  }
}

module.exports = UserController;
