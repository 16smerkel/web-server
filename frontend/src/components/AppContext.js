import { createContext, useReducer } from 'react';

// creates the new state object based on the actions it receives
const AppReducer = (state, action) => {
    // accepts the current state and the action which gets passed in by dispatch 
    switch(action.type){
        case 'ADD_GROCERY':
            return {
                ...state, //copies current state
                groceries: [...state.groceries, action.payload], //creates new array with previous grocieres but adds new item at the end
            };
        case 'DELETE_GROCERY':
            return {
                ...state, 
                groceries: state.groceries.filter(
                    (grocery) => grocery.id !== action.payload),  //removes grocery based on the given ID
            };
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
            };
        default:
            return state;
    }
}

const initialState = {
    budget: 7600,
    groceries: [
        { id: 12, name: 'honey nut', store: 'Walmart', cost: 34 },
        { id: 13, name: 'honey from dead bees', store: 'Walmart', cost: 40 },
        { id: 14, name: 'baking soda', store: 'Publix', cost: 18 },
        { id: 15, name: 'baked soda', store: 'Walmart', cost: 48 },
    ],
    databaseState: [
        { id: 12, name: 'baking soda', store: 'Walmart', cost: 34 },
        { id: 13, name: 'baked soda', store: 'Walmart', cost: 48 },
        { id: 14, name: 'will bake soda', store: 'Publix', cost: 340 },
        { id: 15, name: 'rihanna tickets', store: 'Walmart', cost: 4000 },
        { id: 12, name: 'expired cereal', store: 'Walmart', cost: 3 },
        { id: 13, name: 'milk after the cereal', store: 'Walmart', cost: 450 },
        { id: 14, name: 'square shaped circle', store: 'Publix', cost: 4 },
        { id: 15, name: 'the rights to the letter Y', store: 'Walmart', cost: 894 },
    ],
};

export const AppContext = createContext(); // creates a context

// wraps the components that will pass certain state values to
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // state is the current state
    // dispatch updates the state
    return(
        <AppContext.Provider
            value={{
                budget: state.budget,
                groceries: state.groceries,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};