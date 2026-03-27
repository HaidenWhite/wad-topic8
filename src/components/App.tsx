import { useState, useEffect } from "react";
import Login from "./Login";

export default function App() {
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        GetLogin();
    }, []);
    const handleLoginSuccess = (username: string) => {
        setUser(username);
    };
    const Logout = async() => {
        try {
            const response = await fetch("/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            if (data.loggedout) {
                setUser(null);
            }
        } catch (e) {
            alert("Logout error: " + e);
        }
    };
    const GetLogin = async() => {
        try {
            const response = await fetch("/login", {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            if (data.username) {
                setUser(data.username);
            } else {
                setUser(null);
            }
        } catch (e) {
            alert("Error checking the login: " + e);
        }
    };
    return (
        <div>
            {user !== null ? (
                <div>
                    <p>You are logged in as <strong>{user}</strong>.</p>
                    <button id="logout" onClick={Logout}>Logout</button>
                </div>
            ) : (
                <Login onLoggedIn={handleLoginSuccess} />
            )}
        </div>
    );
};