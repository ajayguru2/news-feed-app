import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { useAuth } from "./context/Auth.context";
import { Article } from "./pages/Article";
import { EditArticle } from "./pages/EditArticle";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { NewArticle } from "./pages/NewArticle";
import { SingupPage } from "./pages/Singup";

const Protected: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { token, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return <Loader />;
    }

    if (!token || !children) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children as any;
};

const App = () => {
    return (
        <>
            <Header />
            <ErrorBoundary>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <Protected>
                                <Home />
                            </Protected>
                        }
                    />
                    <Route
                        path="/articles/new"
                        element={
                            <Protected>
                                <NewArticle />
                            </Protected>
                        }
                    />
                    <Route
                        path="/articles/:id"
                        element={
                            <Protected>
                                <Article />
                            </Protected>
                        }
                    />
                    <Route
                        path="/articles/:id/edit"
                        element={
                            <Protected>
                                <EditArticle />
                            </Protected>
                        }
                    />
                    <Route path="/signup" element={<SingupPage />} />
                </Routes>
            </ErrorBoundary>
        </>
    );
};

export default App;
