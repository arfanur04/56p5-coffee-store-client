import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
	const { signInUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSignIn = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);

		signInUser(email, password)
			.then((result) => {
				// console.log(result.user);
				const user = {
					email,
					lastLoggedAt: result.user?.metadata?.lastSignInTime,
				};

				axios.patch(`http://192.168.0.107:5000/user`, user).then((data) => {
					if (data.data.matchedCount > 0) {
						console.log(data.data);
						navigate("/");
					}
				});

				// // update last logged at in the database
				// fetch(`http://192.168.0.107:5000/user`, {
				// 	method: "PATCH",
				// 	headers: {
				// 		"content-type": "application/json",
				// 	},
				// 	body: JSON.stringify(user),
				// })
				// 	.then((res) => res.json())
				// 	.then((data) => {
				// 		console.log(data);
				// 		navigate("/");
				// 	});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div>
			<div className="min-h-screen hero bg-base-200">
				<div className="flex-col hero-content lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Login now!</h1>
					</div>
					<div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
						<form
							onSubmit={handleSignIn}
							className="card-body"
						>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									name="email"
									placeholder="email"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									name="password"
									placeholder="password"
									className="input input-bordered"
									required
								/>
								<label className="label">
									<a
										href="#"
										className="label-text-alt link link-hover"
									>
										Forgot password?
									</a>
								</label>
							</div>
							<div className="mt-6 form-control">
								<button className="btn btn-primary">Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
