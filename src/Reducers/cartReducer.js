import { ADD_TO_CART, ADD_TO_TOGGLE_AMOUNT, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM } from "../action";

const reducer = (state,action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            const {id,color,amount,product} = action.payload;
            const tempItem = state.cart.find((val) => val.id === id+color);
            if(tempItem){
                const tempCart = state.cart.map((val)=>{
                    if(val.id === id +color){
                        let newAmount = val.amount + amount;
                        if(newAmount > val.max){
                            newAmount = val.max;
                        }
                        return {...val,amount:newAmount}
                    }else{
                        return val;
                    }
                });
                return {...state,cart:tempCart}
            }else{
                const newItem ={
                    id:id+color,
                    name:product.name,
                    color,
                    amount,
                    image:product.images[0].url,
                    price:product.price,
                    max:product.stock
                }
                return {...state,cart:[...state.cart,newItem]}
            }

        case REMOVE_CART_ITEM:
            const tempCart = state.cart.filter((val) => val.id !== action.payload);
            return {
                ...state,
                cart:tempCart
            }

        case CLEAR_CART:
            return {
                ...state,
                cart:[]
            }

        case ADD_TO_TOGGLE_AMOUNT:
            const toogle = action.payload;
            const teCart = state.cart.map((val) => {
                if(val.id === toogle.id){
                    if(toogle.value === 'inc'){
                        let newAmount = val.amount + 1;
                        if(newAmount > val.max){
                            newAmount = val.max;
                        }
                        return {...val,amount:newAmount}
                    }
                    if(toogle.value === 'dec'){
                        let newAmount = val.amount - 1;
                        if(newAmount < 1){
                            newAmount = 1;
                        }
                        return {...val,amount:newAmount}
                    }
                }else{
                    return val
                }
            });
            return {
                ...state,
                cart:teCart
            }
        case COUNT_CART_TOTALS:
            const {total_items,total_amount} = state.cart.reduce((total,cartItem)=>{
                const {amount,price} = cartItem;
                total.total_items +=amount;
                total.total_amount += price * amount;
                return total;
            },{
                total_items:0,
                total_amount:0
            });
            return {...state,total_items,total_amount}
        default:
            return state;
    }
    
}

export default reducer