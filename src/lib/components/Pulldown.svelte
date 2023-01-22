<script>
	import { InstrumentType } from '../../constants/musicConst';
	export let id;
	export let value = InstrumentType.piano;
	// export let value = InstrumentType.base;
	// let instrument = ["default","base", "dram", "hat", "snere"
	// 	// { id: 1, text: `base` },
	// 	// { id: 2, text: `dram` },
	// 	// { id: 3, text: `hat` },
	//   // { id: 4, text: `snere` }

	import Button from './Button.svelte';

	// ];
</script>

<div class="pulldown-container">
	<select bind:value>
		<option value={InstrumentType.piano}>ピアノ</option>
		<option value={InstrumentType.base}>ベース</option>
		<option value={InstrumentType.drum}>ドラム</option>
	</select>

	<!-- <Button onClick={() => {}} destination={`./music?userId=${id}`} name="決定" /> -->
</div>

<style>
	.pulldown-container {
		position: relative;
		/*Don't really need this just for demo styling*/

		float: left;
		min-width: 200px;
	}

	/* IE11 hide native button (thanks Matt!) */
	select::-ms-expand {
		display: none;
	}

	.pulldown-container:after {
		content: '<>';
		font: 17px 'Consolas', monospace;
		color: #333;
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		transform: rotate(90deg);
		right: 11px;
		/*Adjust for position however you want*/

		top: 18px;
		padding: 0 0 2px;
		border-bottom: 1px solid #999;
		/*left line */

		position: absolute;
		pointer-events: none;
	}
	.pulldown-container {
		position: absolute;
		right: 15px;
		top: 10px;
	}

	.pulldown-container select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		/* Add some styling */

		display: block;
		width: 100%;
		max-width: 320px;
		height: 50px;
		float: right;
		margin: 5px 0px;
		padding: 0px 24px;
		font-size: 16px;
		line-height: 1.75;
		color: #333;
		background-color: rgba(255, 255, 255, 0.773);
		background-image: none;
		border: 1px solid #cccccc;
		-ms-word-break: normal;
		word-break: normal;
	}
</style>
