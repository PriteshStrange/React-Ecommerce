import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/filterReducer";
import {
  LOAD_PRODUCT,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_SORT,
  UPDATE_FILTERS,
  FILTERS_PRODUCTS,
  CLEAR_FILTERS
} from "../action";
import { useProductContext } from "./Product_Context";

const intialState = {
  filtered_products: [],
  All_Products: [],
  grid_view: false,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const filterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCT, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTERS_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort,state.filters]);

  const setGrid = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setList = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if(name === "category"){
        value = e.target.textContent
    }
    if(name === "color"){
        value = e.target.dataset.color
    }
    if(name === "price"){
        value = Number(value)
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
      dispatch({type:CLEAR_FILTERS})
  };

  return (
    <filterContext.Provider
      value={{
        ...state,
        setGrid,
        setList,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </filterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(filterContext);
};
