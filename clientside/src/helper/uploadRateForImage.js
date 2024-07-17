const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`


// const url = `https://api.cloudinary.com/v1_1/duonpg1or/image/upload`

const uploadRateforImage = async(image)=>{

    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset","divineGoldImage")

    const response = await fetch(url,{
        method:"post",
        body:formData
    })
    return response.json()
}
 
export default uploadRateforImage



