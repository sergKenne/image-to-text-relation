
import './App.css';
import React, {useState, useEffect} from "react";
import data from './data.json'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Grid, Card, CardActionArea, CardContent,CardMedia, Typography, Button, Box
} from "@material-ui/core";

//const users = data.user;

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

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
    
    useEffect(()=>{
        setUsers(data.user);
    },[])
  return (
    <div className="App">
      <h1>Hello</h1>
        <Container>
            <Box>
                <Button variant="contained" color="primary" onClick={ prevCounter }>
                    Decreament
                </Button>
                {"        "}
                <Button variant="contained" color="primary" onClick={ nextCounter }>
                    Increament
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
                                       <Typography gutterBottom variant="p" component="h4" style={{fontSize:"1.1rem"}}>
                                           {firstName} {"    "} {lastName}
                                       </Typography>
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
