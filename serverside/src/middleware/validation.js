// package npm i express-validator  --> its for validating data
import {body, validationResult} from "express-validator"

const handleValidationerrors = (req,res,next)=>{
    const  errors = validationResult(req)
    if(!errors.isEmpty())return res.status(400).json({errors:errors.array()})    
    next()
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be string"),
    body("mobileNo").isString().notEmpty().withMessage("Mobile number Must be 10 number"),
    body("address").isString().notEmpty().withMessage("Address must String"),
    body("village").isString().notEmpty().withMessage("Village must be sting"),
    body("city").isString().notEmpty().withMessage("City must be string and valid  "),
    handleValidationerrors,
   ]