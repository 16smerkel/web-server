import React from "react";
import { MdAddShoppingCart } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';

const SearchTableRow = ({ grocery, addGrocery}) => {
  return (
    <tr>
        <td>{grocery.name}</td>
        <td>{grocery.store}</td>
        <td>{grocery.cost}</td>
        <td>
        <button type="button" onClick={(event) => addGrocery(event, grocery)}>
          &nbsp;<AiFillPlusCircle />&nbsp;
        </button>
      </td>
    </tr>
  );
};

export default SearchTableRow;
