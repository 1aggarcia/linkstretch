import { useState, useEffect, useRef } from "react";

import Loading from "./Loading";
import Error from "./Error";
import { createLinkAsync, shortlinkKey } from "../api-service";

const textAreaRows = 20;

export default function Processser({ link, startOver }) {
  const [error, setError] = useState(null);
  const [longLink, setLongLink] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    createLinkAsync(link)
      .then((link) => {
        setLongLink(link);
        sessionStorage.removeItem(shortlinkKey);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  function copyResult() {
    textAreaRef.current.value = longLink;
    textAreaRef.current.select();
    navigator.clipboard.writeText(longLink);
  }

  if (error) return <Error message={error} startOver={startOver} />;

  if (longLink.length === 0) return <Loading />;

  return (
    <>
      <p>Link successfully lengthened, copy below:</p>
      <button onClick={copyResult}>Copy Link</button>
      <textarea
        ref={textAreaRef}
        defaultValue={longLink}
        rows={textAreaRows}
        placeholder="Output"
      />
      <button onClick={startOver}>Start Over</button>
    </>
  );
}
