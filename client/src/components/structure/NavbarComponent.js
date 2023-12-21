import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Navbar, NavbarBrand } from "react-bootstrap";
import { AuthData } from "../../auth/authWrapper";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent () {
    const logout = AuthData();
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logout()
        localStorage.removeItem('auth')
        navigate('/login')
    }
    return (
        <Navbar expand="lg"  className="bg-body-tertiary">
        <Container fluid>
            <NavbarBrand href="/dashboard">Todo app</NavbarBrand>
            <div className="ms-auto">
                <Button title="Logout?" className="btn btn-secondary" size="sm" style={{fontSize: '.7em'}} onClick={() => handleLogout()}>
                    <FontAwesomeIcon icon="sign-out-alt"></FontAwesomeIcon>
                    </Button>
            </div>
        </Container>
    </Navbar>
    )
}