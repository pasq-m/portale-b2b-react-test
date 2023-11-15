import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {                                //Here we keep the user data to use again below
          localStorage.setItem("user", JSON.stringify(response.data));  //in the getCurrentUser() function, for example.
        }                                                               //LocalStorage is a browser sort of
                                                                        //temp memory where we can keep
        return response.data;                                           //this kind of data.
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
