
import { createContext } from "react";
export const DataContext = createContext();
import { useReducer } from "react";

 const DataProvider=({children,reducer,initialState})=>{
    return(
        <DataContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </DataContext.Provider>
    )
}
export {DataProvider}
