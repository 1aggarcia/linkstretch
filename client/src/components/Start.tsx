import { useState, ChangeEvent, FormEvent } from "react";
import { shortlinkKey } from "../utils/api-service";

const MAX_LEN = 1000;

interface StartProps {
    generate: (link: string) => unknown
}

export default function Start(props: StartProps) {
    const [link, setLink] = useState(getSavedLink());
    const [submitEnabled, setSubmitEnabled] = useState(link.length > 0);

    function updateLink(e: ChangeEvent<HTMLInputElement>) {
        const newLink = e.target.value

        setLink(newLink);
        setSubmitEnabled(newLink.length > 0);
        sessionStorage.setItem(shortlinkKey, newLink);
    }

    function validateLink(e: FormEvent) {
        e.preventDefault();
        if (!isValidLink(link)) {
            return;
        }
        props.generate(link);
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

function getSavedLink() {
    const link = sessionStorage.getItem(shortlinkKey);

    if (link === null || link.length === 0) {
        return "";
    }
    return link;
}

function isValidLink(text: string): boolean {
    if (text.length < 1) {
        alert("Use a longer link");
        return false;
    }

    if (text.length > MAX_LEN) {
        alert("Link is too long");
        return false;
    }

    try { 
        return Boolean(new URL(text)); 
    } catch (e) { 
        alert("Invalid URL");
        return false; 
    }
}
