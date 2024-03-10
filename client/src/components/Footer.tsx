import { useLinkCount } from "../hooks"

const REPO_LINK = "https://github.com/1aggarcia/linkstretch"

export default function Footer() {
    const linkCount = useLinkCount();

    return (
        <div style={{margin: "17px 0px"}}>
            <span>Links Generated: {linkCount}</span>
            <span style={{margin: "auto 10px"}}>|</span>
            <span>
                <a href={REPO_LINK}>GitHub</a>
            </span>
        </div>
    )
}
