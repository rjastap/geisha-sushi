document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Resaltar sección actual en el menú de navegación
    const sections = document.querySelectorAll('h2[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Variables para el zoom
    const root = document.documentElement;
    const ZOOM_STEP = 0.1;
    const MIN_ZOOM = 0.8;
    const MAX_ZOOM = 2;
    let currentZoom = 1;

    // Obtener los botones
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');

    // Función para actualizar el zoom
    function updateZoom(newZoom) {
        currentZoom = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
        root.style.setProperty('--base-font-size', `${16 * currentZoom}px`);
        
        // Guardar la preferencia del usuario
        localStorage.setItem('userZoomPreference', currentZoom);
        
        // Actualizar estado de los botones
        zoomInBtn.disabled = currentZoom >= MAX_ZOOM;
        zoomOutBtn.disabled = currentZoom <= MIN_ZOOM;
    }

    // Cargar preferencia guardada
    const savedZoom = localStorage.getItem('userZoomPreference');
    if (savedZoom) {
        updateZoom(parseFloat(savedZoom));
    }

    // Event listeners para los botones
    zoomInBtn.addEventListener('click', () => updateZoom(currentZoom + ZOOM_STEP));
    zoomOutBtn.addEventListener('click', () => updateZoom(currentZoom - ZOOM_STEP));
    resetZoomBtn.addEventListener('click', () => updateZoom(1));

    // Soporte para atajos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === '=' || e.key === '+') {
                e.preventDefault();
                updateZoom(currentZoom + ZOOM_STEP);
            } else if (e.key === '-') {
                e.preventDefault();
                updateZoom(currentZoom - ZOOM_STEP);
            } else if (e.key === '0') {
                e.preventDefault();
                updateZoom(1);
            }
        }
    });

    // Manejar el scroll horizontal en la barra de navegación
    const nav = document.querySelector('.nav-links');
    let isScrolling = false;
    let startX;
    let scrollLeft;

    nav.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - nav.offsetLeft;
        scrollLeft = nav.scrollLeft;
    });

    nav.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    nav.addEventListener('mouseup', () => {
        isScrolling = false;
    });

    nav.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - nav.offsetLeft;
        const walk = (x - startX) * 2;
        nav.scrollLeft = scrollLeft - walk;
    });
}); 