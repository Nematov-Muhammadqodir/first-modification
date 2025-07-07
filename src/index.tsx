import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/index.css";
import theme from "./app/theme";
import ContextProvider from "./app/context/ContextProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container!); // the "!" tells TypeScript that container will not be null

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <GoogleOAuthProvider clientId="455090928481-oa2nc82u506svl2qj6bschdeap5a270h.apps.googleusercontent.com">
              <App />
            </GoogleOAuthProvider>
          </Router>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
