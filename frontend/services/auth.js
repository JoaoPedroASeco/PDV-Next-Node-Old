import axios from 'axios';
const ip = `10.0.0.111`

const url = `http://${ip}:3333/auth`;

const auth = (user_id) => axios.post( url,({user_id: user_id}))

export default auth;
