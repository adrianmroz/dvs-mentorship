<script>
	import { csv } from 'd3';
	import transform from '../utils/transform.js';
	import Chart from '../components/Chart.svelte';
	import Footer from '../components/Footer.svelte';

	let dataset = csv('https://raw.githubusercontent.com/ancasarb/data/main/linkrot.csv', transform);

	let chartWidth = 1000;
	let chartHeight = 300;
</script>

<main>
	<section class="title">
		<h2>An examination of link rot within the New York Times website</h2>
		<p>Links in older articles are more likely to be broken.</p>
	</section>

	<section class="chart">
		{#await dataset}
			<p>Loading data...</p>
		{:then data}
			<div class="chart-container" bind:clientWidth={chartWidth} bind:clientHeight={chartHeight}>
				<Chart dataset={data} height={chartHeight} width={chartWidth} />
			</div>
		{/await}
	</section>
	<section class="footer">
		<Footer />
	</section>
</main>

<style>
	main {
		height: 100vh;
		color: #34495e;
		font-family: sans-serif;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.chart {
		position: relative;
		flex: auto;
	}

	.chart-container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 10px;
		right: 10px;
	}

	h2,
	p {
		margin: 7px;
	}
</style>
