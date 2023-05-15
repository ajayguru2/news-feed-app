import useSWR from "swr";
import { fetchArticles } from "../api";
import { ArticleView } from "../components/ArticleView";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/Auth.context";

export const Articles = () => {
    const { user } = useAuth();
    const { data, isLoading } = useSWR("articles", fetchArticles);
    const articles = data?.articles || [];

    return (
        <main>
            <h3>Articles</h3>
            {isLoading && <Loader />}
            {articles.map((article) => (
                <ArticleView key={article._id} article={article} />
            ))}
        </main>
    );
};
