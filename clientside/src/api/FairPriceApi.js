import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export const useGetAllFairPrice = () => {
  const { getAccessTokenSilently ,isAuthenticated} = useAuth0();

  const getAllFairPrice = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/fairPrice`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to Fetch FairPrice Card");
    return response.json();
  };

  const { data: fairPriceCardData, isLoading, error,refetch } = useQuery("getAllFairPrice", getAllFairPrice,{enabled:isAuthenticated});  
  if (error) toast.error(error.toString());
  return { fairPriceCardData, isLoading ,refetch};
};


export const useGetFairPriceDetailsData = (_id)=>{
  const { getAccessTokenSilently } = useAuth0();

  const getFairPriceDetails = async({queryKey})=>{
    const accessToken =await getAccessTokenSilently();
    const[_key,_id] = queryKey; 

    const response =   await fetch(`${process.env.REACT_APP_BASE_URL}/api/fairPrice/${_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to Fetch FairPrice Card");
    return response.json()   
  }

  const {data:fairPriceDetails,isLoading,error} = useQuery(["getFairPriceDetails",_id],getFairPriceDetails);
  if (error) toast.error(error.toString());
  return { fairPriceDetails, isLoading };
}