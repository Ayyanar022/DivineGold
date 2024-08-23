import SaleItem from "../models/SaleProductModel.js";
import User from "../models/userModel.js";



 const getFilterSaleItems = async (req, res) => {
    try {
       
        const { username, mobileNo, startDate, endDate, jewellCategory } = req.query.filter;

        console.log("startDate",startDate)
        console.log("endDate",endDate)
             // Create a query object to hold the filters
        const query = {};

        // Filter by jewellCategory if provided
        if (jewellCategory) {
            query.jewellCategory = jewellCategory;
        }

        // Filter by date range if provided
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate); // Greater than or equal to startDate
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate); // Less than or equal to endDate
            }
        }

        // If username or mobileNo is provided, find the corresponding user(s) first
        if (username || mobileNo) {
            const userQuery = {};
            if (username) userQuery.name = username;
            if (mobileNo) userQuery.mobileNo = mobileNo;

            // Find users matching the criteria
            const users = await User.find(userQuery);
            const userIds = users.map(user => user._id);

            // Filter sale items by the found user IDs
            if (userIds.length > 0) {
                query.userId = { $in: userIds };
            } else {
                // If no matching users are found, return an empty result
                return res.json([]);
            }
        }

        // Fetch the sale items based on the constructed query
        const saleItems = await SaleItem.find(query).populate('userId', 'name village');

        // Initialize totals
        let totalWeight = 0;
        let totalPrice = 0;
        let totalTokens = 0;
        let totalWeight22k = 0;
        let totalWeight18k = 0;
        let totalQtyBasedOnCategory = {}
      

        saleItems.forEach(item=>{
            totalWeight += item.netWeight;
            totalPrice += item.price;
            totalTokens += item.PrizeToken;
            
            if(item.jewllTouch==="22k"){
                totalWeight22k +=item.netWeight;
            }

            if(item.jewllTouch==="18k"){
                totalWeight18k +=item.netWeight;
            }

            if(totalQtyBasedOnCategory[item.jewellCategory]){
                totalQtyBasedOnCategory[item.jewellCategory] += item.quantity;
            }else{
                totalQtyBasedOnCategory[item.jewellCategory] = item.quantity;
            }
        })

        console.log("saleItem",saleItems)

        res.status(200).json({
            saleItems,
            totalWeight,
            totalPrice,
            totalTokens,
            totalWeight22k,
            totalWeight18k,
            totalQtyBasedOnCategory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default {
    getFilterSaleItems,
}