if (localStorage.getItem('theme') == 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.getElementById('daynightmodetoggle').checked = true;
} else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    document.getElementById('daynightmodetoggle').checked = false;
}
function daynightmode() {
    if (daynightmodetoggle.checked) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

const daynightmodetoggle = document.getElementById('daynightmodetoggle');
daynightmodetoggle.addEventListener('change', () => {
    daynightmode();
});