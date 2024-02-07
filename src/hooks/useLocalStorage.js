import { useEffect, useState } from "react";

export function useLocalStorage({ initialState, key }) {
  const [value, setValue] = useState(() => {
    //Fetch the data from local storage as the initial value
    //If no stored data yet, it will instead use the initialState
    const storedData = JSON.parse(localStorage.getItem(key));
    return storedData ? storedData : initialState;
  });

  //Save the data in the storage everytime state changes
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
