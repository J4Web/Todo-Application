import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AuthContainer from "./components/Login";
import UserProfile from "./components/UserProfile";
import { User as UserAvatar, LogIn } from "lucide-react";
import { registerUser, loginUser } from "./api/user";
import { SnackBarProvider } from "./components/Snackbarmanager";
import { getTodosForUser } from "./api/todo";
import Cookies from "js-cookie";
import useIsLogged from "./hooks/useLoggedIn";
import { jwtDecode } from "jwt-decode";
import { Todo } from "./types";

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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (token) {
      try {
        const decoded: { username: string; id: string } = jwtDecode(token);

        if (decoded?.username) {
          setUser({ id: decoded.id, username: decoded.username });

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
    } catch (error: any) {
      debugger;
      alert(error.response.data.message);
      console.error("Login failed:", error);
    }
  };
  const handleSignup = async (userData: AuthData) => {
    try {
      await registerUser(userData);
      alert("Signup successful! Please log in.");
    } catch (error: any) {
      alert(error.response.data.message);
      console.error("Signup failed:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setUser(null);
    setTodos([]);
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
                <UserAvatar size={18} /> {user.username}
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
            user={user as any}
            todos={todos}
            onLogout={handleLogout}
            onClose={() => setShowProfile(false)}
          />
        ) : (
          <SnackBarProvider>
            <TodoList
              initialTodos={todos}
              onTodosChange={setTodos}
              currentUser={user as any}
              onNewTodo={(newTodo) => setTodos([...todos, newTodo])}
              onUpdateTodo={(updatedTodo) => {
                setTodos(
                  todos.map((todo) =>
                    todo.id === updatedTodo.id ? updatedTodo : todo
                  )
                );
              }}
            />
          </SnackBarProvider>
        )}
      </main>
    </div>
  );
};

export default App;
