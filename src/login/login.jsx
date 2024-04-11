import React from 'react';
import './login.css'
import { AuthState } from './authState';


export function Login(props) {
    async function loginUser() {
        await loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        await loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const userName = document.querySelector('#userName')?.value;
        const password = document.querySelector('#userPassword')?.value;
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            localStorage.setItem('userName', userName);
            document.querySelector('#loginMessage').textContent = `Logged in as ${userName}`;
            //document.getElementById('displayedUser').textContent = userName;
            props.onAuthChange(userName, AuthState.Authenticated);
        }
    }

    async function getUser(email) {
        // See if we have a user with the given email.
        const response = await fetch(`/api/user/${email}`);
        if (response.status === 200) {
            return response.json();
        }

        return null;
    }

    return (
        <div>
            <main className="main">
                <section className="section">
                    <h1>Welcome!</h1>
                    <div id="loginMessage"></div>
                    <p>Please login to see upcoming trips!</p>
                    <div id="loginControls">
                        <div className="input-group mb-3">
                            <span className="input-group-text">@</span>
                            <input className="form-control" type="text" id="userName" placeholder="your@email.com" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">🔒</span>
                            <input className="form-control" type="password" id="userPassword" placeholder="password" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={loginUser}>Login</button>
                        <button type="button" className="btn btn-primary" onClick={createUser}>Create</button>
                    </div>
                </section>
            </main>

        </div>
    );
}

