import { useAuth0 } from "@auth0/auth0-react"
import { useCreateMyUser } from "../api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'


const AuthCallBack = () => {
    const { user } = useAuth0()
    const { createUser } = useCreateMyUser();
    const navigate = useNavigate()
    const hasUserCreated = useRef(false)

    useEffect(() => {
        // its for creating user in our database 
        if (user?.sub && user?.email && !hasUserCreated.current) {
            createUser({ auth0Id: user?.sub, email: user.email });
            hasUserCreated.current = true
        }
        navigate("/")
    }, [createUser, navigate, user])

    return <>Loading...</>
}

export default AuthCallBack
