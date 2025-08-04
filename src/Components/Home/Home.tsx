import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
  return (
    <div className="home-container">
        <Link to={"/sign-up"}>
        <button className="sign-up-btn">Sign Up</button>
        </Link>

        <Link to={""}>
        <button className="login-btn">Login</button>
        </Link>
    </div>
  )
}

export default Home