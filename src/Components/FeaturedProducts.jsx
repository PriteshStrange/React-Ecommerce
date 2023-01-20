import React from 'react';
import styled from 'styled-components';
import { useProductContext } from '../Context/Product_Context';
import Loading from './Loading';
import Error from './Error';
import Prdouct from './Product';

const FeaturedProducts = () => {
  const {products_loading:loading,products_error:error,featured_products:featured} = useProductContext();
  if(loading){
    return <Loading/>
  }
  if(error){
    return <Error/>
  }
  return (
      <Wrapper className='section'>
        <div className='title'>
            <h2>Featured Products</h2>
            <div className='underline'></div>
        </div>
        <div className='section-center featured'>
          {
            featured.slice(0,3).map((val) => {
              return <Prdouct key={val.id} {...val}/>
            })
          }
        </div>
      </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`
export default FeaturedProducts