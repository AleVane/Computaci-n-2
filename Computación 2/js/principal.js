// Efecto de desplazamiento suave para enlaces
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        e.preventDefault();
        
        const idDestino = this.getAttribute('href');
        if (idDestino === '#') return;
        
        const elementoDestino = document.querySelector(idDestino);
        if (elementoDestino) {
            window.scrollTo({
                top: elementoDestino.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de encabezado al hacer scroll
window.addEventListener('scroll', function() {
    const encabezado = document.querySelector('header');
    if (window.scrollY > 100) {
        encabezado.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        encabezado.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        encabezado.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        encabezado.style.background = 'var(--blanco)';
    }
});

// Animaciones al aparecer en el viewport
const animarAlScroll = () => {
    const elementos = document.querySelectorAll('.deslizar-izquierda, .deslizar-derecha, .deslizar-arriba, .fundido-entrada');
    
    elementos.forEach(elemento => {
        const posicionElemento = elemento.getBoundingClientRect().top;
        const posicionPantalla = window.innerHeight / 1.2;
        
        if (posicionElemento < posicionPantalla) {
            elemento.style.opacity = '1';
            elemento.style.transform = 'translate(0, 0)';
        }
    });
};

// Inicializar animaciones
window.addEventListener('load', animarAlScroll);
window.addEventListener('scroll', animarAlScroll);

// Inicializar elementos con animaciones
document.querySelectorAll('.tarjeta-herramienta').forEach((tarjeta, indice) => {
    tarjeta.style.opacity = '0';
    tarjeta.style.transition = 'all 0.5s ease';
    tarjeta.style.transitionDelay = `${indice * 0.1}s`;
    
    if (indice % 2 === 0) {
        tarjeta.classList.add('deslizar-izquierda');
        tarjeta.style.transform = 'translateX(-50px)';
    } else {
        tarjeta.classList.add('deslizar-derecha');
        tarjeta.style.transform = 'translateX(50px)';
    }
});

// Formulario de contacto
const formularioContacto = document.getElementById('formularioContacto');
if (formularioContacto) {
    formularioContacto.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación simple
        const nombre = this.elements['nombre'].value;
        const email = this.elements['email'].value;
        const mensaje = this.elements['mensaje'].value;
        
        if (!nombre || !email || !mensaje) {
            alert('Por favor completa todos los campos requeridos.');
            return;
        }
        
        // Simular envío
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        this.reset();
    });
}