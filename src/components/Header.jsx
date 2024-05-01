import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
	const { user, signOutUser } = useContext(AuthContext);

	return (
		<div className="flex justify-center">
			<NavLink to={"/"}>
				<button className="btn btn-ghost">Home</button>
			</NavLink>
			<NavLink to={"/users"}>
				<button className="btn btn-ghost">Users</button>
			</NavLink>
			{user?.uid ? (
				<>
					<Link to={"/"}>
						<button
							onClick={() => {
								signOutUser()
									.then(() => console.log("logOut successfully"))
									.catch((err) => console.error(err));
							}}
							className="btn btn-ghost"
						>
							Sign Out
						</button>
					</Link>
				</>
			) : (
				<>
					<NavLink to={"/signup"}>
						<button className="btn btn-ghost">Sign Up</button>
					</NavLink>
					<NavLink to={"/signin"}>
						<button className="btn btn-ghost">Sign In</button>
					</NavLink>
				</>
			)}
		</div>
	);
};

export default Header;
