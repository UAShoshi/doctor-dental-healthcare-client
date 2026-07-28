import { createContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const AuthInf = {
        user,
        loading
    }
    return (
        <AuthContext.Provider value={AuthInf}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;