import React, { ReactNode, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, loginUser } from "../api";
import { Loader } from "../components/Loader";
import { Role, User } from "../types";

type AuthContextType = {
    user?: User;
    login?: (a: string, b: string) => Promise<void>;
    logout: () => void;
    isLoggedIn?: boolean;
    isLoading?: boolean;
    token?: string | null;
    setToken?: React.Dispatch<React.SetStateAction<string | null>>;
    isAdmin?: boolean;
};

const DEFAULT_VALUE = {
    logout: () => {},
    isLoggedIn: false,
    token: null,
};

const AuthContext = createContext<AuthContextType>(DEFAULT_VALUE);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<User>();
    const navigate = useNavigate();

    const updateToken = (val: string) => {
        setToken(val);
        localStorage.setItem("token", val);
    };

    const verifyToken = async (token: string) => {
        const user = await getUser(token);
        setUser(user);
    };

    const login = async (email: string, password: string) => {
        const { token } = await loginUser(email, password);
        updateToken(token);
        await verifyToken(token);
        navigate("/");
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const authenticate = async () => {
            setIsLoading(true);
            if (!token) {
                const tokenFromStorage = localStorage.getItem("token");
                if (tokenFromStorage) {
                    setToken(tokenFromStorage);
                    await verifyToken(tokenFromStorage);
                }
            }
            setIsLoading(false);
        };
        authenticate();
    }, [token]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isLoggedIn: !!token,
                login,
                logout,
                setToken,
                user,
                isAdmin: user?.roles?.includes(Role.Admin),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    console.log(context);
    return context;
};

export { AuthProvider, useAuth };
