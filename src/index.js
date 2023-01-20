import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./Context/Product_Context";
import { FilterProvider } from "./Context/Filter_Context";
import { CartProvider } from "./Context/Cart_Context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./Context/User_Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-hkzvxsug44z5hoo3.us.auth0.com"
    clientId="o28l4WmxDxVK7jqDPam5HADgZMCe9Rvb"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <BrowserRouter>
      <React.StrictMode>
        <UserProvider>
          <ProductProvider>
            <FilterProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FilterProvider>
          </ProductProvider>
        </UserProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Auth0Provider>
);

// Domain : -- dev-hkzvxsug44z5hoo3.us.auth0.com
// Client Id : -- o28l4WmxDxVK7jqDPam5HADgZMCe9Rvb

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
