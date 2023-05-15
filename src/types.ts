export type ArticleRequest = {
    title: string;
    description: string;
    body: string;
    imageUrl: string;
    uuid?: string;
};

export type ArticleUpdateRequest = {
    uuid: string;
    title?: string;
    description?: string;
    body?: string;
    imageUrl?: string;
};

export type Article = {
    _id: string;
    uuid: string;
    title: string;
    description: string;
    body: any;
    imageUrl?: string;
    createdAt: Date;
    updatedAt?: Date;
    createdBy: {
        name: string;
        email: string;
    };
    updatedBy?: {
        name: string;
        email: string;
    };
};

export type ArticleListResponse = {
    articles: Article[];
    articlesCount: number;
};

export type User = {
    name: string;
    email: string;
    password: string;
    roles?: Role[];
};

export enum Role {
    User = "user",
    Admin = "admin",
}
