import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../../util.js";
import { searchShoes } from "../api/data.js";


let createTemplateToSearch = (func, shoes, user) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${func} class="search-wrapper cf">
    <input
        id="#search-input"
        type="text"
        name="search"
        placeholder="Search here..."
        required
    />
    <button type="submit">Search</button>
    </form>
    <h3>Results:</h3>
    ${shoes ? html`
    ${shoes.length != 0 ? shoes.map(e =>html`
    <div id="search-container">
    <ul class="card-wrapper">
        <li class="card">
            <img src="${e.imageUrl}" alt="travis" />
            <p>
            <strong>Brand: </strong><span class="brand">${e.brand}</span>
            </p>
            <p>
            <strong>Model: </strong
            ><span class="model">${e.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${e.value}</span>$</p>
            ${user != null ? html`<a class="details-btn" href="/details/${e._id}">Details</a>` : ''}
        </li>
    </ul>`): html`<h2>There are no results found.</h2>`}
    </div>`: ''}
</section>`

export async function searchingPage(ctx) {
    let brand = ctx.querystring.split('=')[1];
    let userData = getUserData();
    let sh_oes = undefined;

    if(brand) {
        sh_oes = await searchShoes(decodeURIComponent(brand));
    }

    ctx.render(createTemplateToSearch(onSearch, sh_oes, userData));

    async function onSearch(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let brandToSearch = formData.get('search').trim();

        if(brandToSearch == '') {
            return alert('Fields is empty!')
        }

        ctx.page.redirect('/search?search=' + encodeURIComponent(brandToSearch));

    }
}