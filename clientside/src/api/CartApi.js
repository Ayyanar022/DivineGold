import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";


export const  useAddUpdateCart = ()=>{
    const {getAccessTokenSilently } = useAuth0()
    const addUpdateCartItem = async(id)=>{
   
            const accessToken = await getAccessTokenSilently();
                const response =await fetch(`${process.env.REACT_APP_BASE_URL}/api/cart`,{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${accessToken}`, 
                    "Content-Type":"application/json"    
                },
                body: JSON.stringify({ productId: id }) 
            })
            if(!response.ok){
                throw new Error("somthing went wrong")
            }

           return response.json()
         }

         const {mutateAsync:addUpdateCart,isError,isSuccess,isLoading} = useMutation(addUpdateCartItem)
         return{addUpdateCart,isLoading}
}

export const useGetCartItem = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const getCartIetm = async()=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/cart`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"    
            }
        })

        if(!response.ok) throw new Error("Somthing went wrong..")
        
        return response.json()
    }

    const {data:cartData,error,isLoading ,refetch} = useQuery("getCartItems",getCartIetm)

    useEffect(() => {
        if (error) {
            toast.error(error.message || error.toString());
        }
    }, [error]);

    return{cartData,isLoading,refetch}
}