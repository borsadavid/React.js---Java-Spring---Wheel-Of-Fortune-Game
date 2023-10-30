import axios from "axios";

export default function LogIn(username, password, setJWT) {
  axios.post("http://localhost:8080/auth/login", { username, password })
    .then(response => {
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      setJWT(jwt);
    })
    .catch(error => {
      console.error('Error signing in', error);
    });
}