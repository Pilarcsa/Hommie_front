import { fetchApi } from "../endpoint-service";
import { endPoints } from "../endpoint-service";

// Ruta: GET /post/feed → obtiene todos los posts del feed
export const getAllPost = async () =>{ return await fetchApi({endPoint : endPoints.post.getAllPost, method: "GET"}) }

// Ruta: POST /post → crea un nuevo post
export const createPost = async (data) =>{ return await fetchApi({endPoint : endPoints.post.createPost, method: "POST", data}) }

// Ruta: GET /post/:id → obtiene un post por su ID
export const postById = async (postId) =>{ return await fetchApi({endPoint : endPoints.post.replace(":id", postId), method: "GET"}) }

// Ruta: GET /post/me → obtiene los posts del usuario autenticado
export const getMyPosts = async () =>{ return await fetchApi({endPoint : endPoints.post.getMyPosts, method: "GET"}) }

// Ruta: PATCH /post/:id → actualiza un post existente
export const updatePostById = (postId, data) =>
  fetchApi({ endPoint: endPoints.post.byId(postId), method: "PATCH", data })

// Ruta: DELETE /post/:id → elimina un post por su ID
export const deletePostById = (postId) =>
  fetchApi({ endPoint: endPoints.post.byId(postId), method: "DELETE" })
