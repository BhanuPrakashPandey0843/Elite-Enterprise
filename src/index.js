import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store"; // Import the separate store configuration
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Add this line for Bootstrap Icons
import { AuthProvider } from "./AuthContext "; // Import the AuthProvider from your context file
import { ApiProvider } from "./ApiContext";
// Use createRoot to render your app
const root = document.getElementById("root");
const rootElement = createRoot(root);

rootElement.render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <ApiProvider>
          <App/>
        </ApiProvider>
      </AuthProvider>
    </Router>
  </Provider>
);
