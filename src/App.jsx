

import './App.css'
import { BrowserRouter } from "react-router";

import Routering from './Routing'
import { useContext, useEffect } from 'react';
import { DataContext } from './Components/DataProvider/DataProvider';
import { Types } from './Utility/action.type';
import { auth } from './Utility/firebase'; 
function App() {
  
  
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Types.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Types.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <>
     
      <Routering />
    </>
  )
}

export default App
