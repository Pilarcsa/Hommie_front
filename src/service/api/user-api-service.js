import { fetchApi } from "../endpoint-service";
import { endPoints } from "../endpoint-service";

// Ruta: POST /auth/login → inicia sesión y obtiene el token JWT
export const login = async (data) =>{ return await fetchApi({endPoint : endPoints.users.login, method: "POST", data}) }

