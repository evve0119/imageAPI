import { useState, useEffect, useRef } from "react";
import AuthService from "../services/auth.service";
import ImageService from "../services/image.service";
import { useNavigate, useLocation } from "react-router-dom";
import "./profile-css.css"

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  let [image, setImage] = useState("");
  let [message, setMessage] = useState("");
  let [data, setData] = useState([]);
  let [copied, setCopied] = useState('');


  useEffect(() => {
    ImageService.get()
    .then((dataset) => {
      setData(dataset.data);
    }).catch((err) => {
      setMessage(err.response.data);
    });
  }, [data]);

  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout success! Redirect to home page.");
    setCurrentUser(null);
    navigate("/");
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleClick= (e) => {
    ImageService.post(currentUser.user._id, image)
      .then(() => {
        setMessage("Upload success");
        setImage("");
        inputRef.current.value = null;
        setTimeout(()=>{
          setMessage("");
        }, 1000);
      }).catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = (e) => {
    ImageService.delete(e.target.value)
    .then(() => {
      setMessage("Image successfully delete");
      setTimeout(()=>{
        setMessage("");
      }, 1000);
    }).catch((err) => {
      console.log(err);
    });
  };

  const copyUrl = (imageId) => {
    let url = window.location.href.replace("profile", `share/${imageId}`);
    navigator.clipboard.writeText(url);
    setCopied("Share link is copied");
    setTimeout(() => {
      setCopied("");
    }, 1000)
  }

  const handleUpdate = (e) => {
    ImageService.put(e.target.value, e.target.checked)
    .then(() => {
      console.log("Image " + e.target.value + " is set to " + !e.target.checked )
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>Please login to access personal information</div>}
      {currentUser && (
        <div>
          <strong><h2>ImageAPI</h2></strong>
          <h4>Personal Information</h4>
          {message && <div className="alert alert-info">{message}</div>}
          {copied && <div className="alert alert-warning">{copied}</div>}
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Name: {currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                <button onClick={handleLogout} className="btn btn-warning btn-block">
                  <span>Logout</span>
                </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="row g-3">
            <div class="col-auto">
              <input ref={inputRef} class="form-control" type = "file" name='file' onChange={handleImage}/>
            </div>
            <div class="col-auto">
              <button  className="btn btn-primary btn-block" onClick={handleClick}> Submit </button>
            </div>
          </div>
          <div class = "card_arrange">
            {
              data.map((singleData) => {
                if (singleData.holder === currentUser.user._id){
                  return (
                    <div class="card">
                      <div class="card-img">
                          <img src = {`http://localhost:8080/${singleData.imageUrl}`} />
                      </div>
                      <div class="card-body">
                        <button type="button" class="btn btn-success btn-sm" onClick={() => {copyUrl(singleData._id)}}>
                            <i class="bi bi-share">&nbsp;&nbsp;Share</i>
                        </button>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="secret"
                                onChange={handleUpdate}
                                value={singleData._id}
                                checked = {singleData.secret ? "true" : ""}
                                />
                          <label class="form-check-label" for="secret">{singleData.secret ? "Public  " : "Private"}</label>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={handleDelete} value={singleData._id}>
                           Delete
                        </button>
                      </div>
                    </div>

                  )
                }
                }).reverse()
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
