//here i want to get the transaction


import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy,where} from 'firebase/firestore';
import { db } from '../Config/firebase.config';
import { query } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';
export default function useGetTransactions() {

const {username}  = useGetUserInfo();
  //make a collection reference

   const collectionref = collection(db,"transaction");
  const [transaction,settransaction] = useState([]);

  const [transactiontotal,settransactiontotal] = useState(

    {balance:0.00,
    expense:0.0,
    income:0.0,
    
    }
  )
  //isse me transaction update krunga

  



  const gettransaction =  async()=>{
    let unsubscribe;
   try{
    const queryTransaction =query(collectionref,where("username","==",username),
    orderBy("createdAt"));
   
   
   unsubscribe = onSnapshot(queryTransaction,(snapshot)=>{
   
   let docs =[];
   let totalincome = 0;
   let totalexpense = 0;

      snapshot.forEach((x)=>{
        const data = x.data();
        const id = x.id;
        docs.push({...data,id:id});
        if(data.transactionType == 'expense'){
          totalexpense+=Number(data.transactionAmount);
        }
        else{
          totalincome+=Number(data.transactionAmount);
        }


      })
      settransaction(docs);  
      let balance = totalincome-totalexpense;
settransactiontotal({
  balance,
  totalexpense,
  totalincome
})

    })

  }catch(error){
    console.error(error)
   } 
   return ()=>unsubscribe();
  }


  useEffect(()=>{
gettransaction(); 
  },[]);
  

  return {transaction,transactiontotal};
}
