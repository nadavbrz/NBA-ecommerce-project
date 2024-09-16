export const sortByPrice = (products, sortOrder) => {
    if (sortOrder === "lowToHigh") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products; 
  };
  