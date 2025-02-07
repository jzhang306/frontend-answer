//First, transit from class component to funciton component in js.
//import useState and useEffect from react, these are supplmentary hooks to replace state and lifecycle methods in class component.
import React, {useEffect, useState} from "react";

//transition from constructor, use useState to replace this.state.
//userId is a prop that is passed to the component in fetchUserData function.
const UserData = ({userId}) =>{
    const [user, setUser] = useState(null);
    const [seconds, setSeconds] = useState(0);

//useEffect transition part from DidMount, but only for interval setting.
//this setting is for DidMount so the paramters contain a empty array.
useEffect(()=>{
    const intervalId = setInterval(()=>{
        setSeconds(seconds + 1);
    }, 1000);
    return clearInterval(intervalId);
},[])

//useEffect transition part from DidMount and DidUpdate, userData update is a dependency.
//Since fetch returns Promise, we better use async/await to handle it.
useEffect(()=>{
    const fetchUserData = async ()=>{
        try{
            const response = await fetch(`https://secret.url/user/${userId}`);
            const data = await response.json();
            setUser(data);
        }catch(error){
            console.error('Error fetching user data:', error);
        }
        fetchUserData();
    }
}, [userId])

//useEffect transition part from WillUnmount.
//Paramater follows a cleanup function.
useEffect(()=>{
    const intervalId = setInterval(()=>{
        setSeconds(seconds + 1);
    }, 1000);

    return clearInterval(intervalId);
})


//return part is the transition from render.
return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
}
