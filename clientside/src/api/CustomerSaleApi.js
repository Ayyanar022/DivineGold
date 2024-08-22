// import { useAuth0 } from "@auth0/auth0-react"
// import axios from "axios";
// import { useEffect } from "react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "react-toastify";

// export const useGetUserByMobNumber = (mobileNo)=>{
//     const {getAccessTokenSilently} = useAuth0();

//     const getSinglecustomer =async (mobileNo)=>{
//         const accessToken = await getAccessTokenSilently()
//         const response = await axios.get(`http://localhost:7000/api/admin/customersale/get-customer/${mobileNo}`,{         
//             headers:{
//                 Authorization:`Bearer ${accessToken}`, 
//                 "Content-Type":"application/json"    
//             }, 
//         })
//         return response;
//     }

//     const {data:singlecustomerData , error , isLoading,refetch} = useQuery("getSinglecustomer",getSinglecustomer(mobileNo))
//     if(error)toast.error(error.toString())
//     return{singlecustomerData , isLoading,refetch}
// }