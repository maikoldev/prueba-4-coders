import { useState } from "react";
import { AppRouter } from "./router/AppRouter";
import { AuthContext } from "./auth/AuthContext";
import "./scss/App.scss";

const initUser = () => {
  return JSON.parse(localStorage.getItem("userData")) || { isLogged: false };
};

const App = () => {
  const [user, setUser] = useState(initUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
