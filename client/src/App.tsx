import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AuthContainer from "./components/Login";
import UserProfile from "./components/UserProfile";
import { User, LogIn } from "lucide-react";
import { registerUser, loginUser } from "./api/user";
import { SnackBarProvider } from "./components/Snackbarmanager";
import Cookies from "js-cookie";

interface User {
    id: string;
    username: string;
    password: string;
}

interface AuthData {
    name: string;
    password: string;
}

const MOCK_USERS: User[] = [
    { id: "1", username: "Jane Doe", password: "jane@example.com" },
    { id: "2", username: "John Smith", password: "john@example.com" },
    { id: "3", username: "Alex Johnson", password: "alex@example.com" },
    { id: "4", username: "Sam Wilson", password: "sam@example.com" },
    { id: "5", username: "Pat Miller", password: "pat@example.com" },
];

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [todos, setTodos] = useState<any[]>([]); // Replace `any` with a proper `Todo` type when defined
    const [showProfile, setShowProfile] = useState<boolean>(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("todoAppUser");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogin = async (userData: AuthData) => {
        try {
            const loggedInUser = await loginUser(userData);
            if (loggedInUser.ok) {
                Cookies.set("authToken", loggedInUser.token, { secure: true, sameSite: "Strict" });
            }
            setUser(loggedInUser);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleSignup = async (userData: AuthData) => {
        try {
            const newUser: User = await registerUser(userData);
            success("Signup successful! Please log in.");
            setShowLoginModal(true);
        } catch (error) {
            error("Signup failed. Please try again.");
            console.error("Signup failed:", error);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("todoAppUser");
        setShowProfile(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Todo App</h1>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                <User size={18} /> {user.username}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-600">
                            <LogIn size={18} /> Login to manage todos
                        </div>
                    )}
                </div>
            </nav>

            <main className="py-8">
                {!user ? (
                    <AuthContainer onLogin={handleLogin} onSignup={handleSignup} />
                ) : showProfile ? (
                    <UserProfile user={user} todos={todos} onLogout={handleLogout} onClose={() => setShowProfile(false)} />
                ) : (
                    <SnackBarProvider>
                        <TodoList initialTodos={todos} onTodosChange={setTodos} currentUser={user} users={MOCK_USERS} />
                    </SnackBarProvider>
                )}
            </main>
        </div>
    );
};

export default App;
