import React from "react";
import { useNavigate } from "react-router-dom";
import { createArticle, deleteArticleFromApi, updateArticle } from "../api";
import { useAuth } from "../context/Auth.context";
import { Article } from "../types";

export const ArticleForm: React.FC<{
    defaultValues?: Article;
    id?: string;
}> = ({ defaultValues, id }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    if (!token) {
        navigate("/");
    }

    const text = defaultValues ? "Edit" : "Create";
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        const { title, body, imageUrl } = e.target as typeof e.target & {
            title: { value: string };
            body: { value: string };
            imageUrl: { value: string };
        };

        const payload = {
            ...(defaultValues?.uuid && { uuid: defaultValues?.uuid }),
            title: title.value,
            body: body.value,
            description: body.value,
            imageUrl: imageUrl.value,
        };

        const resp = defaultValues?.uuid
            ? await updateArticle(payload)
            : await createArticle(payload);
        const { _id } = resp;
        navigate(`/articles/${_id}`);
    };

    const deleteArticle = async (): Promise<void> => {
        if (defaultValues?._id) {
            console.log("deleteArticle called with id: ", defaultValues?._id);
            deleteArticleFromApi(defaultValues?._id);
            navigate("/");
        }
    };

    return (
        <main>
            <h2>{text} Article</h2>
            <form
                className="editArticleForm"
                key={id || "new"}
                onSubmit={handleSubmit}
            >
                <label htmlFor="title">Title</label>
                <input
                    defaultValue={defaultValues?.title}
                    type="text"
                    name="title"
                    id="title"
                />
                <label htmlFor="body">Body</label>
                <textarea
                    rows={16}
                    defaultValue={defaultValues?.body}
                    name="body"
                    id="body"
                />
                <label htmlFor="imageUrl">Image URL</label>
                <input
                    defaultValue={defaultValues?.imageUrl}
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                />
                <div className="button-container">
                    <button type="submit" className="submit-button">
                        Save
                    </button>
                    <button
                        type="reset"
                        className="delete-button"
                        onClick={deleteArticle}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </main>
    );
};
