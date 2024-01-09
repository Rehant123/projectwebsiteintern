import React from 'react'
import "./expense.css"
import useAddtransaction from "../../Hooks/useAddtransaction"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useGetTransactions from "../../Hooks/useGetTransactions"
import { useGetUserInfo } from '../../Hooks/useGetUserInfo';
import useHandledelete from '../../Hooks/useHandledelete';
import { auth } from '../../Config/firebase.config'


export default function ExpenseTracker() {
  const {username} = useGetUserInfo();
const {addtransaction} = useAddtransaction();
const {deleteit} = useHandledelete();
const {transaction,transactiontotal} = useGetTransactions();
const Navigate  =useNavigate();



//get the required data from transaction
const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

let balance = 0;
const [description, setDescription] = useState('');
const [transactionAmount, setTransactionAmount] = useState('');
const [transactionType, setTransactionType] = useState('expense');

const onSubmit = (e)=>{
  e.preventDefault();
addtransaction({description,transactionAmount,transactionType});
setDescription("");
setTransactionAmount("");
}

//make a function to Signout

const onSignout =async (e)=>{
 
  try{
await signOut(auth);
localStorage.clear();
console.log("signing out");
Navigate("/login")


  }catch(error){
  console.error(error)  
  }
}



const handledelete = (id)=>{
console.log(id)
deleteit(id);

}

  return (
    <div>

   <div className="expense-tracker">
    <div className="container">
      <div className="title-container">
      <h1>{username}'s Expense Balance</h1>

 <img className = "profile-photo ml-6"  src = "https://img.freepik.com/premium-photo/3d-render-male-avatar-with-blue-sweater-good-profile-picture_477250-13.jpg"></img>
  <button className = "sign-out" onClick={onSignout}>Signout</button>
  <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
       
         className= '   ml-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
       
        type="button"
        onClick={() => Navigate("/contact")}

      >
        Contact Us  
      </button>
      </div>
     
      <div className="balance">
        <h3>Your Balance</h3> 
      {transactiontotal.balance>=0?
      <h2>$ {transactiontotal.balance}</h2>:
      <h2>-${-1*transactiontotal.balance}</h2>
      }
      </div>
      <div className="summary">
        <h3>Expenses</h3> 
      <h4>$ {transactiontotal.totalexpense}</h4>
      </div>
      <form onSubmit = {onSubmit} className="add-transaction" action="">
  <input  required onChange = {(e)=>setDescription(e.target.value)} type="text"
   className="input-field text-black" placeholder="Description" 
   value = {description}/>
  
  
  <input required onChange = {(e)=>setTransactionAmount(e.target.value)} type="number"
   className="input-field text-black" placeholder="Amount" 
   value = {transactionAmount} />
  <div className="transaction-type">
  <div>
  <input
    checked={transactionType === 'expense'}
    onChange={() => setTransactionType('expense')}
    type="radio"
    id="expense"
    name="transactionType"
    value={transactionAmount}
    required
  />
  <label htmlFor="expense">Expense</label>
</div>
<div>
  <input
    checked={transactionType === 'income'}
    onChange={() => setTransactionType('income')}
    type="radio"
    id="income"
    name="transactionType"
    value={"income"}
    required
  />
  <label htmlFor="income">Income</label>
</div>

  </div>
  <button className="add-button">
    Add Transaction
  </button>
</form>

    </div>
   </div>
   
   <div className="transactions-container">
        <h3>Transactions</h3>
        <ul className="transactions-list">
          {transaction.map((x) => {
            const { description, transactionAmount, transactionType, id } = x;
            return (
              <li key={id} className="transaction-item">
                <h4>{description}</h4>
                <p className={`transaction-type ${transactionType}`}>${transactionAmount}  <span className={`transaction-type ${transactionType}`}>{transactionType}</span></p> 
                <button onClick = {()=>{handledelete(id)}} className = "delete-button bg-red-300">Delete</button>
                
                             </li>
            );
          })}
        </ul>
      </div>
   </div>
  )
}
