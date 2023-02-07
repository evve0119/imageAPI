import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShareService from "../services/share.service";

const ShareComponent = () => {
  const imageId = useParams().imageId;
  let [imageUrl, setImageUrl] = useState("");
  let [message, setMessage] = useState("");

  useEffect(() => {
    ShareService.shareImage(imageId)
    .then((dataset) => {
        setImageUrl(dataset.data.imageUrl);
        if (!dataset.data.secret){
            setMessage("Permission denied, you need access from the user to get image!!!");
        } else {
            setMessage("");
        }
    }).catch((err) => {
        setMessage(err.response.data);
    });
  }, []);

  return (
    <div>
        {message && <div><h1>{message}</h1></div>}
        {!message && <img src = {`http://localhost:8080/${imageUrl}`} width="50%"/>}
    </div>
  );
};

export default ShareComponent;
