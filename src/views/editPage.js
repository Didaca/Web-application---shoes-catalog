import { html } from "../../node_modules/lit-html/lit-html.js";
import { editShoes, getDetails } from "../api/data.js";



let createTemplateEdit = (func, shoes) => html`
<section id="edit">
    <div class="form">
    <h2>Edit item</h2>
    <form @submit=${func} class="edit-form">
        <input
        type="text"
        name="brand"
        id="shoe-brand"
        placeholder="Brand"
        value="${shoes.brand}"
        />
        <input
        type="text"
        name="model"
        id="shoe-model"
        placeholder="Model"
        value="${shoes.model}"
        />
        <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
        value="${shoes.imageUrl}"
        />
        <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
        value="${shoes.release}"
        />
        <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
        value="${shoes.designer}"
        />
        <input
        type="text"
        name="value"
        id="shoe-value"
        placeholder="Value"
        value="${shoes.value}"
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>`



export async function editPage(ctx) {
    let shoesId = ctx.params.id;
    let shoes = await getDetails(shoesId);
    ctx.render(createTemplateEdit(onEdit, shoes));

    async function onEdit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let brand = formData.get('brand').trim();
        let model = formData.get('model').trim();
        let imageUrl = formData.get('imageUrl');
        let release = formData.get('release').trim();
        let designer = formData.get('designer').trim();
        let value = formData.get('value').trim();

        if(brand == '' || model == '' || imageUrl == '' || release == '' || designer == '' || value == '') {
            return alert('Fill all fields!')
        }

        let shoesForm = {
            brand,
            model,
            imageUrl,
            release,
            designer,
            value
        }

        await editShoes(shoesId, shoesForm);
        ctx.page.redirect(`/details/${shoesId}`);

    }
}