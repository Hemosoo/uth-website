import CardsWrapper from "../components/CardsWrapper";
import "./Game.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../test/initFirebase";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { getDatabase, ref as sRef, set, onValue } from "firebase/database";
function Game() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const [todos, setTodos] = useState(100);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          
          getBalance(user.uid);
          setTodos(todos)
          setUserDetails(docSnap.data());
          writeUserData(user.uid, todos - 10, docSnap.data().email, docSnap.data().firstName, docSnap.data().lastName);
        } 
      } else {
        toast.error("User not logged in", {
          position: "top-center",
        });
        navigate("/login");
      }
    });
  };
  function writeUserData(userId, balance, email, firstName, lastName) {
    const db = getDatabase();
    set(sRef(db, 'Users/' + userId + "/"), {
      balance: balance,
      email: email,
      firstName: firstName,
      lastName: lastName,
    });
  }

  function getBalance(userId) {
    const db = getDatabase();
    onValue(sRef(db, 'Users/' + userId + "/"), (snapshot) => {
      const data = snapshot.val();
      setTodos(data.balance);
    });
  }
  
  useEffect(() => {
    fetchUserData();
    
  }, []);

  useEffect(() => {
    setTodos(JSON.parse(window.sessionStorage.getItem("todos")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("todos", todos);
  }, [todos]);

  function profilePage() {
    navigate("/profile");
  }


  return (
    <div className="Game">
      <div>
        <button 
          type="submit" 
          class="flex w-full justify-left rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={profilePage}
          >
          Profile
          </button>
          <button 
          class="flex w-full justify-left rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Balance: { todos }
          </button>
      </div>
        <CardsWrapper cardsNumber="5"
        
        />
      <div>
      <button   
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
            window.location.reload()
        }
          
          }>Deal</button>
    </div>
    </div>
  );

}
export default Game;