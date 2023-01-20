import React from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Wrapper className='page-100'>
      <section>
        <h1>4O4</h1>
        <h3>Page Not found</h3>
        <NavLink to="/" className="btn">Back</NavLink>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`

export default ErrorPage