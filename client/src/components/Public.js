import { Link } from "react-router-dom"


const Public = () => {

    const content = (
        <section className="public">
            <header>
                <h1>Welcome to Repair Store!</h1>
            </header>
            <main>
                <p>Located i nBeautiful Downtown Foo City, Repairy Store provide</p>
                <p>&nbsp;</p>
                <address>
                    Repair Store <br />
                    555 FOO Drive <br />
                    Foo City, CA 12345 <br />
                </address>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}

export default Public