import { createContext, useState } from "react";
// import { baseUrl } from "./baseUrl";
import { baseUrl } from "../baseUrl";

export const AppContext = createContext();

// creating the provider---by default children
export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  // data filling pending
  async function fetchBlogPosts(page = 1) {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    try {
      const result = await fetch(url);
      // whatever the data we are getting we need to convert it into the json format
      const data = await result.json();
      // console.log();
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("error in fetching data", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(page) {
    setPage(page);
    fetchBlogPosts(page);
  }

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    handlePageChange, // Added handlePageChange to the context value
    fetchBlogPosts, // Added fetchBlogPosts to the context value for manual fetching if needed
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
