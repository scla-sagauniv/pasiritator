<script lang="ts">
	import { onMount } from 'svelte';
	import C4 from '$lib/assets/C4.mp3';
	import { data } from '../../tmp/demo';
	import Music from '../../lib/music';
	import type { ContributionCalendar } from '../../lib/music';

	const music = new Music().fromContributionCalendar(
		data.data.user.contributionsCollection.contributionCalendar as ContributionCalendar
	);

	let onPlay = () => {};
	let onStop = () => {};

	onMount(async () => {
		const Tone = await import('tone');
		const sampler = new Tone.Sampler({
			urls: {
				C4: C4
			}
		}).toDestination();
		new Tone.Sequence(
			(time, note) => {
				sampler.triggerAttackRelease(note, '16n', time);
			},
			['C4', null, 'D4', 'E4', 'G4', 'A4', 'G4']
		).start(0);
		new Tone.Sequence(
			(time, note) => {
				sampler.triggerAttackRelease(note, '16n', time);
			},
			['C5', 'D5', null, 'E5', 'G5', 'A5', 'G5']
		).start(0);
		onPlay = async () => {
			await sampler.context.resume();
			Tone.Transport.start();
		};
		onStop = async () => {
			Tone.Transport.pause();
		};
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={onPlay}>start</button>
<button on:click={onStop}>stop</button>
