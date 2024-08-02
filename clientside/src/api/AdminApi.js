import { useMutation,useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";


export const useGetAllCustomer = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getAllCustomerRequest = async()=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`http://localhost:7000/api/admin`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"    
            }
        })
        if(!response.ok) throw new Error("Faild To Fetch Customer ..");
        return response.json();
    }

    const {data:allCustomer,isLoading,error} = useQuery("fetchAllCustomer",getAllCustomerRequest);
    if(error)toast.error(error.toString());

    return{allCustomer,isLoading};
}



export const useCreateFairPriceItem = ()=>{
    const {getAccessTokenSilently} = useAuth0()

    const createFairPricefun =async (data)=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:7000/api/admin`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"    
            },
            body:JSON.stringify(data)
        })
        if(!response.ok)throw new Error("faild to Create FairPrice")
        return response.json();
    }

    const {mutateAsync:createFairPrice,isError,isSuccess,isLoading} = useMutation(createFairPricefun)
    return{createFairPrice,isLoading,isSuccess,isError}
} 


export const useUpdateCurrentPrice =()=>{
    const {getAccessTokenSilently} = useAuth0();

    const updatePrice =async (data)=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:7000/api/admin/currentPrice`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"    
            },
            body:JSON.stringify({ currentPrice: data })
        })
        if(!response.ok)throw new Error("faild to Update Current Price")
        return response.json();
    }

    const {mutateAsync:updateCurrentPrice ,isSuccess,isLoading} = useMutation(updatePrice)
    return {updateCurrentPrice ,isSuccess,isLoading}
} 


//GET CURRENT 999 PRICE
export const useGetCurrentPrice =()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getCP = async()=>{
        const accessToken = await getAccessTokenSilently();

        const response = await  fetch(`http://localhost:7000/api/admin/currentPrice`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"    
            },
        })
        if(!response.ok)throw new Error("faild to Update Current Price")
        return response.json();
    }

    const {data:currentPriceData ,isLoading ,error} = useQuery("getCurrentPrice",getCP);
    if(error)toast.error(error.toString())
    return {currentPriceData ,isLoading }

}



// ADMIN EXPLORE CARD 
//upload new item design

export const useUploadNewItemDesign = ()=>{
    const {getAccessTokenSilently} = useAuth0()

    const uploadNewItemDesign =async (data)=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:7000/api/admin/AddnewItemDesign`,{
            method:'POST',
            headers:{
                Authorization:`Bearer ${accessToken}`, 
                "Content-Type":"application/json"    
            },
            body:JSON.stringify(data)
        })
    if(!response.ok) throw new Error("Faild to add new item design..")    
    return response.json();
    }

    const {mutateAsync:AddNewItemDesign,isLoading,isSuccess} = useMutation(uploadNewItemDesign)
    return {AddNewItemDesign,isLoading,isSuccess}
} 
