const useRandomValueFromArray = () => {
  
    const randomValueFromArray = (myArray) => {
      let randomValueIndex = Math.floor(Math.random() * 13);
      return myArray[randomValueIndex];
    };
    return {
      randomValueFromArray,
    };
  };
  
  export default useRandomValueFromArray;