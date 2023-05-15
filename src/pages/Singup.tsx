import React from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api";

export const SingupPage = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = React.useState<boolean>(true);
    return (
        <main>
            <h3>Singup!</h3>
            <form
                className="loginForm"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const { email, password, name } =
                        e.target as typeof e.target & {
                            email: { value: string };
                            password: { value: string };
                            name: { value: string };
                        };
                    await manageUser(isAdmin, email, password, name);
                    navigate("/");
                }}
            >
                <input name="name" type="text" placeholder="Name" />
                <input name="email" type="text" placeholder="Email" />
                <input name="password" type="password" placeholder="Password" />
                <button type="submit" className="submit-button">
                    Signup
                </button>
            </form>
        </main>
    );
};

async function manageUser(
    isAdmin: boolean,
    email: { value: string },
    password: { value: string },
    name: { value: string }
) {
    if (isAdmin) {
        await createUser(email.value, password.value, name.value);
    } else {
        await createUser(email.value, password.value, name.value);
    }
}
