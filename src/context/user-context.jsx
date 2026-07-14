import { createContext, useContext, useState, useMemo } from "react";
import { login } from "../service/api/user-api-service";
import { useNavigate } from "react-router-dom";
// Creamos un contexto para manejar el estado global del usuario
const UserContext = createContext();

// Componente proveedor que envuelve la app o parte de ella
export const UserProvider = ({ children }) => {

    // Estado para manejar errores en el login
    const [error, setError] = useState(false);

    // Estado para almacenar los datos del usuario autenticado
    const [user, setUser] = useState(() => {
        // Intenta recuperar el usuario guardado al iniciar la app
        const saved = localStorage.getItem('hommie_user')
        return saved ? JSON.parse(saved) : null
    })

    const navigate = useNavigate()

    // Función para hacer login

    const loginUser = async (data) => {
        const result = await login(data);
        if (result?.mensaje === "Inicio de sesión exitoso") {
            setUser(result.data.user);
            // Guardar en localStorage para que sobreviva a la recarga
            localStorage.setItem('hommie_user', JSON.stringify(result.data.user))
        } else {
            setError(true)
        }
        return result.data.message;
    };
    const logoutUser = () => {
        setUser(null)
        localStorage.removeItem('hommie_user')
        navigate('/login') // Redirige a la página de login
    }

    // Memoriza el valor del contexto para evitar renders innecesarios
    const value = useMemo(
        () => ({ user, setUser, loginUser, logoutUser, error }),
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