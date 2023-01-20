import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";
import AmountButtons from "./AmountButtons";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../Context/Cart_Context";

const AddToCart = ({ product }) => {
  const {addToCart} = useCartContext();
  const { id, colors, stock } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  let color = mainColor;
  const [amount,setAmount] = useState(1);
  
  const inc = () =>{
    setAmount((val) =>{
      let temp = val + 1;
      if(temp > stock){
        temp = stock
      }
      return temp
    })
  }

  const dec = () =>{
      setAmount((val) =>{
        let temp = val - 1;
        if(temp  < 1){
          temp = 1
        }
        return temp 
      })
  }
  
  return (
    <Wrapper>
      <div className="colors">
        <span>Colors :</span>
        <div>
          {colors.map((val, index) => {
            return (
              <button
                key={index}
                style={{ background: val }}
                className={`${
                  mainColor === val ? "color-btn active" : "color-btn"
                }`}
                onClick={() => setMainColor(val)}
              >{mainColor === val ? <FaCheck/> : null}</button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
          <AmountButtons amount={amount} increse={inc} decrese={dec}/>
          <NavLink to="/cart" onClick={() => addToCart({id,color,amount,product})} className="btn"> Add to cart</NavLink>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;

export default AddToCart;
