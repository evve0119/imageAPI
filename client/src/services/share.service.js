import axios from "axios";
const API_URL = "http://localhost:8080/api/share";

class ShareService {

    shareImage(image_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.get(API_URL + `/${image_id}`,
          {headers: {Authorization: token}}
        );
    }

}

export default new ShareService();
