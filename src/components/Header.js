
function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <a className="navbar-brand">Detexify</a>
            </nav>

            <blockquote className="blockquote text-justify" style={{margin: "30px"}} >
                <p>
                    Some description about the application
                </p>
            </blockquote>
        </div>
    )
}

export default Header;