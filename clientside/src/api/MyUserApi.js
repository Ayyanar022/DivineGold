import {useMutation, useQuery} from 'react-query'
import {useAuth0} from "@auth0/auth0-react";
import { toast} from 'react-toastify';
import { useEffect } from 'react';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//GET CURRENT USER
export const useGetMyUser = ()=>{
    const {getAccessTokenSilently,isAuthenticated} = useAuth0();

    const getMyUserRequest = async()=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/my/user`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"    
            }
        })
        if(!response.ok)throw new Error("Faild to fetch user ");
        return response.json()
    }

    const {data:currentUser,isLoading,error,refetch}= useQuery("fetchCurrentUser",getMyUserRequest,{enabled:isAuthenticated});
    if(error) toast.error(error.toString());    
    return {currentUser,isLoading,refetch}
}

// CREATE USER IF 1ST TIME LOGIN
export const useCreateMyUser = () =>{
const {getAccessTokenSilently } = useAuth0() 
  
    const createMyUserRequest = async (user)=>{
        const accessToken =await getAccessTokenSilently()
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/my/user`,{            
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

    const {mutateAsync:createUser,isLoading,isError,isSuccess} = useMutation(createMyUserRequest);
    return {
        createUser,isLoading,isError,isSuccess
    }
}

//UPDATE CURRENT USER
export const useUpdateMyUser = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const updateMyUserRequest = async (formData)=>{
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/my/user`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"   
            },
            body:JSON.stringify(formData),
        })
        if(!response)throw new Error("Faild to update user");        
        return response.json()
    }

    const {mutateAsync: updateUser, isLoading, isSuccess,error,reset} = useMutation(updateMyUserRequest);

    useEffect(()=>{
        if(error){
            toast.error(error.toString());
            reset()
        }
    },[error])

    return {updateUser,isLoading};
}



