/* eslint-disable @next/next/no-img-element */
import { type FC } from "react";
import Link from "next/link";
import classname from "classnames";
import Spinner from "./spinner";
import { type Manga } from "../../utils/Manga";

interface SearchResultsProps {
  theme: "LIGHT" | "DARK";
  loading: boolean;
  results: Manga[];
  changeSearchText: (value: string) => void;
}

const ResultItem: FC<{ manga: Manga; theme: "LIGHT" | "DARK" }> = ({
  manga,
  theme,
}) => {
  const { id, attributes, relationships } = manga;

  // Safely get title and status
  const title = attributes?.title 
    ? (attributes.title.en || Object.values(attributes.title)[0]) 
    : "No Title";
  const status = attributes?.status || "Unknown";

  // Safely find cover and author
  const cover = relationships.find((item) => item.type === "cover_art");
  const author = relationships.find((item) => item.type === "author");

  const filename = cover?.attributes?.fileName;
  const author_name = author?.attributes?.name;

  // Build the image URL
  const cover_url = filename
    ? `https://uploads.mangadex.org/covers/${id}/${filename}.256.jpg`
    : null;

  return (
    <Link
      href={`/manga/${id}`}
      className={classname(
        "block w-full mb-1 rounded-md transition-colors",
        theme === "LIGHT" ? "hover:bg-gray-100" : "hover:bg-gray-800"
      )}
    >
      <li className="flex flex-row items-center p-2 gap-3">
        {/* Image Container - Fixed size and object-cover ensures photo always shows */}
        <div className="w-12 h-16 sm:w-14 sm:h-20 flex-shrink-0 bg-gray-700 rounded overflow-hidden relative border border-gray-600">
            {cover_url ? (
                <img
                    src={cover_url}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 text-center">
                  No Img
                </div>
            )}
        </div>

        {/* Text Info */}
        <div className="flex flex-col flex-1 min-w-0">
          <span
            className={classname(
              "font-semibold text-sm truncate w-full block leading-tight",
              theme === "LIGHT" ? "text-gray-900" : "text-white"
            )}
          >
            {title}
          </span>
          <span className="text-xs text-gray-500 truncate mt-1">
            {author_name || "Unknown Author"}
          </span>
          <div className="flex items-center mt-1">
             <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-blue-600 text-white">
                {status}
             </span>
          </div>
        </div>
      </li>
    </Link>
  );
};

const SearchResults: FC<SearchResultsProps> = ({
  loading,
  results,
  theme,
}) => {
  if (loading) {
     return (
        <div
        className={classname(
          "absolute top-full left-0 w-full z-50 rounded-b-lg border-t shadow-xl overflow-hidden",
           theme === "LIGHT" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
        )}
      >
        <div className="flex items-center justify-center h-16">
          <Spinner />
        </div>
      </div>
     )
  }

  // If no results, don't show anything
  if (!results || results.length === 0) return null;

  return (
    <div
      className={classname(
        "absolute top-full left-0 flex flex-col w-full z-50 rounded-b-lg shadow-2xl overflow-hidden border-t",
         theme === "LIGHT" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
      )}
      style={{
        maxHeight: "60vh",
        overflowY: "auto"
      }}
    >
        <ul className="flex flex-col p-2">
          {results.map((result: any) => (
            <ResultItem key={result.id} manga={result} theme={theme} />
          ))}
        </ul>
    </div>
  );
};

export default SearchResults;
