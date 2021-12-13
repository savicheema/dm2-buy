import { useState } from "react";
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if(item) {
        const itemJson = JSON.parse(item);
        if(itemJson.percentageDiscount != null) {
          const { percentageDiscount, couponId, couponCode, ...withoutPromo } = itemJson; 
          console.log('useLOCAL INITIAL--->',key, {withoutPromo})
          return withoutPromo; 
        } else {
          console.log('useLOCAL INITIAL--->',key, {itemJson})
          return itemJson;
        }
      } else {
        return initialValue;
      }
      // return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value) => {
    console.log('useLOCAL SETVALUE--->',value, {storedValue})
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // console.log(error);
    }
  };
  console.log('useLOCAL --->',key, {storedValue})
  return [storedValue, setValue];
}
