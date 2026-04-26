import { createContext, useContext, useState, useMemo } from "react";
import { login } from "../service/api/user-api-service";

// Creamos un contexto para manejar el estado global del usuario
const UserContext = createContext();

// Componente proveedor que envuelve la app o parte de ella
export const UserProvider = ({ children }) => {

    // Estado para manejar errores en el login
    const [error, setError] = useState(false);

    // Estado para almacenar los datos del usuario autenticado
    const [user, setUser] = useState(null);

    // Función para hacer login
    const loginUser = async (data) => {

        // Llamada a la API de login con los datos del formulario
        const result = await login(data);

        // Si el backend responde con éxito
        if (result?.mensaje === "Inicio de sesión exitoso") {

            // Guardamos el usuario en el estado global
            setUser(result.data.user);

        } else {

            // Si hay error, activamos el estado de error
            setError(true)
        }

        // Devolvemos el mensaje de la respuesta (útil para mostrar feedback)
        return result.data.message;
    };

    // Memoriza el valor del contexto para evitar renders innecesarios
    const value = useMemo(
        () => ({ user, setUser, loginUser, error }),
        [user, error]
    );

    // Proveedor del contexto que envuelve los componentes hijos
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para consumir el contexto fácilmente
export const useUserContext = () => useContext(UserContext);