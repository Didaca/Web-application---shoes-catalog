import { render } from "./node_modules/lit-html/lit-html.js";
import { logout } from "./src/api/api.js";
import { getUserData } from "./util.js";
import page from '../node_modules/page/page.mjs';
import { homePage } from "./src/views/homePage.js";
import { loginPage } from "./src/views/loginPage.js";
import { registerPage } from "./src/views/registerPage.js";
import { dashboardPage } from "./src/views/dashboardPage.js";
import { detailsPage } from "./src/views/detailsPage.js";
import { editPage } from "./src/views/editPage.js";
import { createShoesPage } from "./src/views/createShoesPage.js";
import { searchingPage } from "./src/views/searchingPage.js";




let main = document.querySelector('main');


function decoratePage(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.updateNav = updateNav;
    
    next()
}

export function updateNav() {
    let userData = getUserData();

    if(userData != undefined) {
        document.querySelector('.user').style.display = 'inline-flex';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

document.querySelector('#logoutBtn').addEventListener('click', (e) => {
    logout();
    updateNav();
    page.redirect('/dashboard')
})

page(decoratePage);
page('/index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/addPair', createShoesPage);
page('/search', searchingPage);
updateNav();
page.start();