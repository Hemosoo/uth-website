import React, { useEffect, useState } from "react";
import { auth, db } from "../test/initFirebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as sRef, set, onValue } from "firebase/database";
function Profile() {
  const [todos, setTodos] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  
  const fetchUserData = async () => {

    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
          getBalance(user.uid);
        } 
      } else {
        navigate("/login", {state: {todos: todos}});
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  function getBalance(userId) {
    const db = getDatabase();
    onValue(sRef(db, 'Users/' + userId + "/"), (snapshot) => {
      const data = snapshot.val();
      setTodos(data.balance);
    });
  }
  function playGame() {
    window.location.href = "/game";
  }
  async function handleLogout() {
    try {
      await auth.signOut();
      //indow.location.href = "/";
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome {userDetails.firstName} 🙏🙏</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email: {userDetails.email}</label>
        <div class="mt-2">
        </div>
      </div>
      <div>
        <label for="First Name" class="block text-sm font-medium leading-6 text-gray-900">First Name: {userDetails.firstName}</label>
        <div class="mt-2">
        </div>
      </div>
      <div>
        <label for="Last Name" class="block text-sm font-medium leading-6 text-gray-900">Last Name: {userDetails.lastName}</label>
        <div class="mt-2">
        </div>
      </div>
      <div>
        <label for="Balance" class="block text-sm font-medium leading-6 text-gray-900">Balance: {todos}</label>
        <div class="mt-2">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div class="mt-2">
        </div>
      </div>
      <div>
        <button 
          type="submit" 
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={playGame}
          >
          Deal Me In!
          </button>
      </div>
      <div>
        <button 
          type="submit" 
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleLogout}
          >
          Logout
          </button>
      </div>
    <p class="mt-10 text-center text-sm text-gray-500">
      Made by Hemosoo :)
    </p>
  </div>
</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;