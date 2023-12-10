import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "./components/NewsList";
import NewsItem from "./components/NewsItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 5;
  const API_KEY = "5650d46434314c1f96d629cd4503a2e6";

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`
      );
      if (response.status === 200) {
        const fetchedArticles = response.data.articles;
        setArticles(response.data.articles);
        setFilteredArticles(response.data.articles);
        setTotalArticles(fetchedArticles.length);
      }
    } catch (error) {
      alert("Failed to fetch news");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="bg-slate-900 text-white w-full">News Dashboard</h1>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <NewsList
                articles={filteredArticles}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                currentPage={currentPage}
                paginate={paginate}
                articlesPerPage={articlesPerPage}
                totalArticles={totalArticles}
              />
            }
          />
          <Route
            path="/news/:index"
            element={<NewsItem articles={articles} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
