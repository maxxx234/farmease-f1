import React from "react";
import { useSelector } from "react-redux";
import AuthPage from "./components/AuthPage";
import MainPage from "./components/MainPage";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user ? <MainPage /> : <AuthPage />}
    </>
  );
}

export default App;
