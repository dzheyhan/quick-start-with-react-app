import React from "react";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./Providers/AuthProvider";
import { UserProvider } from "./Providers/UserProvider";
import { BrowserRouter } from "react-router-dom";

function App(props) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
