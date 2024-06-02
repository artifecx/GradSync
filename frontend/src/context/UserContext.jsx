import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = React.createContext();

const UserContext = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState({ status: false, message: "" });
    const [user, setUser] = useState({});

    const handleFetchMe = async () => {
        setUserLoading(true);
        try {
            const response = await axios.get(
                `https://grad-sync-backend.vercel.app/api/v1/auth/me`,
                { withCredentials: true }
            );
            setUserError({ status: false, message: "" });
            const modifiedUser = {
                ...response.data.result,
                user_type: response.data.result.user_type === 1 
                    ? "applicant" 
                    : (response.data.result.user_type === 2 
                        ? "recruiter" 
                        : "admin")
            };
            
            setUser(modifiedUser);
        } catch (error) {
            setUserError({ status: true, message: error?.message });
            setUser({ status: false });
        }
        setUserLoading(false);
    };

    useEffect(() => {
        handleFetchMe();
    }, []);

    const passing = { userLoading, userError, user, handleFetchMe };
    return (
        <userContext.Provider value={passing}>{children}</userContext.Provider>
    );
};

const useUserContext = () => useContext(userContext);

export { useUserContext, UserContext };
