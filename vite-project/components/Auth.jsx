import { useState } from "react"
import { auth , googleProvider} from "../config/Firebase.config.js"
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
 
export const Auth = ()=>{
    const signIn = async ()=>
    {
        //password greater than 6 characters
        try{
          await createUserWithEmailAndPassword(auth,email,password)
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    const signInWithGoogle= async () =>{
        try
        {
            await signInWithPopup(auth,googleProvider)
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    const Logout = async ()=>{
            try
            {
                await signOut(auth,googleProvider)
            }
            catch(e)
            {
                console.log(e.message)
            }
    }
    
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    
    return (
        <>
            <label>Enter Name:</label>
            <input placeholder="name" type="text"
            value={name} onChange={(e)=>(setName(e.target.value))}/>
            <label>Enter Email:</label>
            <input placeholder="email" type="email"
            value={email} onChange={(e)=>(setEmail(e.target.value))}/>
            <label>Enter Password:</label>
            <input placeholder="password" type="password"
            value={password} onChange={(e)=>(setPassword(e.target.value))}/>
            <button onClick={signIn}> Sign In</button>
            <button onClick={signInWithGoogle}>Google Sign In</button>
            <button onClick={Logout}>Logout</button>
        </>
    )
}