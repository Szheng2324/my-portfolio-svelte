<!--<h1>Welcome to SvelteKit</h1>-->
<!--<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>-->
<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    
</script>
<svelte:head>
	<title>Home</title>
</svelte:head>
<h2>Latest Pojects</h2>
    <div class = "projects">
    {#each projects.slice(0,3) as p}
    <Project info = {p} hLevel=3/>
    {/each}
</div>
<body>
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

</body>