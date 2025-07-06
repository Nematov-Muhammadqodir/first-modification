import React, { useEffect, useState } from "react";
import "../css/app.css";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homepage";
import Footer from "./screens/footer";
import Navbar from "./screens/navbar";
import Menu from "./screens/menu";
import { CircularProgress } from "@mui/material";
import Cart from "./screens/cart";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/homePage.css";
import "../css/menu.css";
import "../css/cart.css";
import "../css/order.css";
import "../css/top.css";
import Order from "./screens/order";
import OrderInfo from "./screens/order/OrderInfo";
import Top from "./screens/top";
import { CartItem } from "../lib/types/search";
import useBasket from "./hooks/useBasket";
import { useGlobals } from "./hooks/useGlobals";
import MemberService from "./services/MemberService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import { MouseEvent } from "react";
import AuthenticationModal from "./components/auth";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { setAuthMember } = useGlobals();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);
  const handleLogoutClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseLogout = () => setAnchorEl(null);

  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("success", 700);

      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };

  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

  //Vaqtinchalik state
  const [count, setCount] = useState(0);

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
      <Navbar
        setSignupOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      />
      <Switch>
        <Route path="/top">
          <Top onAdd={onAdd} />
        </Route>
        <Route path="/menu">
          <Menu
            cartItems={cartItems}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}
          />
        </Route>
        <Route path="/cart/new">
          <OrderInfo />
        </Route>
        <Route path="/cart">
          <Cart
            cartItems={cartItems}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}
          />
        </Route>
        <Route path="/">
          <HomePage
            cartItems={cartItems}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}
          />
        </Route>
      </Switch>
      <Footer
        cartItems={cartItems}
        onRemove={onRemove}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}
      />
      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}

export default App;
