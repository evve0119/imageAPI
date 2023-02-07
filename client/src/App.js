import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthService from "./services/auth.service";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import ShareComponent from "./components/share-image";



function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route path="/" element={<HomeComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route
            path="login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
           <Route
            path="share/:imageId"
            element={
              <ShareComponent/>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
