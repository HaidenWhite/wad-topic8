import { useState } from "react";
import Login from "./Login";

export default function App() {
    const [user, setUser] = useState<string | null>(null);
    const handleLoginSuccess = (username: string) => {
        setUser(username);
    };
    return (
        <div>
            {user !== null ? (
                <p>You are logged in as <strong>{user}</strong>.</p>
            ) : (
                <Login onLoggedIn={handleLoginSuccess} />
            )}
        </div>
    );
};