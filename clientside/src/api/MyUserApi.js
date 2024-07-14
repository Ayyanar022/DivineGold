import {useMutation} from 'react-query'
import {useAuth0} from "@auth0/auth0-react";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useCreateMyUser = () =>{
const {getAccessTokenSilently } = useAuth0() 
  
    const createMyUserRequest = async (user)=>{
        console.log("user--",user)
        const accessToken =await getAccessTokenSilently()
        const response = await fetch(`http://localhost:7000/api/my/user`,{
            // const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"   
            },
            body:JSON.stringify(user),
        })

        if(!response.ok){
            throw new Error("Faild to create user..!")
        }
    };

    const {mutateAsync:createUser,isLoading,isError,isSuccess} = useMutation(createMyUserRequest)

    return {
        createUser,isLoading,isError,isSuccess
    }
}


export const useUpdateMyUser = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const updateMyUserRequest = async (formData)=>{
        const accessToken = await getAccessTokenSilently()
        console.log("accessToken",accessToken)
        const response = await fetch(`http://localhost:7000/api/my/user`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"   
            },
            body:JSON.stringify(formData),
        })

        if(!response)throw new Error("Faild to update user")
        
        return response.json()
    }

    const {mutateAsync: updateUser, isLoading, isSuccess,isError,error,reset} = useMutation(updateMyUserRequest);

    return {updateUser,isLoading};
}



