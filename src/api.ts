import { Article, ArticleListResponse, ArticleRequest, User } from "./types";

const BASE_URL = process.env.REACT_APP_API_URL;

const getHeaders = (token?: string) => {
    const newToken = token || localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(newToken && { Authorization: `Bearer ${newToken}` }),
    };
};

const loginUser = async (email: string, password: string) => {
    const resp = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await resp.json();
    return data;
};

const registerAdmin = async (email: string, password: string) => {
    const resp = await fetch(`${BASE_URL}/auth/register-admin`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
    });
    const data: ArticleListResponse = await resp.json();
    return data;
};

const fetchArticles = async (): Promise<ArticleListResponse> => {
    const resp = await fetch(`${BASE_URL}/articles`, {
        headers: getHeaders(),
    });
    const data = await resp.json();
    console.log("Fetch Articles" + JSON.stringify(data));
    if (data?.httpsCode === 401) {
        console.log("401");
        throw new Error(data.message);
    }
    return {
        articles: data,
        articlesCount: data.articlesCount,
    };
};

const getArticle = async (id: string) => {
    const resp = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "GET",
        headers: getHeaders(),
    });
    const data: Article = await resp.json();
    return data;
};

const createArticle = async (article: ArticleRequest) => {
    const resp = await fetch(`${BASE_URL}/articles`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(article),
    });
    const data: Article = await resp.json();
    return data;
};

const updateArticle = async (article: ArticleRequest) => {
    const resp = await fetch(`${BASE_URL}/articles/${article.uuid}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(article),
    });
    const data: Article = await resp.json();
    return data;
};

const getUser = async (token: string): Promise<User> => {
    const resp = await fetch(`${BASE_URL}/auth/me`, {
        method: "POST",
        headers: getHeaders(token),
    });
    return resp.json();
};

const deleteArticleFromApi = async (id: string) => {
    const resp = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    const data: Article = await resp.json();
    return data;
};

const createUser = async (email: string, password: string, name: string) => {
    console.log(
        "Create User called with " + email + " " + password + " " + name
    );
    const resp = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password }),
    });
    const data = await resp.json();
    return data;
};

const createAdmin = async (email: string, password: string, name: string) => {
    console.log(
        "Create Admin called with " + email + " " + password + " " + name
    );

    const resp = await fetch(`${BASE_URL}/auth/register-admin`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password }),
    });
    const data = await resp.json();
    return data;
};

export {
    createAdmin,
    createArticle,
    createUser,
    deleteArticleFromApi,
    fetchArticles,
    getArticle,
    getUser,
    loginUser,
    registerAdmin,
    updateArticle,
};
