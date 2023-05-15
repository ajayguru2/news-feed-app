import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

export const Header = () => {
    const { token, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <div className="header">
                <h3
                    className="mainLogo"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    News Feed
                </h3>
                <div className="navItems">
                    {isAdmin && (
                        <p
                            onClick={() => {
                                navigate("/articles/new");
                            }}
                        >
                            New Article
                        </p>
                    )}
                    {token && <p onClick={logout}>Logout</p>}
                </div>
            </div>
            <hr />
        </>
    );
};
