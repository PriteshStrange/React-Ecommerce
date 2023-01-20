import {
  SIDEBAROPEN,
  SIDEBARCLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCT_SUCCESS,
  GET__SINGLE_PRODUCTS_BEGIN,
  GET__SINGLE_PRODUCT_SUCCESS,
  GET__SINGLE_PRODUCT_ERROR,
} from "../action";

const productReducer = (state, action) => {
  switch (action.type) {
    case SIDEBAROPEN:
      return { ...state, isSidebarOpen: true };

    case SIDEBARCLOSE:
      return { ...state, isSidebarOpen: true };

    case GET_PRODUCTS_BEGIN:
      return { ...state, product_loading: true };

    case GET_PRODUCT_SUCCESS:
        // console.log("action.payload",action.payload)
      const featured = action.payload.filter(
        (product) => product.featured === true
      );
    //   console.log("🚀 ~ file: productReducer.js:26 ~ productReducer ~ featured", featured)

      return {
        ...state,
        product_loading: false,
        products: action.payload,
        featured_products: featured,
      };

    case GET__SINGLE_PRODUCTS_BEGIN:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };

    case GET__SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
      };

    case GET__SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    default:
      throw new Error(`No matchinf found ${action.payload} - action..`);
  }

  //   return state;
};

export default productReducer;
