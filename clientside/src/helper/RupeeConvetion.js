const displayINR = (num) => {
    const formater = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,  // No digits after the decimal
      maximumFractionDigits: 0,  // No digits after the decimal
    });
  
    return formater.format(num);
  };
  
  
  export default displayINR