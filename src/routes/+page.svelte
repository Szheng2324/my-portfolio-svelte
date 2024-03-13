<!--<h1>Welcome to SvelteKit</h1>-->
<!--<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>-->
<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    //let profileData = fetch("https://api.github.com/users/szheng2324");
    let profileData = {
        ok: true,
        json: async () => ({
            followers: 100,
            following: 100,
            public_repos: 100,
            public_gists: 100,
        })
    };

    
</script>
<svelte:head>
	<title>Home</title>
</svelte:head>


    <h1>Home</h1>
    <!--<nav class="menu">
        <a target="_blank"href="index.html">Home</a>
        <a class = "nav" target="_blank"href="contact/index.html">Contact</a>
        <a class = "nav" target="_blank"href="projects/index.html">Projects</a>
        <a class = "nav" target="_blank"href="resume.html">Resume</a>
        <a class = "nav" target="_blank"href="https://github.com/Szheng2324">GitHub</a>

    </nav>-->
    <h1>Shelley Zheng</h1>
    <p>Hello, welcome to my website.</p>
    <img class="fit-picture" src="images/download.jpg" alt="picture of heart">
    <section>
        <h2>My GitHub Stats</h2>
        {#await fetch("https://api.github.com/users/szheng2324") }
	        <p>Loading...</p>
        {:then response}
            {#await response.json()}
                <p>Decoding...</p>
            {:then data}
            <dl>
                <dt>Followers: </dt>
                <dd>{data.followers}</dd>
              
                <dt>Following: </dt>
                <dd>{data.following}</dd>
              
                <dt>Public Repos: </dt>
                <dd>{data.public_repos}</dd>
            </dl>
            {:catch error}
                <p class="error">
                    Something went wrong: {error.message}
                </p>
            {/await}
        {:catch error}
            <p class="error">
                Something went wrong: {error.message}
            </p>
        {/await}
       
          
        

    </section>
    <h2>Latest Pojects</h2>
    <div class = "projects">
    {#each projects.slice(0,3) as p}
    <Project info = {p} hLevel=3/>
    {/each}
</div>
    

