import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';


const Grocery = ({grocery, popUpAlert, deleteGrocery}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="col-2">
        <div className='groceryObject'>
          {grocery.name}
        </div>
      </div>
      <div className="col-4">  
        <div className='groceryObject'>
          {grocery.store}
        </div>
      </div>
      <div>
        <div className='groceryObject'>
          <Badge className='badge-primary badge-pill mr-3'>
              ${grocery.price}
          </Badge>
      <button className='font-bold' onClick={() => popUpAlert(grocery.id)}><FaTrash /></button>
      </div>
      </div>
    </li>
  )
}

export default Grocery
/*import React from 'react'

export default function Grocery({ grocery, toggleGrocery }) {
  function handleGroceryClick() {
    toggleGrocery(grocery.id)
  }
// after line 12 add {grocery.price}
  return (
    <div>
      <label>
        <input type="checkbox" checked={grocery.complete} onChange={handleGroceryClick}></input>
        {grocery.name}
        { } {grocery.price}
      </label>
    </div>
  )
}
*/
