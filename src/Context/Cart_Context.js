import { createContext } from 'react';
import { useContext } from 'react';
import { useReducer } from 'react';
import { ADD_TO_CART, REMOVE_CART_ITEM, CLEAR_CART, ADD_TO_TOGGLE_AMOUNT, COUNT_CART_TOTALS } from '../action';
import reducer from '../Reducers/cartReducer';
import { useEffect } from 'react';

const getLocalStorage = () =>{
    let cart = localStorage.getItem('Cart');
    if(cart){
        return JSON.parse(localStorage.getItem('Cart'))
    }else{
        return []
    }
}

const intialState ={
    cart:getLocalStorage(),
    total_items:0,
    total_amount:0,
    shipping_fee:500
}

const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,intialState);

    // Add Item
    const addToCart = ({id,color,amount,product}) =>{
        dispatch({type:ADD_TO_CART,payload:{id,color,amount,product}})
    }

    // remove Item
    const removeItem = (Id) =>{
        dispatch({type:REMOVE_CART_ITEM,payload:Id})
    } 
    // Toggle Item 
    const toggleAmount = (id,value) =>{
        dispatch({type:ADD_TO_TOGGLE_AMOUNT,payload:{id,value}})
    }
    // Clear cart Item
    const clearCart = () =>{
        dispatch({type:CLEAR_CART})
    }

    useEffect(()=>{
        dispatch({type:COUNT_CART_TOTALS})
        localStorage.setItem('Cart',JSON.stringify(state.cart))
    },[state.cart]);
    
    return (
        <CartContext.Provider value={{...state,addToCart,clearCart,removeItem,toggleAmount}}>{children}</CartContext.Provider>
    )
}

export const useCartContext = () =>{
    return useContext(CartContext)
}