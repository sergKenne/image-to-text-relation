
import './App.css';
import React, {useState, useEffect} from "react";
import data from './data.json'

const users = data.user;

// converseArrayToObject using forEach
// function converseArrayToObject (users, numberPictureByPage) {
//     //const numberPage = users.length/numberPictureByPage;
//     let tempArr = [];
//     let newArrayFragment = [];
//     let newObject= {};
//
//     users.forEach(user => {
//         tempArr.push(user);
//         if(tempArr.length === numberPictureByPage) {
//             newArrayFragment.push(tempArr);
//             tempArr=[];
//         }
//     });
//
//     newArrayFragment.forEach((item, ind) => {
//         newObject[ind] = item;
//     });
//
//     return newObject;
//
// }


// converseArrayToObject using for and slice
function converseArrayToObject (users, numberPictureByPage) {
    const numberPage = users.length/numberPictureByPage;
    let tempArr = [];
    let newArrayFragment = [];
    let newObject= {};
    
    for(let i=0; i<numberPage; i++) {
        tempArr = users.slice(i*numberPictureByPage, numberPictureByPage*(i+1) );
        newArrayFragment.push(tempArr);
        tempArr =[];
    }
    
    newArrayFragment.forEach((item, ind) => {
        newObject[ind] = item;
    });
    
    return newObject;
    
}

console.log("outObjectSlice:", converseArrayToObject(users, 25))

// let temp = [];
// const newArr = [];
// let newObj = {};
//
// users.forEach( user => {
//     temp.push(user);
//     if(temp.length === 25) {
//         newArr.push(temp);
//         temp = [];
//     }
// })
//
// newArr.forEach((item, ind) => {
//     newObj[ind] = item;
// })
//
// console.log("newObj", newObj[1]);
// console.log("newArr:", newArr);
// console.log(users)



function App() {
    const[users, setUsers] = useState([]);
    
    useEffect(()=>{
        setUsers(converseArrayToObject(users, 25));
    },[])
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
