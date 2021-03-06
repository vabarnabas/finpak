import React from 'react'
import { useState } from 'react';
import {signInWithEmailAndPassword } from "firebase/auth";
import { SiFirebase } from 'react-icons/si'

const Login = (props) => {

    document.title = 'Finpak - Login'

    const { auth } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            
            // ...
          })
          .catch((error) => {
            console.log(error.code);
            (() =>
                        {switch(error.code) {
                            case 'auth/invalid-email':
                                return setError('Hibás vagy ismeretlen e-mail cím!');
                            case 'auth/internal-error':
                                return setError('Hibás vagy hiányzó adatok!');
                            case 'auth/wrong-password':
                                return setError('Hibás jelszó!');
                            case 'auth/too-many-requests':
                                return setError('Túl sok próbálkozás');
                            case 'auth/user-not-found':
                                return setError('Ismeretlen felhasználó!')
                            default:
                                setError('');
                        }})() 

          });
    }

    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <form onSubmit={onSignIn} className="flex flex-col items-center justify-center bg-white dark:bg-gray-700 p-10 rounded-xl">
                <p className="text-4xl text-slate-600 dark:text-slate-400 font-bold mb-10">Belépés</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='E-mail cím' type="email" className={`input-box ${error === '' ? '' : 'ring-2 ring-pink-500 text-pink-500'}`} />
                <p className="text-pink-500 mr-auto pl-4 text-xs mb-3">{error}</p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Jelszó' type="password" className="input-box mb-4" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white w-full rounded-full py-1">Bejelentkezés</button>
            </form>
            <span className='flex items-center justify-center mt-2 text-slate-600'><SiFirebase className='mr-1'/> Powered by Firebase</span>
            
        </div>
    )
}

export default Login
