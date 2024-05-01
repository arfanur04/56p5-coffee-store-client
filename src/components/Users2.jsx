import { useEffect, useState } from "react";

const Users2 = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch(`https://56p5-coffee-store-server.vercel.app/user`)
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((err) => console.error("err", err));
	}, []);

	const handleDelete = (id) => {
		// make sure user is confirmed to delete
		fetch(`https://56p5-coffee-store-server.vercel.app/user/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deletedCount > 0) {
					console.log("deleted successfully");
					// remove the user from the UI
					// const remainingUsers = users.filter((user) => user._id !== id);
					// setUsers(remainingUsers);
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

export default Users2;
