<script>
	import Button from '../lib/components/Button.svelte';
	import axios from 'axios';
	// require('dotenv').config();
	// console.log(process.env.KEY1);  //=> VALUE1
	// console.log(process.env.KEY2);  //=> VALUE2
	// console.log(process.env.KEY3);  //=> VALUE3

	const fetchContributions = async (userId) => {
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
		console.log(res.data);
	};
	// const arrayEdit = async (readata) => {
	// }
	let name = '';
</script>

<svelte:head>
	<title>ToDo</title>
</svelte:head>

<section>
	<h1>Grass Base</h1>
	<h2>Githubアカウントにログイン</h2>
	<form>
		<input
			class="github-acc"
			type="text"
			name="github-account"
			bind:value={name}
			placeholder="Github ID"
		/>
	</form>
	<Button onClick={() => fetchContributions(`${name}`)} destination={`./music?userId=${name}`} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	h1 {
		font-size: 84px;
		color: #febd69;
		margin: 20px 0;
	}
	h2 {
		font-size: 24px;
		color: #fff;
		margin: 0;
	}
	form {
		margin-top: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.github-acc {
		margin: 0 auto;
		padding: 10px 30px;
		width: 250px;
	}
</style>
