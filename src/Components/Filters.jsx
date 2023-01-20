import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useFilterContext } from "../Context/Filter_Context";
import { formatPrice, getUniqValue } from "../utils/helpers";

const Filters = () => {
  const {
    filters: {
      text,
      company,
      category,
      color,
      min_price,
      max_price,
      price,
      shipping,
    },
    All_Products,
    updateFilters,
    clearFilters,
  } = useFilterContext();


  const allCategorys = getUniqValue(All_Products, "category");
  const allCompanys = getUniqValue(All_Products, "company");
  const allcolors = getUniqValue(All_Products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Serach Input */}
          <div className="form-cotrol">
            <input
              type="text"
              name="text"
              placeholder="Search"
              value={text}
              onChange={updateFilters}
              className="search-input"
            />
          </div>
          {/* end Search */}

          {/* Categories */}
          <div className="form-cotrol">
            <h5>Category</h5>
            <div>
              {allCategorys.map((val, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={updateFilters}
                    name="category"
                    className={`${
                      category === val.toLowerCase() ? "active" : null
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end category */}

          {/* Company */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              name="company"
              // value={company}
              onChange={updateFilters}
              className="company"
            >
              {allCompanys.map((val, index) => {
                return (
                  <option key={index} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of company */}

          {/* Colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {allcolors.map((val, index) => {
                if (val === "all") {
                  return (
                    <button
                      name="color"
                      key={index}
                      onClick={updateFilters}
                      data-color="all"
                      className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}
                    >
                      All
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: val }}
                    className={`${
                      color === val ? "color-btn active" : "color-btn"
                    }`}
                    data-color={val}
                    onClick={updateFilters}
                  >
                    {color === val ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}

          {/* Price */}
              <div className="form-control">
                <h5>Price</h5>
                <p className="price">{formatPrice(price)}</p>
                <input type="range" name="price" onChange={updateFilters} min={min_price} max={max_price} value={price}/>
              </div>
          {/* end price */}

          {/* shipping */}
              <div className="form-control shipping">
                <label htmlFor="shipping">Free Shipping</label>
                <input type="checkbox" name="shipping" id="shipping" checked={shipping} onChange={updateFilters}/>
              </div>
          {/* end of shipping */}
        </form>
        <button type="button" onClick={clearFilters} className="clear-btn">Clear All</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
