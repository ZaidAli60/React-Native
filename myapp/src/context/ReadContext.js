import React, {useContext, useState,useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {createContext} from 'react';

const ReadDataContext = createContext();

export default function ReadContext({children}) {
  const [documents, setdocuments] = useState();

  const getData = () => {
    let array = [];
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
        //   console.log(
        //     'User ID: ',
        //     documentSnapshot.id,
        //     documentSnapshot.data(),
        //   );
          array.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
        setdocuments(array)
      });
  };

  useEffect(() => {
   getData();
  }, [])
  

  return (
    <ReadDataContext.Provider value={{documents}}>
      {children}
    </ReadDataContext.Provider>
  );
}

export const useReadDataContext = () => {
  return useContext(ReadDataContext);
};
