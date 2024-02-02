/* eslint-disable react/prop-types */
import { useState } from "react";
import Counter from "./Counter";

export default function Start({ generate }) {
    const [link, setLink] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(false);

    function updateLink(e) {
        setLink(e.target.value);
        setSubmitEnabled(e.target.value.length > 0);
    }

    function validateLink(e) {
        e.preventDefault();
        if (link.length < 1) {
            alert("Use a longer link");
            return;
        }

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
            <input type="text" placeholder="Paste link here" onChange={updateLink} />
            <button disabled={!submitEnabled}>
                Lengthen
            </button>
        </form>
        <Counter />
    </>);
}