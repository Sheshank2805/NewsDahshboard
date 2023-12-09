import React from "react";
import { useParams } from "react-router-dom";

function NewsItem({ articles, selectedArticle }) {
  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    source,
    author,
    publishedAt,
    url,
    urlToImage,
    content,
  } = article;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-sm lg:max-w-[1200px] rounded overflow-hidden shadow-lg m-4 h-full">
        <div className="lg:flex lg:flex-row lg:flex-nowrap h-full">
          {urlToImage && (
            <img
              className="lg:w-1/3 lg:h-full lg:object-cover w-full"
              src={urlToImage}
              alt={title}
              style={{ maxHeight: "200px" }}
            />
          )}
          <div className="lg:w-2/3 lg:pl-4 h-full bg-gray-300">
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-2">{title}</div>
              <p className="text-base text-blue-700">{description}</p>
              <p className=" text-gray-400">Source: {source.name}</p>
              <p>Author: {author}</p>
              <p>Published At: {publishedAt}</p>
            </div>
            <div className="px-6 py-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-red-700 translate-x-2 text-white font-bold py-2 px-4 rounded"
              >
                Read full article
              </a>
            </div>
            {content && (
              <div className="px-6 py-4">
                <p className="text-gray-700 font-bold text-base">{content}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
