import React from "react";
import { getArticle } from "../api";
import useSWR from "swr";
import { ArticleForm } from "../components/ArticleForm";
import { useParams } from "react-router-dom";

export const EditArticle = () => {
  const { id } = useParams<{ id?: string }>();
  const { data: article, isLoading } = useSWR(`articles/${id}`, () => {
    if (!id) return;
    return getArticle(id);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ArticleForm id={id} defaultValues={article} />;
};
