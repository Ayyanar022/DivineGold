import {useMutation, useQuery} from 'react-query'
import {useAuth0} from "@auth0/auth0-react";
import { toast} from 'react-toastify';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useGetMyUser = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getMyUserRequest = async()=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`http://localhost:7000/api/my/user`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"    
            }
        })
        if(!response.ok)throw new Error("Faild to fetch user ");
        return response.json()
    }

    const {data:currentUser,isLoading,error}= useQuery("fetchCurrentUser",getMyUserRequest);
    if(error) toast.error(error.toString());    
    return {currentUser,isLoading}
}

export const useCreateMyUser = () =>{
const {getAccessTokenSilently } = useAuth0() 
  
    const createMyUserRequest = async (user)=>{
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

    const {mutateAsync: updateUser, isLoading, isSuccess,error,reset} = useMutation(updateMyUserRequest);

    if(isSuccess){
        toast.success('🦄 User profile updated..')
      }

    if(error){
        toast.error(error.toString());
        reset()
    }
    return {updateUser,isLoading};
}



