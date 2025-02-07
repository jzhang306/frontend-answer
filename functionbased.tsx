import React, { useEffect, useState } from "react";

// declare the types of props
interface UserDataProps {
  userId: string; // assume that userId is a string
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [user, setUser] = useState<any>(null); // user has type any with a null value.
  const [seconds, setSeconds] = useState<number>(0); // seconds has type number with a value of 0.

// didMount part from class component.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1); 
    }, 1000);
    return () => clearInterval(intervalId); 
  }, []); 

// didUpdate part from class component, the dependency array is userId.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://secret.url/user/${userId}`);
        const data = await response.json();
        setUser(data); // 更新状态
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); 
  }, [userId]); 

  //return is the transition from render part in class component.
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
};

export default UserData;
