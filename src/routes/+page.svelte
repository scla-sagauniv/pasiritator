<script>
  import Button from '../lib/components/Button.svelte';
</script>

<svelte:head>
	<title>ToDo</title>
</svelte:head>

<section>
  <h1>Githubの草で音を出そう！！</h1>
  <h2>Githubアカウントにログイン</h2>
  <form>
    <input class="github-acc" type="text" name="github-account" value="Github ID">
  </form>
  <Button />
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
    font-size: 42px;
    color: #FEBD69;
    margin: 25px 0;
  }
  h2 {
    font-size: 32px;
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
    width: 400px;
  }
</style>