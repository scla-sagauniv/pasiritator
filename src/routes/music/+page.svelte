<script lang="ts">
	let ins: string = '';
	import { onMount } from 'svelte';
	// 音源インポート
	import C4 from '$lib/assets/defaultC4.mp3';
	import base from '$lib/assets/baseC4.mp3';
	import dram from '$lib/assets/dramC4.mp3';
	import hat from '$lib/assets/hatC4.mp3';
	import snere from '$lib/assets/snereC4.mp3';
	// import { data } from '../../tmp/demo';
	// import { data } from '../../tmp/bikiniki';
	import Music, { weekDayKeys, type Score, type ContributionCalendar } from '../../lib/music';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import Pulldown from '$lib/components/Pulldown.svelte';
	import { log } from 'tone/build/esm/core/util/Debug';
	let insValue = "default";
	export let data = undefined;
	let userId: string = '';
	const fetchContributions = async (userId: string): Promise<ContributionCalendar> => {
		const now = new Date();
		const to = now.toISOString();
		now.setFullYear(now.getFullYear() - 1);
		const from = now.toISOString();
		// const query = `
		// { "query": "query { viewer { login }}"}
		// `
		const query = {
			query: `query contributions {
          user(login: "${userId}") {
            contributionsCollection(from: "${from}", to: "${to}") {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`
		};
		console.log(query);


		const token = import.meta.env.VITE_KEY1;
		const headers = {
			Authorization: `bearer ${token}`,
			'Content-type': 'application/json'
		};
		const res = await axios.post('https://api.github.com/graphql', query, { headers: headers });
		console.log('res.data:', res.data);

		return res.data.data.user.contributionsCollection.contributionCalendar;
	};

	let music: Music = new Music();

	let isPlaying = false;
	const togglePlaying = () => {
		isPlaying = !isPlaying;
	};

	let onPlay = () => {};
	let onStop = () => {};

	onMount(async () => {
		userId = data.userId;
		if (!userId) {
			goto('/');
			return;
		}
		const Tone = await import('tone');
		console.log(userId);
		await fetchContributions(userId).then((res) => {
			music = new Music().fromContributionCalendar(res as ContributionCalendar);
			console.log('music.score:', music.score);
		});


		const pianoSampler = new Tone.Sampler({
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
	$: {
		console.log('koko', insValue);	
	}
		
</script>

<div class="play-container">
	<Pulldown bind:value={insValue} id={userId} />
	<div class="full">
		{#if !isPlaying}
			<div class="video_play" on:click={onPlay} />
		{:else}
			<div class="video_pause" on:click={onStop} />
		{/if}
	</div>
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
