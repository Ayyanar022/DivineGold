import {  createContext, useContext, useState } from "react";


const UserConetxt = createContext(null);

export const UserProvider = ({children})=>{
    const [currentUserData,setCurrentUserData] = useState([]);

    return(
        <UserConetxt.Provider value={{currentUserData,setCurrentUserData}} >
            {children}
        </UserConetxt.Provider>
    )
}


// custom hook for use the useContext
export const useCurrentUserConetxt = ()=>{
    return useContext(UserConetxt);
}
