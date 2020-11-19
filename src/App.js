
import './App.css';
import React, {useState, useEffect, useRef} from "react";
import data from './data.json'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Grid, Card, CardActionArea, CardContent,CardMedia, Typography, Button, Box
} from "@material-ui/core";
import Input from '@material-ui/core/Input';

//const users = data.user;

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


//const arr = ["banana", "orange", "kiwi", "citron", "raisin"];
//random massive function

const obj ={
    "0-0": "serge                      simplce",
    "0-1": "tat co   lette",
    "0-2": "robert     ali     ma",
    "0-3": "Albertine",
    "1-0": "max  mer",
    "1-1": "ti    hi",
    "1-2": "Rem smith",
    "1-3": "fi     fa"
}

function firstTransform() {
    let obFinale= {}
    let n=0, k=0;
    for(let i=0; i<100; i++) {
        obFinale[`${n}-${k}`] ="";
        k++;
        if(k === 25){
           n=n+1;
           k=0;
        }
    }
    return obFinale;
}

let firstOb = firstTransform();




function ObjToArr(ob, nbEltByPage) {
    let n=0, k=0;
    let arr = [];
    for(let i=0; i<Object.keys(ob).length; i++) {
        let tmp = "";
        tmp = ob[`${n}-${k}`];
        arr.push(tmp);
        k=k+1;
        if( k=== nbEltByPage ) {
            n=n+1;
            k=0;
        }
    }
    
    console.log("arrIsObj:", arr);
    const arrMap = arr.map(item => {
        
        const el = item.trim().split(" ");
        let el2 = "";
        for(let j=1; j<el.length; j++) {
            if(el[j].length>0){
                el2 = el[j];
                break;
            }
        }
        
        return {
            firstName: el[0],
            lastName: el2
        }
    })
    
    console.log("arrMap:", arrMap);
}

console.log("obj:", obj);

ObjToArr(obj, 4);



function arrRandom(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
}

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

//console.log("outObjectSlice:", converseArrayToObject(users, 25))

function App() {
    const classes = useStyles();
    const[users, setUsers] = useState([]);
    const subObject = converseArrayToObject(users, 25);
    const [counter,setCounter] = useState(0);
    
    const [responses, setResponses] = useState(firstOb);
    
   const [timer, setTimer] = useState(null)
    
    const nextCounter = () => {
        if(counter === users.length/25 - 1) {
            setCounter(0);
        } else {
            setCounter(preCounter => preCounter + 1)
        }
    }
    
    const prevCounter = () => {
        if(counter === 0) {
            setCounter(users.length/25 - 1);
        } else {
            setCounter(preCounter => preCounter - 1);
        }
    }
    
    const handleChange = (e) => {
       setResponses(prevState => {
           return {
               ...prevState,
               [e.target.name]: e.target.value
           }
       })
    }
    
    
    
    
    useEffect(()=>{
        setUsers(data.user);
        let n=0;
        let t = 0;
        
        let timePass = setInterval(()=>{
           n=n+1;
          
            if(n===60) {
                t=t+1;
                n=1;
            }
            //console.log(n);
            document.querySelector('.hour').innerText = new Date().getHours();
            document.querySelector('.minutes').innerText = new Date().getMinutes()
            //document.querySelector('.second').innerText = new Date().getSeconds();
            
            document.querySelector('.nbMinute').innerText = 14 - t;
            document.querySelector('.nbSecond').innerText = 60 - n;
            
        }, 1000);
        
        console.log("typeof timePass:",  timePass)
        setTimer(timePass);
        
        if( t === 15) {
            return () => {
                clearInterval(timePass);
            }
        }
        
    },[])
    
    
  return (
    <div className="App">
      <h1>Hello</h1>
        <div className="date">
            <div>
               <span className="nbMinute"></span>{" : "} <span className="nbSecond"></span>
            </div><br/>
            <Button
                variant="contained"
                color="primary"
                onClick={() => clearInterval(timer)}
                className="stop"
            >Stop</Button><br/>
            <span className="hour"></span>{" : "}
            <span className="minutes"></span>{" : "}
            <span className="second"></span>
        </div>
        <Container>
            <Box>
                <Button variant="contained" color="primary" onClick={ prevCounter }>
                    Prev
                </Button>
                {"        "}
                <Button variant="contained" color="primary" onClick={ nextCounter }>
                    next
                </Button>
            </Box><br/>
            <Box>
                <h3>{(counter+1)*25} / {users.length}</h3>
            </Box>
            <Grid container spacing={1}>
                
                {users.length ? subObject[counter].map((user, ind) => {
                    const {firstName, lastName, img} = user;
                   return (
                       <Grid item key={ind} style={{width: "20%"}}>
                           <Card className={classes.root}>
                               <CardActionArea>
                                   <CardMedia
                                       className={classes.media}
                                       image={img}
                                       title="Contemplative Reptile"
                                       style={{maxWidth:"100%"}}
                                   />
                                   <CardContent>
                                       <Typography gutterBottom variant="h6" component="h6" style={{fontSize:"1.1rem"}}>
                                           {firstName} {"    "} {lastName}
                                       </Typography>
                                       <input
                                           placeholder="Placeholder"
                                           name={`${counter}-${ind}`}
                                           value={responses[`${counter}-${ind}`]}
                                           onChange={handleChange}
                                       />
                                   </CardContent>
                               </CardActionArea>
                           </Card>
                       </Grid>
                   )
                }) : "Loading"}
                
            </Grid>
        </Container>
    </div>
  );
}

export default App;
