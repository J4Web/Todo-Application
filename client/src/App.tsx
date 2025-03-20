import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AuthContainer from "./components/Login";
import UserProfile from "./components/UserProfile";
import { User, LogIn } from "lucide-react";
import { registerUser, loginUser } from "./api/user";
import { SnackBarProvider } from "./components/Snackbarmanager";
import { getTodosForUser } from "./api/todo";
import Cookies from "js-cookie";
import useIsLogged from "./hooks/useLoggedIn";
import { jwtDecode } from "jwt-decode";

// ✅ Corrected User Interface
interface User {
  id: string;
  username: string;
  password?: string;
}

interface AuthData {
  username: string;
  password: string;
}

interface AuthResponse {
  ok: boolean;
  message: string;
  result: {
    auth_token: string;
    user: {
      username: string;
      id: string;
    };
  };
}

const App: React.FC = () => {
  const isLogged = useIsLogged();
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  // ✅ Corrected `useEffect` Hook
  useEffect(() => {
    const token = Cookies.get("auth_token"); // Ensure consistent key name

    if (token) {
      try {
        // Decode the JWT token to get user data
        const decoded: { username: string; id: string } = jwtDecode(token);

        if (decoded?.username) {
          setUser({ id: decoded.id, username: decoded.username });

          // Fetch todos for the logged-in user
          getTodosForUser(decoded.username)
            .then(setTodos)
            .catch((error) => console.error("Error fetching todos:", error));
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
        setTodos([]);
      }
    } else {
      setUser(null);
      setTodos([]);
    }
  }, [isLogged]);

  // ✅ Fixed Type Issues in `handleLogin`
  const handleLogin = async (userData: AuthData) => {
    try {
      const loggedInUser: AuthResponse = await loginUser(userData);

      if (loggedInUser.ok) {
        Cookies.set("auth_token", loggedInUser.result.auth_token, {
          secure: true,
          sameSite: "Strict",
        });

        setUser(loggedInUser.result.user);
        const userTodos = await getTodosForUser(
          loggedInUser.result.user.username
        );
        setTodos(userTodos);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // ✅ Fixed `handleSignup`
  const handleSignup = async (userData: AuthData) => {
    try {
      await registerUser(userData);
      alert("Signup successful! Please log in.");
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error("Signup failed:", error);
    }
  };

  // ✅ Ensured Logout Clears Todos
  const handleLogout = () => {
    Cookies.remove("auth_token");
    setUser(null);
    setTodos([]); // Clear todos on logout
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Todo App</h1>
          {isLogged && user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <User size={18} /> {user.username}
              </button>
              <button onClick={handleLogout} className="text-red-500">
                Logout
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
        {!isLogged ? (
          <AuthContainer onLogin={handleLogin} onSignup={handleSignup} />
        ) : showProfile ? (
          <UserProfile
            user={user}
            todos={todos}
            onLogout={handleLogout}
            onClose={() => setShowProfile(false)}
          />
        ) : (
          <SnackBarProvider>
            <TodoList
              initialTodos={todos}
              onTodosChange={setTodos}
              currentUser={user}
              onNewTodo={(newTodo) => setTodos([...todos, newTodo])}
            />
          </SnackBarProvider>
        )}
      </main>
    </div>
  );
};

export default App;
