import React from 'react'
import { AppProvider } from '../components/AppContext';
import ListDisplay from '../components/ListDisplay';
import Navbar from '../components/Navbar';


const ListPage = () => {
    return(
    <div>
        <Navbar />
        <ListDisplay />
    </div>
    )
}

export default ListPage

// map goes through all the groceries in the array 
// pass in the grocery items through the checkbox component
