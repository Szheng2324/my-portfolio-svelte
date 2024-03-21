

<script>
   
    export let info = {};
    let p = info;
    export let hLevel = 2;
</script>

<article>
    <svelte:element this={"h" + hLevel}>{ p.title }</svelte:element>
    <p>{p.year}</p>
    <!--<img src={p.image}/>-->

    <p>{p.description}</p>
</article>

  