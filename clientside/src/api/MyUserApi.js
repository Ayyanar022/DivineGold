import {useMutation} from 'react-query'

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const useCreateMyUser = () =>{
    const createMyUserRequest = async (user)=>{
        console.log("user----comming ",user)
        const response = await fetch(`http://localhost:7000/api/my/user`,{
            // const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"POST",
            headers:{
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




