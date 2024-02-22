export default function Error({ startOver, message }) {
    return <>
        <h2>Something went wrong</h2>
        <p>There was an error contanting the server:</p>
        <p>{message}</p>
        <button onClick={startOver}>Go back</button>
    </>
}
