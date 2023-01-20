import { createContext, useEffect, useContext, useReducer } from "react";
import reducer from "../Reducers/productReducer";
import {
  SIDEBARCLOSE,
  SIDEBAROPEN,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET__SINGLE_PRODUCTS_BEGIN,
  GET__SINGLE_PRODUCT_SUCCESS,
  GET__SINGLE_PRODUCT_ERROR
} from "../action";
import { products_url } from "../utils/constant";
import axios from "axios";

const ProductsContext = createContext();

const intialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading:false,
  single_product_error:false,
  single_product:{}
};

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, intialState);

  const openSlider = () => {
    dispatch({ type: SIDEBAROPEN });
  };

  const closeSlider = () => {
    dispatch({ type: SIDEBARCLOSE });
  };

  const fetchProducts = async (products_url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(products_url);
      const product = response.data;
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: product });
    } catch (err) {
      dispatch({ type: GET_PRODUCT_ERROR });
    }
  };

  const fetchSingleProduct = async(url) =>{
      dispatch({type:GET__SINGLE_PRODUCTS_BEGIN})
      try{
          const response = await axios.get(url);
        const singleproduct = response.data;
        dispatch({type:GET__SINGLE_PRODUCT_SUCCESS,payload:singleproduct})
      }catch(err){
        dispatch({type:GET__SINGLE_PRODUCT_ERROR})
      }
  }

  useEffect(() => {
    fetchProducts(products_url);
  }, [products_url]);
  
  return (
    <ProductsContext.Provider value={{ ...state, openSlider, closeSlider,fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductsContext);
};
