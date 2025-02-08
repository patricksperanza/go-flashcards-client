import Link from "next/link";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <Link href="/login" passHref className="login">
        <button>Login</button>
      </Link>
      <Link href="/signup" passHref className="signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Nav;
