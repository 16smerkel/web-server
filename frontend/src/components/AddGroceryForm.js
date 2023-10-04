import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { v4 as uuidv4 } from 'uuid';

const AddGroceryForm = () => {
    const { dispatch } = useContext(AppContext);

    const [name, setName] = useState('');
    const [store, setStore] = useState('');
    const [cost, setCost] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        const grocery = {
            id: uuidv4(), // generates a random ID
            name: name,
            store: store,
            cost: parseFloat(cost),  //UPDATED TO ACCEPT DECIMALS
        };

        
        alert('name' + grocery.name + ' cost' + grocery.cost);

        dispatch({
            type: 'ADD_GROCERY',
            payload: grocery,
        });

        setName('');
        setStore('');
        setCost('');
    };

    return (
        <form onSubmit={onSubmit}>
            <div className='row'>
                <div className='col-sm'>
                    <label for='name'>Name</label>
                    <input
                        required='required'
                        type='text'
                        className='form-control'
                        id='name'   
                        value={name} //takes whatever name is typed and adds it to list 
                        onChange={(event)=> setName(event.target.value)}         
                    ></input>
                </div>
                <div className='col-sm'>
                    <label for='store'>Store</label>
                    <input
                        required='required'
                        type='text'
                        className='form-control'
                        id='store'   
                        value={store} //takes whatever name is typed and adds it to list 
                        onChange={(event)=> setStore(event.target.value)}         
                    ></input>
                </div>
                <div className='col-sm'>
                    <label for='cost'>Cost</label>
                    <input
                        required='required'
                        type="number" placeholder="0.00" min="0" step="0.01" 
                        className='form-control'
                        id='cost'
                        value={cost} //takes whatever cost is typed and adds it to list 
                        onChange={(event)=> setCost(event.target.value)}     
                    ></input>
                </div>
                <div class='row mt-3'>
                    <div className='col-sm'>
                        <button type='submit' className='btn btn-primary'>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddGroceryForm;