import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
export default function Register({setShowRegister}){
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handelSubmit = async (e) =>{
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        try {
            await axios.post("/users/register",newUser);
            setError(false);
            setSuccess(true);
        } catch (err) {
            setError(true);
        }

    }

    return (
    <div className="registerContainer">
        <form onSubmit={handelSubmit}>
        <center>
            <input type="text" placeholder="Full Name" ref={nameRef}/>
            <input type="email" placeholder="email" ref={emailRef}/>
            <input type="password" placeholder="password" ref={passwordRef}/>
            <br/>
            <button>Register</button>
            <br/>
            {(success) && (<span className="success">Successfully registered</span>)}
            {error && (<span className="failure">Oops!,Something went wrong</span>)}
        </center>
        </form>
        <button className="registerClose" onClick={()=>setShowRegister(false)}>x</button>
    </div>
    );
}