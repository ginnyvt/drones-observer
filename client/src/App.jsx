import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import _ from "lodash";

import { dronesTableHeaders } from "./utils/dronesTableHeaders";
import Table from "./components/Table";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
	const [violatedDrones, setViolatedDrones] = useState([]);
	const [date, setDate] = useState(new Date());
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(true);

	async function fetchViolatedDrones() {
		setError(null);
		try {
			const { data } = await axios({
				method: "GET",
				url: `${BASE_URL}/api/violated_drones`,
			});
			const violatedDrones = _.orderBy(data.violatedDrones, (d) => moment(d.snapped_at), "desc");
			setViolatedDrones(violatedDrones);
			setDate(new Date());
		} catch (err) {
			setError(err.message);
		}
	}

	useEffect(() => {
		const initialFetch = async () => {
			setLoading(true);
			await fetchViolatedDrones();
			setLoading(false);
		};

		initialFetch();
		setInterval(() => {
			fetchViolatedDrones();
		}, 10000);
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error !== null) {
		return <p>{error}</p>;
	}

	return (
		<>
			<main className="min-h-screen mb-auto bg-cyan-50">
				<div className="p-4 py-8 px-12">
					<h4 className="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center mb-4">Drones monitoring</h4>
					<p className="text-center mb-4">Last updated: {`${moment(date).format("L")} - ${moment(date).format("LTS")}`}</p>

					{violatedDrones.length === 0 && <p>No Violated Drones.</p>}
					{violatedDrones.length > 0 && <Table tableHeaders={dronesTableHeaders} tableRows={violatedDrones}></Table>}
				</div>
			</main>

			<footer className="footer footer-center p-4 text-base-content">
				<div>
					<p>
						Copyright © {new Date().getFullYear()} - Developed by{" "}
						<span>
							<a href="https://www.linkedin.com/in/ginnytran/" className="font-medium underline">
								ginnyvt
							</a>
						</span>
					</p>
				</div>
			</footer>
		</>
	);
}

export default App;
