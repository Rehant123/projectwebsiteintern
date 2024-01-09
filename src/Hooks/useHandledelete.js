import { QueryStartAtConstraint, collection, query } from 'firebase/firestore';
import React from 'react'
import { db } from '../Config/firebase.config';
import { doc,deleteDoc } from 'firebase/firestore';
export default function useHandledelete() {

  const deleteit = async(id)=>{

     try{
        let transactionCollection = collection(db,"transaction");
      const documentref = doc(transactionCollection,id);
      await deleteDoc(documentref);
    
     }

     catch(error){
    console.error(error)
     }
  }

  return {deleteit};
}
