import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
	const loadedUsers = useLoaderData();
	const [users, setUsers] = useState(loadedUsers);

	// useEffect(() => {
	// 	fetch(`/`)
	// 		.then((res) => res.json())
	// 		.then((data) => setUser(data))
	// 		.catch((err) => console.error('err', err));
	// }, []);

	// useEffect(() => {
	// 	axios
	// 		.get(`/`)
	// 		.then((data) => {
	// 			console.log(data.data);
	// 		})
	// 		.catch((err) => console.error("err", err));
	// }, []);

	const handleDelete = (id) => {
		// make sure user is confirmed to delete
		fetch(`http://192.168.0.107:5000/user/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deletedCount > 0) {
					console.log("deleted successfully");
					// remove the user from the UI
					const remainingUsers = users.filter((user) => user._id !== id);
					setUsers(remainingUsers);
				}
			});
	};

	return (
		<div>
			<h2>Users: {users.length}</h2>
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Email</th>
							<th>Created At</th>
							<th>Last Logged In</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<th>1</th>
								<td>{user.email}</td>
								<td>{user.createdAt}</td>
								<td>{user.lastLoggedAt}</td>
								<td>
									<button
										onClick={() => handleDelete(user._id)}
										className="btn"
									>
										X
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
