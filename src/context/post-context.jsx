import { createContext, useContext, useState } from "react";

const PostContext = createContext()
 

export const PostProvider = ({ children }) => {
   
    const [post, setPost] = useState(null)
    const postUser = async (fields) => {
        try {
            const response = await fetch("http://localhost:3000/api/post/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(fields)
            })
            const result = await response.json();
            setPost(result)

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <useContext.Provider value={{ post, setPost, postUser }}>{children}</useContext.Provider>


    )


}

export const usePostContext = () => useContext(PostContext) 

/*
import { createContext, useContext, useState } from "react";

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);

  const postUser = async (fields) => {
    try {
      const response = await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(fields),
      });
      const result = await response.json();
      setPost(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider value={{ post, setPost, postUser }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);*/

