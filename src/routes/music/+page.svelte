<script lang="ts">
	import { onMount } from 'svelte';
	import C4 from '$lib/assets/C4.mp3';
	// import { data } from '../../tmp/demo';
	import { data } from '../../tmp/bikiniki';
	import Music, { weekDayKeys, type Score, type ContributionCalendar } from '../../lib/music';

	const music = new Music().fromContributionCalendar(
		data.data.user.contributionsCollection.contributionCalendar as ContributionCalendar
	);
	console.log(music.score);

	let isPlaying = false;
	const togglePlaying = () => {
		isPlaying = !isPlaying;
	};

	let onPlay = () => {};
	let onStop = () => {};

	onMount(async () => {
		const Tone = await import('tone');
		const sampler = new Tone.Sampler({
			urls: {
				C4: C4
			}
		}).toDestination();
		weekDayKeys.forEach((weekDayKey) => {
			new Tone.Sequence((time, value) => {
				sampler.triggerAttackRelease(value.note, '16n', time, value.velocity);
			}, music.score[weekDayKey as keyof Score]).start(0);
		});
		onPlay = async () => {
			await sampler.context.resume();
			togglePlaying();
			Tone.Transport.start();
		};
		onStop = async () => {
			togglePlaying();
			Tone.Transport.pause();
		};
	});
</script>

<div class="full">
	{#if !isPlaying}
		<div class="video_play" on:click={onPlay} />
	{:else}
		<div class="video_pause" on:click={onStop} />
	{/if}
</div>

<style>
	.full {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 100%;
		min-height: 100vh;
	}
	.video_play {
		display: inline-block;
		position: relative;
		width: 1em;
		height: 1em;
		border: 0.05em solid currentColor;
		border-radius: 50%;
		color: #febd69;
		font-size: 200px;
	}
	.video_play::before {
		position: absolute;
		top: 50%;
		left: 30%;
		transform: translateY(-50%);
		width: 0px;
		height: 0px;
		border: 0.3em solid transparent;
		border-left: 0.5em solid currentColor;
		box-sizing: border-box;
		content: '';
	}
	.video_pause {
		display: inline-block;
		position: relative;
		width: 1em;
		height: 1em;
		border: 0.05em solid currentColor;
		border-radius: 50%;
		color: #febd69;
		font-size: 200px;
	}
	.video_pause::before,
	.video_pause::after {
		position: absolute;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 0.1em;
		height: 0.5em;
		box-sizing: border-box;
		background-color: currentColor;
		content: '';
	}
	.video_pause::before {
		left: 40%;
	}
	.video_pause::after {
		left: 60%;
	}
</style>
