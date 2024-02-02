/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import { createLinkAsync, shortlinkKey } from "../api-service";
import Error from "./Error";

const textAreaRows = 10;


export default function Processser({ link, startOver }) {
    const [error, setError] = useState(false);
    const [longLink, setLongLink] = useState('');
    const textAreaRef = useRef(null);

    useEffect(() => {
        createLinkAsync(link)
            .then((link) => {
                setLongLink(link);
                sessionStorage.removeItem(shortlinkKey);
            })
            .catch(() => setError(true));
    }, [])

    function copyResult() {
        textAreaRef.current.value = longLink;
        textAreaRef.current.select();
        navigator.clipboard.writeText(longLink);
    }

    if (error)
        return <Error startOver={startOver} />

    if (longLink.length === 0)
        return <Loading />;

    return (<>
        <p>Link successfully lengthened, copy below:</p>
        <button onClick={copyResult}>Copy Link</button>
        <textarea
            ref={textAreaRef}
            defaultValue={longLink}
            rows={textAreaRows}
            placeholder="Output"
        />
        <button onClick={startOver}>Start Over</button>
    </>)
}
