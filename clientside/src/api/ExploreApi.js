import { useAuth0 } from "@auth0/auth0-react"
import { get } from "react-hook-form";
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

export const useGetOneJewllDesign = (id)=>{
    const {getAccessTokenSilently} = useAuth0();

    const getOneJewllDesign =async (id)=>{
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`http://localhost:7000/api/explore/${id}`,{
            method:"GET",
            headers:{
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            }, 
        })
        const data = await response.json();
        console.log("Fetched data:", data);
        
        if(!response.ok)throw new Error("Somthing went wrong..")
        return  data;
    }

    const {data:simgleJewellData ,isLoading,error} = useQuery(["getOneJewllDesign",id],()=>getOneJewllDesign(id))
    if(error)toast.error(error.toString())
        return {simgleJewellData,isLoading
    }    
}