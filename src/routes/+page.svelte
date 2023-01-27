<script lang="ts">
	import LoginButton from '../lib/components/LoginButton.svelte';

	let name = '';
	let title = '';
	let idList: String[] = [];
	let idStr: String = "";


	$: disabledCreateButton = title === '';

  // 作成ボタンを押したときの処理
  const handleClickCreateButton = () => {
    idList = [...idList, title];
    title = '';
		console.log(idList);
		let strlist = idList.toString();
		console.log(strlist);
  };

	const createParams = () => {
		idStr = "[ " + idList.toString() + " ]";
		console.log(idStr);
	};

	// 完了処理
  const completeItem = (index) => {
    idList = idList.filter((_, i) => i !== index);
  };
	
	// $:{
	// 	console.log(idList);
	// 	const strlist = idList.toString();
	// 	console.log(strlist);
	// 	let idString = "[ " + idList.toString() + " ]";
	// 	console.log(idString);
	// }


	// const queryToParams = (queList) => {
	// 	for (queList.length >= 0) {

	// 	}
	//}
</script>

<svelte:head>
	<title>ToDo</title>
</svelte:head>

<section>
	<h1>Grass Band</h1>
	<h2>Githubアカウントにログイン</h2>
	<form>
		<input
			class="github-acc"
			type="text"
			name="github-account"
			bind:value={title}
			placeholder="Github ID"
		/>
	</form>
	<button disabled={disabledCreateButton} on:click={handleClickCreateButton}>
		作成
	</button>
	{#if idList.length !== 0}
		<ul class="list-parent">
			{#each idList as todoItem, index}
				<li>
					<a>{todoItem}</a>
					<div class="dli-container">
						<span class="dli-close" on:click={() => completeItem(index)}></span>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
	<LoginButton on:Click={() => {}} destination={`./music?userId=${idStr}`}
			name="ログイン"/>
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

	button {
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

	button:hover,
	button:focus {
		background-color: rgba(255, 255, 255, 0.425);
		color: #1d3052;
	}

	button:focus {
		box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.425);
	}

	button:active {
		background-color: rgba(255, 255, 255, 0.425);
		box-shadow: none;
		color: #1d3052;
	}
	.list-parent {
		list-style: none;
		width: 250px;
		border-top: 1px solid #fff;
		border-right: 1px solid #fff;
		border-left: 1px solid #fff;
		border-radius: 2px;
		padding: 0;
	}
	.list-parent li {
		display: flex;
		color: #fff;
		border-bottom: 1px solid #fff;
		padding: 5px 15px;
		justify-content: space-between;
	}
	.dli-close {
		display: inline-block;
		vertical-align: middle;
		color: #fff;
		line-height: 1;
		width: 1em;
		height: 0.1em;
		background: currentColor;
		border-radius: 0.1em;
		position: relative;
		transform: rotate(45deg);
	}

	.dli-close::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		background: inherit;
		border-radius: inherit;
		transform: rotate(90deg);
	}
</style>
