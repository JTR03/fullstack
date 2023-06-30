import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery } from "@apollo/client";
import { USER } from "./helpers/queries";
import { Route, Routes, Link } from "react-router-dom";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommendated from "./components/Recommendated";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(USER);
  const client = useApolloClient();

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const style = { textDecoration: "none", margin: "5px" };

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <Notify error={errorMessage} />
        <LoginForm setError={handleError} setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <Notify error={errorMessage} />
      <div>
        <Link style={style} to={"/"}>
          Home
        </Link>
        <Link style={style} to={"/books"}>
          books
        </Link>
        <Link style={style} to={"/add"}>
          add book
        </Link>
        <Link style={style} to={"/recommendation"}>
          recommendation
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/" element={<Authors />} />
        <Route path="/add" element={<NewBook setError={handleError} />} />
        <Route
          path="/recommendation"
          element={<Recommendated favorite={result.data.me.favoriteGenre} />}
        />
      </Routes>
    </div>
  );
};

export default App;
