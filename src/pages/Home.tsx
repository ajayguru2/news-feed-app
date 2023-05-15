import { useAuth } from "../context/Auth.context";
import { Articles } from "./Articles";

export const Home = () => {
    const { user } = useAuth();

    return (
        <main>
            <h3>Welcome {user?.name}!</h3>
            <br />
            <Articles />
        </main>
    );
};
