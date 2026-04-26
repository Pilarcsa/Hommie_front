import { createContext, useContext, useState } from "react";

// Creamos el contexto para los posts
const PostContext = createContext();

export const PostProvider = ({ children }) => {

    // Estado para guardar el post creado o recibido
    const [post, setPost] = useState(null);

    // Función para enviar un post al backend
    const postUser = async (fields) => {
        try {
            // Petición HTTP al servidor
            const response = await fetch("http://localhost:3000/api/post/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                // Permite enviar cookies (por ejemplo, sesión)
                credentials: "include",

                // Convertimos los datos a JSON
                body: JSON.stringify(fields)
            });

            // Convertimos la respuesta a JSON
            const result = await response.json();
            // Guardamos el resultado en el estado
            setPost(result)
         // Manejo de errores en consola
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <useContext.Provider value={{ post, setPost, postUser }}>{children}</useContext.Provider>


    )

}
// Hook personalizado para usar el contexto fácilmente
export const usePostContext = () => useContext(PostContext) 


