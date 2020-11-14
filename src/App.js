
import './App.css';
import React from "react";
import data from './data.json'

const users = data.user;

function converseArrayToObject (users, numberPictureByPage) {
    const numberPage = users.length/numberPictureByPage;
    let tempArr = [];
    let newArrayFragment = [];
    let newObject= {};
    
    users.forEach(user => {
        tempArr.push(user);
        if(tempArr.length === numberPictureByPage) {
            newArrayFragment.push(tempArr);
            tempArr=[];
        }
    });
    
    newArrayFragment.forEach((item, ind) => {
        newObject[ind] = item;
    });
    
    return newObject;
    
}

console.log("outObject:", converseArrayToObject(users, 25))

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
    // console.log(data.user);
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
