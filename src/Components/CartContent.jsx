import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../Context/Cart_Context";
import CartColums from "./CartColums";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const CartContent = () => {
  const { clearCart, cart } = useCartContext();
  return (
    <Wrapper className="section section-center">
      <CartColums />
      {cart.map((val) => {
        return <CartItem key={val?.id} {...val} />;
      })}
      <hr />
      <div className="link-container">
        <NavLink to="/products" className="link-btn">
          Continue
        </NavLink>
        <button onClick={clearCart} className="link-btn clear-btn">
          Clear All
        </button>
      </div>
      <CartTotal/>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
