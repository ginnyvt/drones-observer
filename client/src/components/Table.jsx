import moment from "moment";
import _ from "lodash";

function Table({ tableRows, tableHeaders }) {
	const transformedTableRows = tableRows.map((item, index) => {
		const last_seen = moment(item.snapped_at).utc().fromNow();
		return {
			...item,
			last_seen,
			id: index + 1,
		};
	});
	return (
		<div className="overflow-x-auto">
			<table className="table table-compact w-full">
				<thead>
					<tr>
						{tableHeaders.map((th) => (
							<th key={th.label}>{th.label}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{transformedTableRows.map((r) => {
						return (
							<tr key={r.drone_serial_no}>
								<th>{r.id}</th>
								<td>{`${r.pilot_firstName} ${r.pilot_lastName}`}</td>
								<td>{_.round(r.distance_to_nest, 4)}</td>
								<td>{r.pilot_email}</td>
								<td>{r.pilot_phone}</td>
								<td>{r.last_seen}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
