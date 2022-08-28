import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes } from "../api/data.js";

export let singleshoes = (shoes) => html`
<li class="card">
    <img src="${shoes.imageUrl}" alt="travis" />
    <p>
    <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
    </p>
    <p>
    <strong>Model: </strong
    ><span class="model">${shoes.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
    <a class="details-btn" href="/details/${shoes._id}">Details</a>
</li>`

let createTemplateCg = (all_shoes) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper"> 
    ${all_shoes.length == 0 
        ? html`<h2>There are no items added yet.</h2>`
    : html`${all_shoes.map(singleshoes)}`}
    </ul>
</section>`


export async function dashboardPage(ctx) {
    let all_shoes = await getAllShoes();
    ctx.render(createTemplateCg(all_shoes));
}