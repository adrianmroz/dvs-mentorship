<script>
	export let x;
	export let y;
	export let text;
	
	function xOffset(label) {		
		if (2019 === label || 2008 === label || 2007 === label || 1998 === label) {
			return 5;
		}
		
		if (2004 === label) {
			return -40;
		}
		
		if (1999 === label || 2001 === label) {
			return -20;
		}
		
		if (2000 === label) {
			return -10;
		}
		
		return -5;
	}
	
	function yOffset(label) {		
		if (2013 === label || 2010 === label) {
			return 20;
		}
		
		if (2004 === label || 1998 === label) {
			return -5;
		}
		
		return -10;
	}
	
	function label(text) {
		if (2019 === text) {
			return "2019 *mid-year only"
		}
		return text;		
	}
</script>

<text
						x={x + xOffset(text)}
						y={y + yOffset(text)}
						class="label">
						{label(text)}
					</text>


<style>
	.label {
			fill: #34495e;
			font-size: 0.75em;
	}
</style>