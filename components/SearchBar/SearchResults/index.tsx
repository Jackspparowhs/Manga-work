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

  const title = attributes?.title 
    ? (attributes.title.en || Object.values(attributes.title)[0]) 
    : "No Title";
  
  // Safely find cover
  const cover = relationships.find((item) => item.type === "cover_art");
  const filename = cover?.attributes?.fileName;

  // Build URL safely
  const cover_url = filename
    ? `https://uploads.mangadex.org/covers/${id}/${filename}.256.jpg`
    : null;

  return (
    <Link
      href={`/manga/${id}`}
      className={classname(
        "block w-full mb-2 p-2 rounded-md transition-colors",
        theme === "LIGHT" ? "hover:bg-gray-100" : "hover:bg-gray-800"
      )}
    >
      <li className="flex flex-row items-start gap-3 h-20">
        {/* IMAGE BOX */}
        <div className="w-14 h-full flex-shrink-0 rounded overflow-hidden bg-gray-700 relative">
            {cover_url ? (
                <img
                    src={cover_url}
                    alt="cover"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.classList.add('bg-red-500'); // Debug: turns red if image fails
                    }}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 bg-gray-800">
                  N/A
                </div>
            )}
        </div>

        {/* TEXT INFO */}
        <div className="flex flex-col justify-center h-full overflow-hidden">
          <span className={classname(
              "font-bold text-sm truncate w-48 block",
              theme === "LIGHT" ? "text-gray-900" : "text-white"
            )}>
            {title}
          </span>
          <span className="text-xs text-blue-500 mt-1 capitalize">
            {attributes?.status || "Unknown"}
          </span>
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
        <div className={classname(
          "absolute top-14 left-0 w-full z-50 rounded-b-lg shadow-xl border-t h-20 flex items-center justify-center",
           theme === "LIGHT" ? "bg-white border-gray-200" : "bg-[#1a1a1a] border-gray-800"
        )}>
          <Spinner />
        </div>
     )
  }

  if (!results || results.length === 0) return null;

  return (
    <div
      className={classname(
        "absolute top-14 left-0 w-full z-50 rounded-b-lg shadow-2xl overflow-hidden border-t flex flex-col",
         theme === "LIGHT" ? "bg-white border-gray-200" : "bg-[#1a1a1a] border-gray-800"
      )}
      style={{ maxHeight: "60vh", overflowY: "auto" }}
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
