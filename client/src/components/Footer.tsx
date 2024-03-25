const REPO_LINK = "https://github.com/1aggarcia/linkstretch"

export default function Footer() {
    return (
        <div style={{margin: "17px 0px"}}>
            {/* <span>Last Updated 2024-03-24</span>
            <span style={{margin: "auto 10px"}}>|</span> */}
            <span>
                <a href={REPO_LINK}>GitHub</a>
            </span>
        </div>
    )
}
