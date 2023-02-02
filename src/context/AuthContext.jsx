import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{user: user, setUser: setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider };