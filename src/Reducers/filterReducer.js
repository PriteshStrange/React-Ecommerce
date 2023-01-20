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

const FilterReducer = (state, action) => {
  switch (action.type) {

    case LOAD_PRODUCT:
      let maxPrice = action.payload.map((val) => val.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        All_Products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          max_price: maxPrice,
          price: maxPrice,
          company: "all",
          category: "all",
          color: "all",
          text: "",
        },
      };

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let temProduct = [...filtered_products];
      if (sort === "price-lowest") {
        temProduct = temProduct.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-higest") {
        temProduct = temProduct.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        temProduct = temProduct.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        temProduct = temProduct.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: temProduct };

    case UPDATE_FILTERS:
       const {name,value} = action.payload;
        return {
        ...state,filters:{...state.filters,[name]:value}
    };

    case FILTERS_PRODUCTS:
      const {All_Products} = state
      const {text,category,company,color,price,shipping} = state.filters;

     
      let tempProducts = [...All_Products]

// for seraching

      if(text){
        tempProducts = tempProducts.filter((val) => {return val.name.toLowerCase().startsWith(text)});
      }
// for category
       if(category !== "all"){
         tempProducts = tempProducts.filter(val => val.category === category)
       }

// for Company
       if(company !== "all"){
         console.log("hello")
         tempProducts = tempProducts.filter((val) => val.company === company);
       }

// for color
       if(color !== "all"){
         tempProducts = tempProducts.filter((val) => {return val.colors.find((item)=> item === color)})
       }

// for Price
       if(price){
         tempProducts = tempProducts.filter((val) => val.price <= price)
       }

//for filter 
       if(shipping){
        tempProducts = tempProducts.filter((val) => val.shipping === true)
       }
        return {
            ...state,
            filtered_products:tempProducts
        }
    
    case CLEAR_FILTERS :
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      }
    default:
      break;
  }
};

export default FilterReducer;
