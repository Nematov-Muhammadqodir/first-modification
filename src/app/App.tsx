import React, { useEffect, useState } from "react";
import "../css/app.css";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homepage";
import Footer from "./screens/footer";
import Navbar from "./screens/navbar";
import Menu from "./screens/menu";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/homePage.css";
import { CircularProgress } from "@mui/material";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start spinner on location change
    setLoading(true);

    // Simulate a small delay for loading effect (e.g. 500ms)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);
  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255,255,255,0.7)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Navbar />
      <Switch>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
