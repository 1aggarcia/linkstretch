/* eslint-disable react/prop-types */
export default function Error({ startOver }) {
    return <>
        <h2>Something went wrong</h2>
        <p>There was an error contanting the server.</p>
        <button onClick={startOver}>Go back</button>
    </>
}