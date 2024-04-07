import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state,action) => {
    
    switch(action.type){
        case "ADD":
            console.log("adding");
            console.log(action.name);
            console.log(action.img);
            return [...state,{
                id : action.id, name: action.name, qty: action.qty,
                size: action.size, price: action.price , img: action.img
            }]
        case "REMOVE":
            let newArr = [...state]             // Dont directly perform action on state, store it at somewhere remove from there.
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price);
                    return { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price };
                } else {
                    return food;
                }
            });
        case "DROP":
            let empArray = []
            return empArray;

        default:
            console.log("Error in Reducer");
    }
}

export const CartProvider = ({children}) => {

    const[state,dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
