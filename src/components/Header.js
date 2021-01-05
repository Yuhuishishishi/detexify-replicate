
function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <a className="navbar-brand">Detexify</a>
            </nav>

            <blockquote className="blockquote text-justify" style={{margin: "30px"}} >
                <h2>What is this?</h2>
                <p> This is a replicate of <a href='https://detexify.kirelabs.org/classify.html'>Detexify</a>. You can draw some math symbols and it will help you find the Latex expression for it.</p>
                <h2>How does this work?</h2>
                <p> Refer to the source code <a href='https://github.com/Yuhuishishishi/detexify-replicate'>here</a> </p>
            </blockquote>
        </div>
    )
}

export default Header;