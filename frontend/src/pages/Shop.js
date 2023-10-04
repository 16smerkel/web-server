import ShopSearch from '../components/ShopSearch';
import Navbar from '../components/Navbar';
import { AppProvider } from '../components/AppContext';
import StoreData from '../components/Data.json';
import Budget from '../components/Budget';
import Remaining from '../components/Remaining';
import Total from '../components/Total';
import GroceryList from '../components/GroceryList';
import AddGroceryForm from '../components/AddGroceryForm';

const ShopPage= () => {
  return (
    <div>
      <Navbar />
      <ShopSearch />
    </div>
  )
}

export default ShopPage
/*
const ShopPage = () => {
  return (
    <AppProvider>
      <Navbar/>
      <ShopSearch data={StoreData}/>
      <div classname='container'>
      <h1 className='mt-3'>My Budge It! Planner</h1>
      <div className="row mt-3">
        <div className="col-sm">
          <Budget />
        </div>
        <div className="col-sm">
          <Remaining />
        </div>
        <div className="col-sm">
          <Total />
        </div>
      </div>
      <h3 className='mt-3'>Grocery List</h3>
      <div className='row mt-3'>
        <div className='col-sm'>
          <GroceryList />
        </div>
      </div>
      <h3 className='mt-3'>Add Grocery</h3>
      <div className='mt-3'>
        <div className='col-sm'>
          <AddGroceryForm />
        </div>
      </div>
    </div>
    </AppProvider>
  )
}

export default ShopPage
*/