import { createContext, useContext, useState, useMemo } from "react";
import { login } from "../service/api/user-api-service";


const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);
    const loginUser = async (data) => {

        const result = await login(data);
        if (result?.mensaje === "Inicio de sesión exitoso") {
            setUser(result.data.user);
        } else {
            setError(true)
        }
        return result.data.message;
    };

    const value = useMemo(() => ({ user, setUser, loginUser, error }), [user, error]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

