import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar, Footer } from "./Components/index";

import {
  HomePage,
  ErrorPage,
  ProductsPage,
  SingleProduct,
  CheckoutPage,
  AboutPage,
  CartPage,
  PrivateRoute,
} from "./pages";
import AuthWrapper from "./pages/AuthWrapper";

function App() {
  return (
    <div className="App">
      <AuthWrapper>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            exact
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          {/* <PrivateRoute exact path="/checkout">
        <CheckoutPage/>
        </PrivateRoute> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </AuthWrapper>
    </div>
  );
}

export default App;
