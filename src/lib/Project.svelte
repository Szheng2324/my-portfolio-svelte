<script>
    export let info = {};
    // let p = info;
    export let hLevel = 2;
</script>
<style>
    article {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 4;
    }

    h2 {
        margin: 0;
    }
    h3 {
        margin: 0;
    }


</style>
<article>
    <svelte:element this={"h" + hLevel}>{ info.title }</svelte:element>
    <p> {info.year} </p>
    <img src={info.image} alt="">
    <p>{info.description}</p>
</article>