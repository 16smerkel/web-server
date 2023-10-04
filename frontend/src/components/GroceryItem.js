import React, { useContext } from 'react';
import Badge from 'react-bootstrap/Badge';

import { AppContext } from './AppContext';

const GroceryItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteGrocery = () => {
        dispatch({
            type: 'DELETE_GROCERY',
            payload: props.id,
        });
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="col-2">
                {props.name}
            </div>
            <div className="col-1">
                {props.store}
            </div>
            <div>
                <Badge className='badge-primary badge-pill mr-3'>
                    ${props.cost}
                </Badge>
                <button>    
                   
                </button>
            </div>
        </li>
    );
};

export default GroceryItem;