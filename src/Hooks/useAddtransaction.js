import React from 'react'
import {addDoc,collection,serverTimestamp} from "firebase/firestore"
import { db } from '../Config/firebase.config';

import { useGetUserInfo } from './useGetUserInfo';

export default function useAddtransaction() {
    let transactioncollectionref = collection(db,"transaction");

    const {username} = useGetUserInfo();


    // collection(db,collectionname)
    


    const addtransaction = async({description,transactionAmount,transactionType})=>{
       


        // addDoc(collectionref,data)

        await addDoc(transactioncollectionref,
            {
                username:username,
                description:description,
                transactionAmount:transactionAmount,
                transactionType:transactionType,
                createdAt:serverTimestamp(),

            })
    }
  return {addtransaction}
}   