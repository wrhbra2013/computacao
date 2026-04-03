const isInPages = window.location.pathname.includes('/pages/');
const basePath = isInPages ? '../' : '';

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) return 'index.html';
    return path.split('/').pop();
}

function loadComponents() {
    const currentPage = getCurrentPage();
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;
    
    const links = navMenu.querySelectorAll('a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href.split('/').pop() === currentPage) {
            link.classList.add('active');
        }
        
        if (isInPages && href.startsWith('pages/')) {
            link.setAttribute('href', '../' + href);
        }
    });
}

async function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;
    
    try {
        const response = await fetch(basePath + 'components/header.html');
        const html = await response.text();
        headerContainer.innerHTML = html;
        setTimeout(loadComponents, 0);
    } catch (e) {
        console.error('Erro ao carregar header:', e);
    }
}

async function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    try {
        const response = await fetch(basePath + 'components/footer.html');
        const html = await response.text();
        footerContainer.innerHTML = html;
    } catch (e) {
        console.error('Erro ao carregar footer:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
});
