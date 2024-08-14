import NewJewllDesign from "../models/jewllItemDesignModel.js"



const getSingleJEwellDesignData = async(req,res)=>{
   try{
    const _id = req.params.id;
    
    console.log("id---",req.params)
    const response = await NewJewllDesign.findOne({_id:_id})
   res.status(200).json(response)
   }catch(err){
    console.log("error",err)
    res.status(500).json({message:"somthing went wrong..",error:true})
   }
}

// TO FILTER EXPLORE CARD 
// const getFilterJEwellDesignData = async(req,res)=>{
//     try{
//         const {gender,type,category} = req.query;
//         console.log("filter",gender,type,category)
//         // let filter = {};

//         // if(gender)filter.jewellGender = {$in:gender.split(',')};

//         // if(type)filter.jewellType = { $in: type.split(',') };

//         // if(category)filter.jewellCategory = { $in:category.split(',') };

//         // const designs = await NewJewllDesign.find(filter)
//         // res.json(designs)

//         res.json("Hello")

//     }catch(err){
//         console.log("Error",err);
//         res.status(500).json({message:"Somthing went wrong..",error:true})
//     }
// }

const getFilterJEwellDesignData = async (req, res) => {
    try {
      console.log("filter querry--------",req.query)
     
      const { gender, type, category } = req.query;
      console.log("filter querry",req.query)
      console.log('filter params:', gender, type, category ); // Logging the incoming query params
  
      let filter = {};
  
      if (gender) filter.jewellGender = { $in: gender.split(',') };
      if (type) filter.jewellType = { $in: type.split(',') };
      if (category) filter.jewellCategory = { $in: category.split(',') };
  
      const designs = await NewJewllDesign.find(filter);
      res.json(designs);
    } catch (err) {
      console.log('Error', err);
      res.status(500).json({ message: 'Something went wrong..', error: true });
    }
  };
  

export default {
    getSingleJEwellDesignData,
    getFilterJEwellDesignData,
}