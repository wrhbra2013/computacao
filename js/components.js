const isInPages = window.location.pathname.includes('/pages/');
const basePath = isInPages ? '../' : '';

const navItems = [
    { href: basePath + 'index.html', label: 'Início' },
    { href: basePath + 'pages/semestre1.html', label: '1º Semestre' },
    { href: basePath + 'pages/semestre2.html', label: '2º Semestre' },
    { href: basePath + 'pages/semestre3.html', label: '3º Semestre' },
    { href: basePath + 'pages/semestre4.html', label: '4º Semestre' },
    { href: basePath + 'pages/semestre5.html', label: '5º Semestre' },
    { href: basePath + 'pages/semestre6.html', label: '6º Semestre' },
    { href: basePath + 'pages/semestre7.html', label: '7º Semestre' },
    { href: basePath + 'pages/semestre8.html', label: '8º Semestre' },
    { href: basePath + 'pages/semestre9.html', label: '9º Semestre' },
    { href: basePath + 'pages/semestre10.html', label: '10º Semestre' }
];

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) return basePath + 'index.html';
    return path.split('/').pop();
}

function loadComponents() {
    const currentPage = getCurrentPage();
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu) {
        navMenu.innerHTML = navItems.map(item => {
            const isActive = currentPage === item.href.split('/').pop();
            return `<li><a href="${item.href}" ${isActive ? 'class="active"' : ''}>${item.label}</a></li>`;
        }).join('');
    }
}

async function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;
    
    try {
        const response = await fetch(basePath + 'components/header.html');
        const html = await response.text();
        headerContainer.innerHTML = html;
        loadComponents();
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
