import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function NewsList({
  articles,
  searchTerm,
  handleSearch,
  currentPage,
  paginate,
  articlesPerPage,
  totalArticles,
}) {
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <div className="news-list">
      <input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
      />
      {currentArticles.map((article, index) => (
        <div key={index}>
          <h2 className="text-xl font-bold mb-2">{article.title}</h2>
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-auto rounded-md mb-4"
          />
          <p className="text-gray-700 mb-2">{article.description}</p>
          <Link to={`/news/${indexOfFirstArticle + index}`}>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Read more
            </button>
          </Link>
        </div>
      ))}
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={totalArticles}
        paginate={paginate}
        className="mt-4"
      />
    </div>
  );
}

export default NewsList;
