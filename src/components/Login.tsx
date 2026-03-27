import { useState } from 'react';

interface LoginInfo {
    username: string;
    password: string;
}

interface LoginProps {
    onLoggedIn: (username: string) => void;
}


export default function Login({onLoggedIn}: LoginProps) {
    const [data, setData] = useState<LoginInfo>({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                const result = await response.json();
                alert(`Login successful! ${data.username}`);
                onLoggedIn(data.username);
            } else if (response.status === 401) {
                alert("Details incorrect");
            } else if (response.status === 500) {
                alert("Server error");
            } else{
                alert("Unexpected error");
            }
        } catch (e) {
            setError("Login failed. Error: " + e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style ={{ maxWidth: 400, margin: 0}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12}}>
                    <label>Username</label>
                    <input
                        type="username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        style={{ width: "100%"}}
                    />
                </div>
                <div style={{ marginBottom : 12}}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        style={{ width: "100%"}}
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}