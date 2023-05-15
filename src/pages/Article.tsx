import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getArticle } from "../api";
import { Loader } from "../components/Loader";

export const Article = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const { data: article, isLoading } = useSWR(`articles/${id}`, () => {
        if (!id) return;
        return getArticle(id);
    });

    if (isLoading) {
        return <Loader />;
    }

    if (!article) {
        navigate("/");
        return null;
    }

    const updatedDate = new Date(
        article.updatedAt || article.createdAt
    ).toLocaleDateString();

    return (
        <main>
            <img width={"400"} src={article.imageUrl} alt={article.title} />
            <h2 className="mb-0">{article.title}</h2>
            <p className="mt-0">
                Written by: {article.createdBy?.name} | Last updated on{" "}
                {updatedDate}
            </p>
            <p>{article.body}</p>
        </main>
    );
};
