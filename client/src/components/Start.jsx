import { useState, useEffect } from "react";
import { shortlinkKey } from "../api-service";

/**
 * @param {{generate: (string) => unknown}} props
 */
export default function Start({ generate }) {
    const [link, setLink] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(false);

    useEffect(() => {
        const saved = sessionStorage.getItem(shortlinkKey);
        if (saved !== null && saved.length > 0) {
            setLink(saved);
            setSubmitEnabled(true);
        }
    }, [])

    function updateLink(e) {
        const newLink = e.target.value
        setLink(newLink);

        // Enable the submit button if there's text in the box
        setSubmitEnabled(newLink.length > 0);
    }

    function validateLink(e) {
        e.preventDefault();
        if (link.length < 1) {
            alert("Use a longer link");
            return;
        }

        sessionStorage.setItem(shortlinkKey, link);
        generate(link);
    }

    return (<>
        <p>
            Are your links too consise? Need to make them suspiciously large
            and illegible? Fear not, with this tool you can stretch out your
            links a whole bunch more than you would ever want to.
        </p>
        <p>Just paste your link below:</p>
        <form className="centered" onSubmit={validateLink}>
            <input 
                type="text"
                placeholder="Paste link here"
                onChange={updateLink}
                value={link}
            />
            <button disabled={!submitEnabled}>
                Lengthen
            </button>
        </form>
    </>);
}