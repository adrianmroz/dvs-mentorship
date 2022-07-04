export default function transform(data) {
	
				const intact = parseInt(data.intact, 10);
				const ambiguous = parseInt(data.ambiguous, 10);
				const rotted = parseInt(data.rotted, 10);
				const year = parseInt(data.year, 10);
	
				const total = intact + ambiguous + rotted;
				const percent_rotted = 100 * rotted / total;
	
				return {
					year, total, percent_rotted
				};
	}