import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../test/initFirebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDatabase, ref as sRef, set } from "firebase/database";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          balance: 100,
        });
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        writeUserData(user.uid, 100, docSnap.data().email, docSnap.data().firstName, docSnap.data().lastName);
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
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

  return (
    <form onSubmit={handleRegister}>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register for an account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

    <div>
        <div class="flex items-center justify-between">
          <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
        </div>
            <div class="mt-2">
            <input 
                id="firstname" 
                name="firstname"
                type="text"
                className="form-control"
                placeholder="Enter first name"
                onChange={(e) => setFname(e.target.value)}
                required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
      
        
        <div class="flex items-center justify-between">
          <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
        </div>
            <div class="mt-2">
            <input 
                id="lastname" 
                name="lastname"
                type="text"
                className="form-control"
                placeholder="Enter last name"
                onChange={(e) => setLname(e.target.value)}
                required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        

    <div>
      <div class="flex items-center justify-between">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
        </div>
        <div class="mt-2">
          <input 
            id="email" 
            name="email" 
            type="email" 
            autocomplete="email" 
            required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
      </div>


      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input 
            id="password" 
            name="password" 
            type="password" 
            autocomplete="current-password" 
            required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
      </div>

      <div>
        <button type="submit" 
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up!</button>
      </div>

    <p 
        className="forgot-password text-right">
        Already Registered? <a 
        href="/login"
        class="text-center text-indigo-500">
          Login Here
        </a>
      </p>
      <p class="mt-10 text-center text-sm text-gray-500">
      Made by Hemosoo :)
    </p>
  </div>
    </div>
</form>
  )};

export default Register;