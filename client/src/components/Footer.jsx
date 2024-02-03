import { useEffect, useState } from "react"
import { getCountAsync } from "../api-service";

const repoLink = "https://github.com/1aggarcia/linkstretch"

export default function Footer() {
    const [count, setCount] = useState();

    useEffect(() => {
        getCountAsync()
            .then(setCount)
            .catch(err => { throw err }); // TODO: handle this
    }, [])

    return (
        <div style={{margin: "17px 0"}}>
            <span style={{margin: "auto 10px"}}>
                Total Links Generated: {count === undefined? "??" : count}
            </span>
            <a href={repoLink} style={{margin: "auto 10px"}}>
                Source Code
            </a>
        </div>
    )
}
