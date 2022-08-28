import { html } from "../../node_modules/lit-html/lit-html.js";
import { createShoes } from "../api/data.js";



let createTemplateCreate = (func) => html`
<section id="create">
    <div class="form">
    <h2>Add item</h2>
    <form @submit=${func} class="create-form">
        <input
        type="text"
        name="brand"
        id="shoe-brand"
        placeholder="Brand"
        />
        <input
        type="text"
        name="model"
        id="shoe-model"
        placeholder="Model"
        />
        <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
        />
        <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
        />
        <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
        />
        <input
        type="text"
        name="value"
        id="shoe-value"
        placeholder="Value"
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>`


export async function createShoesPage(ctx) {
    ctx.render(createTemplateCreate(onSubmit));

    async function onSubmit(e) {
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

        await createShoes(shoesForm);
        ctx.page.redirect('/dashboard');

    }
}