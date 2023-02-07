import axios from "axios";
const API_URL = "http://localhost:8080/api/image";

class ImageService {
    get() {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }

        return axios.get(API_URL, {
          headers: {
            Authorization: token,
          },
        });
    }
    post(currentUser, image){
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        const formData = new FormData();
        formData.append('holder', currentUser);
        formData.append('image', image);

        return axios.post(API_URL,
            formData,
            {
                headers: {
                    Authorization: token,
                },
            });
    }

    put(image_id, secret) {
      let token;
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }
      return axios.put (API_URL+ `/${image_id}/update`,
          {secret},
          {
              headers: {
                  Authorization: token,
              },
          });
    }

    delete(image_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.delete (API_URL+ `/${image_id}/delete`,
            {
                headers: {
                    Authorization: token,
                },
            });
    }

}

export default new ImageService();
