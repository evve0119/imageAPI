import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = (props) => {
  const navigate = useNavigate();

  const Register = () => {
    navigate('/register')
  }

  const Login = () => {
    navigate('/login')
  }

  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">ImageAPI</h1>
            <p className="col-md-8 fs-4">
              User can upload your image and organize, share in this API.
            </p>
            <button className="btn btn-success btn-lg" Style="margin-right: 20px;" type="button" onClick={Login}>
              Login
            </button>

            <button className="btn btn-primary btn-lg" type="button" onClick={Register}>
              Register
            </button>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2023 Chao-Lin Chen
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
