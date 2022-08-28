import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../../util.js";
import { deleteShoes, getDetails } from "../api/data.js";



let createTemplateD = (shoes, Owner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
        <img src="${shoes.imageUrl}" alt="example1" />
    </div>
    <div id="info-wrapper">
        <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
        <p>
        Model: <span id="details-model">${shoes.model}</span>
        </p>
        <p>Release date: <span id="details-release">${shoes.release}</span></p>
        <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
        <p>Value: <span id="details-value">${shoes.value}</span></p>
    </div>
    ${Owner == true ? html`
        <div id="action-buttons">
            <a href="/edit/${shoes._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript: void(0)" id="delete-btn">Delete</a>
        </div>` : ''}
    </div>
</section>`




export async function detailsPage(ctx) {
    let shoesId = ctx.params.id;
    let shoes = await getDetails(shoesId);

    let userData = getUserData();
    let userId = '';

    if(userData) {
        userId = userData.id;
    }
    
    let is_Owner = userId == shoes._ownerId;


    ctx.render(createTemplateD(shoes, is_Owner, onDelete))

    async function onDelete() {
        await deleteShoes(shoesId);
        ctx.page.redirect('/dashboard');
    }
}