<script>
  import Button from '../lib/components/Button.svelte';
  import axios from 'axios';

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
    const token = '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';
    const headers = {
      'Authorization': `bearer ${token}`,
      'Content-type': 'application/json'
    }
    const res = await axios.post('https://api.github.com/graphql', query, {headers: headers});
    console.log(res.data);
  }
  // const arrayEdit = async (readata) => {
    
  // }
  let name = "Github ID";

</script>

<svelte:head>
	<title>ToDo</title>
</svelte:head>

<section>
  <h1>Githubの草で音を出そう！！</h1>
  <h2>Githubアカウントにログイン</h2>
  <form>
    <input class="github-acc" type="text" name="github-account" bind:value={name}>
  </form>
  <Button onClick={() => fetchContributions(`${name}`)}/>
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