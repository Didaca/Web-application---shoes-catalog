import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/api.js";




let createTemplateLogin = (func) => html`
<section id="login">
    <div class="form">
    <h2>Login</h2>
    <form @submit=${func} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
        Not registered? <a href="/register">Create an account</a>
        </p>
    </form>
    </div>
</section>`



export async function loginPage(ctx) {
    ctx.render(createTemplateLogin(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        if(email == '' || password == '') {
            return alert('Fill all fields!')
        }

        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/dashboard');
    }
}