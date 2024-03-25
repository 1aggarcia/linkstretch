import { useState, useEffect, useRef } from "react";

import Loading from "./Loading";
import Error from "./Error";
import { createLinkAsync, shortlinkKey } from "../utils/api-service";

const textAreaRows = 20;

interface ProcesserProps {
  link: string,
  startOver: () => unknown,
}

export default function Processser(props: ProcesserProps) {
  const [error, setError] = useState(null);
  const [longLink, setLongLink] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    createLinkAsync(props.link)
      .then((link) => {
        setLongLink(link);
        sessionStorage.removeItem(shortlinkKey);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  function copyResult() {
    if (textAreaRef.current === null) {
      return;
    }

    textAreaRef.current.value = longLink;
    textAreaRef.current.select();
    navigator.clipboard.writeText(longLink);
  }

  if (error !== null) {
    return <Error message={error} startOver={props.startOver} />;
  }
  if (longLink.length === 0) {
    return <Loading />;
  }
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
      <button onClick={props.startOver}>Start Over</button>
    </>
  );
}
