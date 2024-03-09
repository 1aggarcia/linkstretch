interface ErrorProps {
    startOver: () => unknown,
    message: string,
}

export default function Error(props: ErrorProps) {
    return <>
        <h2>Something went wrong</h2>
        <p>There was an error contanting the server:</p>
        <p>{props.message}</p>
        <button onClick={props.startOver}>Go back</button>
    </>
}
