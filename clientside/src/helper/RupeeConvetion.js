const displayINR = (num) => {
    const formater = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });
  
    return formater.format(num);
  };
  
  
  export default displayINR