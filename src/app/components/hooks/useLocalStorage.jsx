import {useState, useEffect} from "react";

const useLocalStorage = (defaultValue, key) => {
    const [value, setValue] = useState(() => {
        const verValue = window.localStorage.getItem(key);

        return verValue !== null ?
            JSON.parse(verValue)
            : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;