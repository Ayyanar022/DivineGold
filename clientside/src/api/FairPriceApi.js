import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export const useGetAllFairPrice = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllFairPrice = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`http://localhost:7000/api/fairPrice`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to Fetch FairPrice Card");
    return response.json();
  };

  const { data: fairPriceCardData, isLoading, error } = useQuery("getAllFairPrice", getAllFairPrice);  
  if (error) toast.error(error.toString());
  return { fairPriceCardData, isLoading };
};


export const useGetFairPriceDetailsData = (itemName, category)=>{
  const { getAccessTokenSilently } = useAuth0();

  const getFairPriceDetails = async({queryKey})=>{
    const accessToken =await getAccessTokenSilently();
    const[_key,itemName, category] = queryKey; 

 const response =   await fetch(`http://localhost:7000/api/fairPrice/${itemName}/${category}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to Fetch FairPrice Card");
    return response.json()   
  }

  const {data:fairPriceDetails,isLoading,error} = useQuery(["getFairPriceDetails",itemName, category],getFairPriceDetails);
  if (error) toast.error(error.toString());
  return { fairPriceDetails, isLoading };
}