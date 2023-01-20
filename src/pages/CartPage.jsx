import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { PageHero } from '../Components';
import CartContent from '../Components/CartContent';
import { useCartContext } from '../Context/Cart_Context';


const CartPage = () => {
  const {cart} = useCartContext();
  if(cart.length < 1){
    return (
      <Wrapper className='page-100'>
          <div className='empty'>
            <h3>Cart is Empty</h3>
            <NavLink to="/products" className="btn">Back </NavLink>
          </div>
      </Wrapper>
    )
  }else{

  return <main>
    <PageHero title='cart'/>
      <Wrapper className='page'>
        <CartContent/>
      </Wrapper>
  </main>
  }
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage