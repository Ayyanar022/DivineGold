import { useAuth0 } from "@auth0/auth0-react"
import { get } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from 'axios'

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
        const response = await fetch(`http://localhost:7000/api/explore/single/${id}`,{
            method:"GET",
            headers:{
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            }, 
        })
        if(!response.ok)throw new Error("Somthing went wrong..")

        const data = await response.json();
     
        return  data;
    }

    const {data:simgleJewellData ,isLoading,error} = useQuery(["getOneJewllDesign",id],()=>getOneJewllDesign(id),{
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // Keeps data fresh for 5 minutes
    })

    if(error)toast.error(error.toString())

    return {simgleJewellData,isLoading
    }    
}


export const useFilterJewllDesignExplore = (selectedGender ,selectedType , selectedCategory)=>{
    const {getAccessTokenSilently} = useAuth0();

    const filterFun = async(selectedGender ,selectedType , selectedCategory)=>{
        const accessToken = await getAccessTokenSilently();

        const response = await axios.get('http://localhost:7000/api/explore/filter', {
            params: {
                gender: selectedGender.join(','),
                type: selectedType.join(','),
                category: selectedCategory.join(','),
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
   
    return response.data;

    }

    const {data:filterData,isLoading,error} = useQuery(["FilterExplore",selectedGender ,selectedType , selectedCategory],()=>filterFun(selectedGender ,selectedType , selectedCategory),{
        enabled:selectedGender.length>0 ||selectedType.length>0 || selectedCategory.length>0,
    })

    if(error)toast.error(error.toString())

    return {filterData,isLoading,error}
}