

// Define los posibles entornos (local y remoto)
const points = {
    "x1": "http://localhost:3000/api",
    "x2": "https://hommie.onrender.com/api"
}

const BASE_URL = import.meta.env.VITE_API_BASE  || points.x2 // Base URL actual para las peticiones

// Definición de todos los endpoints de la API
export const endPoints = {

    users: {
        // Ruta: POST /auth/login → inicio de sesión
        login: "/auth/login",
        // Ruta: GET /user/user-profile/:id → obtiene el perfil del usuario
        userProfile: "/user/user-profile",
    },
    post: {
        // Ruta: POST /post → crear un nuevo post
        createPost: "/post",
        // Ruta: GET /post/feed → obtener todos los posts
        getAllPost: "/post/feed",
        // Ruta: GET /post/:id → obtener un post por ID
        postById: "/post/",
        // Ruta: GET /post/me → obtener los posts del usuario autenticado
       // getMyPosts: "/post/me",
        // Ruta dinámica: /post/:id → usada para PATCH o DELETE
        byId: (id) => `/post/${id}`, 
    }
}

// Configura los headers y cuerpo de cada petición HTTP
const config = ({ method, data }) => {
    const baseConfig = {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    }
    if (method !== "GET" && data) {
        baseConfig.body = JSON.stringify(data)
    }
    return baseConfig
}

// Función genérica para consumir la API usando fetch
export async function fetchApi({ endPoint, method, data }) {
    try {
        const response = await fetch(BASE_URL + endPoint, config({ method, data }))
        return await response.json()
    } catch (error) {
        throw error
    }
}

