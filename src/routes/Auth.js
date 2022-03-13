import {authService, firebaseInstance} from "fbase";
import { useState } from "react";

function Auth(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange=(e)=>{
        const {target: {name, value}} = e;
        if(name==="email"){setEmail(value);}
        if(name==="password"){setPassword(value);}
    }
    const onSubmit = async(e) =>{
        e.preventDefault();
        
        try{
            let data;
            const auth = authService.getAuth();
         
            if(newAccount){
                //create account
                 data = await authService.createUserWithEmailAndPassword(
                    auth, email, password
                );
            }else{
                //login
                 data = await authService.signInWithEmailAndPassword(
                    auth, email, password
                );
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    }
    const toggleAccount = () =>{
        setNewAccount(prev => !prev);
    }
    const onSocialClick = async (event) => {
        const {target : {name}} = event;
        let provider;
        if(name==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return(
    <div>
        <form  onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email}  onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? " Create Account" : "Login"}/>
            {error}
            </form>
            <span onClick={toggleAccount}>{newAccount?"Sign In":"Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
    </div>
    );
}
export default Auth;