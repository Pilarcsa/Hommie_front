import { fetchApi } from "../endpoint-service";
import { endPoints } from "../endpoint-service";


// Ruta: GET /post/feed → obtiene todos los posts del feed
export const getAllPost = async () =>{ return await fetchApi({endPoint : endPoints.post.getAllPost, method: "GET"}) }

// Ruta: POST /post → crea un nuevo post
export const createPost = async (data) =>{ return await fetchApi({endPoint : endPoints.post.createPost, method: "POST", data}) }

// Ruta: GET /post/:id → obtiene un post por su ID
export const getPostsByUserId = async (userId) =>{ if (!userId) throw new Error("getPostsByUserId requiere userId"); return await fetchApi({ endPoint : endPoints.post.getPostsByUserId(userId), method: "GET" })};


// Ruta: PATCH /post/:id → actualiza un post existente
export const updatePostById = async (postId, data) =>{ return await fetchApi({ endPoint: endPoints.post.updatePostById(postId), method: "PATCH", data })}

// Ruta: DELETE /post/:id → elimina un post por su ID
export const deletePostById = async (postId) =>{ return await fetchApi({ endPoint: endPoints.post.deletePostById(postId), method: "DELETE" })}
