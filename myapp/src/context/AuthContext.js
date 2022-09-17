import {View, Text} from 'react-native';
import React, {createContext, useContext, useReducer, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
const Authcontext = createContext();

const initialvalue = {
  isAuthenticated: false,
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'LOGIN':
      return Object.assign({}, {isAuthenticated: true}, 
        {user: payload.user});
    case 'LOGOUT':
      return Object.assign(({}, {isAuthenticated: false}));

    default:
      return state;
  }
};
export default function AuthContextProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialvalue);
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged((user) => {
        if(user){
          dispatch({ type: "LOGIN", payload: { user } })
        }else{
          dispatch({ type: "LOGOUT" })
        }
      });
      return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <Authcontext.Provider value={{...state, dispatch}}>
      {children}
    </Authcontext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(Authcontext);
};

