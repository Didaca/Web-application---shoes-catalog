import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/api.js";



let createTemplateR = (func) => html`
<section id="register">
    <div class="form">
    <h2>Register</h2>
    <form @submit=${func} class="login-form">
        <input
        type="text"
        name="email"
        id="register-email"
        placeholder="email"
        />
        <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
        />
        <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
        />
        <button type="submit">login</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
    </div>
</section>`


export async function registerPage(ctx) {
    ctx.render(createTemplateR(onSubmit_r));

    async function onSubmit_r(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let re_pass = formData.get('re-password').trim();

        if(email == '' || password == '') {
            return alert('Fill all fields!');
        }

        if(password !== re_pass) {
            return alert('All Passwords must be the same!')
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/dashboard');
    }
}