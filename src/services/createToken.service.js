import axios from "axios";

const API_URL = "http://localhost:8080/";

class CreateTokenService {

/*createToken() {
    return axios
      .get(API_URL + "v1/csrf")
  
    /*.then(response => {
        
        console.log("Ha triggerato il creation token?")

        return response.data;                                           
    });*/
//}

createToken(path, data) {
    return axios.get(API_URL + "v1/csrf")
        .then(tokenResp => {
            let config = {
                headers: {
                    'X-CSRF-TOKEN': tokenResp.data.token,
                }
            }
            return axios.post(path, data, config);
        })
        .then(res => res.data)
}

}

export default new CreateTokenService();  