<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    
</script>
 <h1>{ projects.length } Projects</h1>  
    <div class="projects">
        {#each projects as p}
        <Project info={p} />
        {/each}
   
        <!-- <article>
            <h2>Beatae corporis est quisquam.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Aspernatur, ex mollitia hic maxime vitae eius, eum sed labore debitis ducimus magnam dolorem voluptatibus, quae veniam dicta commodi. Doloribus obcaecati nesciunt officia quas, impedit dignissimos odio repellendus similique? Officiis?</p>
        </article> -->
        <!-- <article>
            <h2>Ducimus corrupti perspiciatis nisi!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Commodi deserunt dolores dignissimos provident incidunt quo, autem modi veniam nesciunt maiores, voluptate temporibus expedita corrupti, illo aut facere voluptatem ratione enim repellat voluptates atque! Quis alias dolorem quaerat? Recusandae.</p>
        </article>
        <article>
            <h2>Laudantium eaque amet veritatis?</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Necessitatibus placeat nulla et repellat, at explicabo ipsum veniam maiores numquam obcaecati itaque sunt quis ducimus laudantium sint velit harum nam? Et tempora corporis in similique, animi eveniet rem dolores.</p>
        </article>
        <article>
            <h2>Aliquid necessitatibus natus illo!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Eos quidem dolores temporibus quas consequatur, unde, excepturi voluptatum incidunt quae sequi earum repellat fuga, tempore impedit praesentium quasi velit omnis ipsam asperiores illo harum placeat tenetur hic. Labore, consequatur?</p>
        </article>
        <article>
            <h2>Quisquam fugiat sequi tempora!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Doloribus cumque ex magnam repellat, illo ab. Rem esse nostrum molestias eum assumenda porro at quis, modi suscipit corrupti laudantium distinctio et adipisci temporibus soluta a fugit voluptates veniam! Possimus.</p>
        </article>
        <article>
            <h2>Fuga perspiciatis quam minus?</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>In quis dolore perspiciatis nisi, reprehenderit alias ratione, ea soluta unde blanditiis aspernatur assumenda natus quos molestiae exercitationem. Deserunt cum perspiciatis aperiam animi dolorem velit veniam nostrum fugiat culpa optio.</p>
        </article>
        <article>
            <h2>Dignissimos aspernatur necessitatibus cupiditate?</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Quod suscipit nobis ullam sequi exercitationem repudiandae maiores sit architecto sapiente neque error, voluptas quos temporibus! Incidunt quia, cumque culpa et odit explicabo vel quisquam dolores cum, esse, velit aspernatur.</p>
        </article>
        <article>
            <h2>Exercitationem vero laboriosam voluptatem.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Hic voluptate sapiente reprehenderit error, voluptas dolore iusto tempora delectus nobis ullam quisquam non ipsa quia officia recusandae? Atque et itaque eveniet velit architecto. Explicabo laboriosam ea cupiditate consequatur mollitia.</p>
        </article>
        <article>
            <h2>Repudiandae dignissimos vero temporibus!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Alias reprehenderit iure animi esse iste saepe amet rem, voluptates deleniti beatae atque nesciunt excepturi impedit. Nesciunt voluptatum nihil, quia in eos illum debitis magnam repudiandae dolore consequatur ea harum!</p>
        </article>
        <article>
            <h2>Ab nostrum voluptatem ipsam.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Minima quod in animi perferendis dicta eos accusantium veniam laboriosam necessitatibus? Iste eveniet fuga incidunt magni eaque beatae necessitatibus voluptates laudantium quam quibusdam. Perspiciatis, adipisci ut culpa at deleniti cumque.</p>
        </article>
        <article>
            <h2>Consectetur aut a tempora?</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Fugit et ad repellat at, debitis ducimus ab earum cupiditate! Est nemo voluptates a, ex cumque ullam nam sed ipsam autem, labore debitis minima velit non. Expedita nostrum consequatur a.</p>
        </article> -->

    </div>
    






