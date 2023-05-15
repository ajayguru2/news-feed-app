import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";
import { Article } from "../types";

export const ArticleView: React.FC<{
    article: Article;
}> = ({ article }) => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { _id, title, imageUrl, body, createdBy, createdAt } = article;
    return (
        <>
            <div className={"articleView"} key={_id}>
                <div className="articleViewLeft">
                    <h3
                        onClick={() => {
                            navigate(`/articles/${_id}`);
                        }}
                    >
                        {title}
                    </h3>
                    <p className="articleViewBody">{body}</p>
                    <p className="articleViewFooter">
                        {createdBy.name} on{" "}
                        {new Date(createdAt).toLocaleDateString()}
                        {isAdmin && (
                            <>
                                | <Link to={`/articles/${_id}/edit`}>Edit</Link>
                            </>
                        )}
                    </p>
                </div>
                <img src={imageUrl} alt={title} />
            </div>
            <br />
        </>
    );
};
