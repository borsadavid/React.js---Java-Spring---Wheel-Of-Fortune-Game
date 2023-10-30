import axios from "axios";

export default function Register(username, password, setRegister){

  axios.post("http://localhost:8080/auth/register", { username, password })
  .then(response => {
    console.log("Account created.", response)
  })
  .catch(error => {
    console.error('Error creating account', error);
  });

}