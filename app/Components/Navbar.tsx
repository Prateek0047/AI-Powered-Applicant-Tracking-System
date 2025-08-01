import { Link } from "react-router"

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link  to="/">
                <p className="text-2xl text-gradient font-bold">Resumind</p>
            </Link>
            <Link  to="/upload" className="primary-button w-fit">Upload resume</Link>
        </nav>
    )
}
export default Navbar
