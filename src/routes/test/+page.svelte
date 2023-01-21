<script lang="ts">
	import { onMount } from 'svelte';
	import C4 from '$lib/assets/C4.mp3';
	import { data } from '../../tmp/demo';
	import Music, { weekDayKeys, type Score } from '../../lib/music';
	import type { ContributionCalendar } from '../../lib/music';
	import { page } from '$app/stores';
	import axios from 'axios';

	export let userId;
	const fetchContributions = async (userId) => {
    const now = new Date()
    const to = now.toISOString();
    now.setFullYear(now.getFullYear() - 1)
    const from = now.toISOString();
    // const query = `
    // { "query": "query { viewer { login }}"}
    // `
    const query = {
      "query": `query contributions {
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

    const token = import.meta.env.VITE_KEY1
    const headers = {
      'Authorization': `bearer ${token}`,
      'Content-type': 'application/json'
    }
    const res = await axios.post('https://api.github.com/graphql', query, {headers: headers});
    
  }

	const music = new Music().fromContributionCalendar(
		fetchContributions(userId) as unknown as ContributionCalendar
	);
	console.log(music.score);

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
