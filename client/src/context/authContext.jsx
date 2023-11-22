// Importa los módulos necesarios de React y la función de solicitud de registro desde un archivo de autenticación externo.
import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

// Crea un contexto de autenticación utilizando createContext.
export const AuthContext = createContext();

// Hook personalizado que utiliza el contexto de autenticación.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Componente AuthProvider que gestiona el estado de autenticación y proporciona el contexto a sus hijos.
export const AuthProvider = ({ children }) => {
    // Define estados para el usuario, estado de autenticación y errores.
    const [user, setUser] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    // Función asincrónica para el registro de usuarios.
    const signup = async (user) => {
        try {
            // Realiza una solicitud de registro utilizando la función registerRequest.
            const res = await registerRequest(user)
            console.log(res.data)

            // Establece el usuario, marca como autenticado.
            setUser(res.data)
            setisAuthenticated(true);
        } catch (error) {
            // En caso de error, establece los errores en el estado.
            setErrors(error.response.data);
        }
    }
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setisAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            setErrors(error.response.data)
        }


    }
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setisAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data) return setisAuthenticated(false);
                setisAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setisAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    // Proporciona el contexto y sus valores a los componentes secundarios.
    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                user,
                loading,
                isAuthenticated,
                errors,

            }}>
            {children}
        </AuthContext.Provider>
    )
}