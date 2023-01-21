<script>
	export let onClick = () => {};
	export let destination = '/';
</script>

<a href={destination} on:click={onClick}>
	<div class="button">ログイン</div>
</a>

<style>
	/* CSS */
	.button {
		color: #fff;
		background-color: rgba(255, 255, 255, 0);
		border-radius: 3px;
		border: 1px solid #fff;
		box-sizing: border-box;
		cursor: pointer;
		display: inline-block;
		font-family: -apple-system, system-ui, 'Segoe UI', 'Liberation Sans', sans-serif;
		font-size: 18px;
		font-weight: 400;
		line-height: 1.15385;
		margin-top: 20px;
		outline: none;
		padding: 9px 30px;
		position: relative;
		text-align: center;
		text-decoration: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		vertical-align: baseline;
		white-space: nowrap;
	}

	.button:hover,
	.button:focus {
		background-color: rgba(255, 255, 255, 0.425);
		color: #1d3052;
	}

	.button:focus {
		box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.425);
	}

	.button:active {
		background-color: rgba(255, 255, 255, 0.425);
		box-shadow: none;
		color: #1d3052;
	}
</style>
