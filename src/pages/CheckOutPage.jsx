import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../Components";
import { useCartContext } from "../Context/Cart_Context";
import { NavLink } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart } = useCartContext();
  <PageHero title="Checkout" />;
  return (
    <Wrapper className="page">
      {
        cart.length < 1 ? <div className="empty"><h2>Cart is Empty</h2> <NavLink to="/products" className="btn">Add to</NavLink></div> : <StripeCheckout/>
      }
    </Wrapper>
  );
};
const Wrapper = styled.div`\
display:flex;
align-items:center;
justify-content:center;
.empty{
  text-align:center
}
`;
export default CheckoutPage;
