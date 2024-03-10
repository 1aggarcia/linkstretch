/** Custom hooks */

import { useState, useEffect } from "react";
import { getCountAsync } from "./api-service";

export function useLinkCount() {
    const [count, setCount] = useState("??");

    useEffect(() => {
        getCountAsync()
            .then(count => setCount(count.toString()))
            .catch(err => console.error(err))
    }, [])

    return count;
}
