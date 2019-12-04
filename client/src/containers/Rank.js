import React from 'react';
import "./../css/bootstrap.min.css"

function Rank() {
	return (
		<div style={{ marginTop: "20px" }}>
			<h5>Popular</h5>
			<div class="list-group">
				<div class="list-group-item list-group-item-action flex-column align-items-start active">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">List group item heading</h5>
						<small>3 days ago</small>
					</div>
					<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
					<small>Donec id elit non mi porta.</small>
				</div>
				<div class="list-group-item list-group-item-action flex-column align-items-start">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">List group item heading</h5>
						<small class="text-muted">3 days ago</small>
					</div>
					<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
					<small class="text-muted">Donec id elit non mi porta.</small>
				</div>
			</div>
		</div>
	);
}

export default Rank;
