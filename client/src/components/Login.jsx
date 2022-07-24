import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";
export default function Login({setShowLogin,setUserEmail}){
    const [error,setError] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    const handelSubmit = async (e) =>{
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        try {
            const res = await axios.post("/users/login",user);
            setUserEmail(res.data.email);
            setError(false);
        } catch (err) {
            setError(true);
        }

    }

    return (
    <div className="loginContainer">
        <form onSubmit={handelSubmit}>
        <center>
            <input type="email" placeholder="email" ref={emailRef}/>
            <input type="password" placeholder="password" ref={passwordRef}/>
            <br/>
            <button>Login</button>
            <br/>
            {error && (<span className="failure">Oops!,Something went wrong</span>)}
        </center>
        </form>
        <button className="loginClose" onClick={()=>setShowLogin(false)}>x</button>
    </div>
    );
}