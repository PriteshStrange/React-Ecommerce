import React from 'react'
import { useFilterContext } from '../Context/Filter_Context'
import GridView from './GridView'
import Listview from './Listview';

const ProductList = () => {
    const {filtered_products:products,grid_view} = useFilterContext();
    if(products?.length < 1){
        return (
            <h5 style={{textTransform:'none'}}>There is no product avaible</h5>
        )
    }
    if(grid_view === true){
        return <Listview products={products}/>
    }
  return (
    <GridView products={products}></GridView>
  )
}

export default ProductList