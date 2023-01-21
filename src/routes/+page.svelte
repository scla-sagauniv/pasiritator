<script>
	import Button from '../lib/components/Button.svelte';

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
	<Button onClick={() => {}} destination={`./music?userId=${name}`} />
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
