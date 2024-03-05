import React, { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import CreateANewPassword from "./components/CreateANewPassword";

import "./styles";
import VerifyRegisteredAccount from "./components/VerifyRegisteredAccount";
import useUserIsAuthenticated from "./hooks/useUserIsAuthenticated";

interface AppInterface {
  history: any;
  actions: any;
  globalDispatch: any;
}

export default function App({ history, actions, globalDispatch }: AppInterface) {


  useUserIsAuthenticated({ history });

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        {/* <Route
            path="/dashboard"
            element={<div>Hello</div>}
            /> */}

          <Route
            path="/auth/signin"
            element={<Signin actions={actions} globalDispatch={globalDispatch} />}
          />          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/create-a-new-password" element={<CreateANewPassword />} />
          <Route path="/auth/verify" element={<VerifyRegisteredAccount actions={actions} globalDispatch={globalDispatch} />} />
        
        </Routes>

      </BrowserRouter>
    </div>
  );
}

