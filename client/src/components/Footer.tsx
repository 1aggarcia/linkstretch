// import { useEffect, useState } from "react"
// import { getCountAsync } from "../api-service";

const repoLink = "https://github.com/1aggarcia/linkstretch"
const linkedIn = "https://www.linkedin.com/in/apolo-garcia/"

export default function Footer() {
    // const [count, setCount] = useState();

    // useEffect(() => {
    //     getCountAsync()
    //         .then(setCount)
    //         .catch(() => setCount("??"));
    // }, [])

    return (
        <div style={{margin: "17px 0"}}>
            <a href={repoLink} style={{margin: "auto 10px"}}>
                Source Code
            </a>
            <a href={linkedIn} style={{margin: "auto 10px"}}>
                LinkedIn
            </a>
        </div>
    )
}
