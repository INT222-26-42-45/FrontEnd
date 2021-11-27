import axios from 'axios';

class AuthenService {
  login(users) {

    const data = JSON.parse(JSON.stringify({
        "username": users.username,
        "password": users.password
    }));
    // return axios.post("http://52.230.37.169:9000/auth/signin", data)
    // return axios.post("http://52.230.37.169/backend/auth/signin", data)
    return axios.post("http://localhost:9000/auth/signin", data)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('users', JSON.stringify(response.data));
            }
            return response.data;
        });
}

logout() {
    localStorage.removeItem('users');
}

register(users) {
    const data = JSON.parse(JSON.stringify({
      "firstname": users.firstname,
      "lastname": users.lastname,
      "birth": users.birth,
      "gender": users.gender,
      "email": users.email,
      "tel": users.tel,
      "username": users.username,
      "password": users.password
    }));
    // return axios.post("http://52.230.37.169/backend/auth/signup", data)
    // return axios.post("http://52.230.37.169:9000/auth/signup", data)
    return axios.post("http://localhost:9000/auth/signup", data)
    }


}

export default new AuthenService();