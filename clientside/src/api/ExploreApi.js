import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from "react-query";
import { toast } from "react-toastify";


export const useGetAllJewllDesign = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getAllJewell =async ()=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:7000/api/admin/get-AllItemDesign`,{
            method:"GET",
            headers:{
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },            
        })
        if(!response.ok) throw new Error("Faild to fetch Jewell designs..");
        return response.json();
    }

    const {data:JewellDesignData , isLoading ,error} = useQuery("getAllJewell",getAllJewell)
    if(error)toast.error(error.toString())
    return {JewellDesignData,isLoading}
}