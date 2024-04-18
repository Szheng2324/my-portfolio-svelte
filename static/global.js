console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}
let pages = [
	{url: "./", title: "Home"},
    {url: "contact", title: "Contact"},
	{url: "projects", title: "Projects"},
    {url: "resume", title: "Resume"},
    {url: "meta", title: "Meta"},

    
    {url: "https://github.com/Szheng2324", title: "GitHub"},
	// add the rest of your pages here
];
let nav = document.createElement("nav");
nav.classList.add('menu')
document.body.prepend(nav);
//const ARE_WE_HOME = document.documentElement.classList.contains("Home");//

for (let p of pages) {
	let url = p.url;
	let title = p.title;
   
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    // console.log(a.host, location.host, a.pathname, location.pathname)
    //a.classList.add("nav");
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }else{
        a.target = "_blank";
    }
    a.classList.add('nav-link')
    nav.append(a);
}

/*document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select>
        <option value ="light dark">Automatic</option>
            <option value ="light">Light</option>
            <option value ="dark">Dark</option>
		</select>
	</label>`
);

const select = document.querySelector("select");
select.addEventListener("input", function (event) {
	console.log("color scheme changed to", event.target.value);
    document.documentElement.style.setProperty("color-scheme", event.target.value);
    localStorage.colorScheme = event.target.value;
});
if("colorScheme" in localStorage){
    document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}*/
