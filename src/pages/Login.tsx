import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <main>
            <h3>Login</h3>
            <form
                className="loginForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    const { email, password } = e.target as typeof e.target & {
                        email: { value: string };
                        password: { value: string };
                    };
                    login?.(email.value, password.value);
                }}
            >
                <input name="email" type="text" placeholder="Email" />
                <input name="password" type="password" placeholder="Password" />
                <button type="submit" className="sign-in-button">
                    Login
                </button>
                <button
                    type="button"
                    className="sign-up-button"
                    onClick={handleSignup}
                >
                    Sign Up
                </button>
            </form>
        </main>
    );
};
