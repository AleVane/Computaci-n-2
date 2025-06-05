// Animación de confeti mejorada
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del confeti
    const cantidadConfeti = 150;
    const duracionAnimacion = '5s';
    const colores = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
                    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    // Crear contenedor de confeti
    const contenedorConfeti = document.createElement('div');
    contenedorConfeti.style.position = 'fixed';
    contenedorConfeti.style.top = '0';
    contenedorConfeti.style.left = '0';
    contenedorConfeti.style.width = '100%';
    contenedorConfeti.style.height = '100%';
    contenedorConfeti.style.pointerEvents = 'none';
    contenedorConfeti.style.zIndex = '1000';
    contenedorConfeti.style.overflow = 'hidden';
    document.body.appendChild(contenedorConfeti);

    // Tipos de formas para el confeti
    const formasConfeti = [
        { tipo: 'circulo', estilo: 'border-radius: 50%' },
        { tipo: 'rectangulo', estilo: 'border-radius: 2px' },
        { tipo: 'triangulo', estilo: 'width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 10px solid' },
        { tipo: 'rombo', estilo: 'transform: rotate(45deg); border-radius: 2px' }
    ];

    // Función para crear un elemento de confeti
    function crearParticulaConfeti(indice) {
        const forma = formasConfeti[Math.floor(Math.random() * formasConfeti.length)];
        const color = colores[Math.floor(Math.random() * colores.length)];
        const tamaño = Math.random() * 10 + 5;
        const rotacionInicial = Math.random() * 360;
        const opacidad = Math.random() * 0.7 + 0.3;
        
        const particula = document.createElement('div');
        particula.style.position = 'absolute';
        particula.style.width = `${tamaño}px`;
        particula.style.height = `${forma.tipo === 'triangulo' ? '0' : tamaño}px`;
        particula.style.backgroundColor = forma.tipo !== 'triangulo' ? color : 'transparent';
        particula.style.borderBottomColor = forma.tipo === 'triangulo' ? color : 'transparent';
        particula.style.opacity = opacidad;
        particula.style.zIndex = '1000';
        particula.style.pointerEvents = 'none';
        particula.style.cssText += forma.estilo;
        
        // Posición inicial aleatoria
        const posicionInicialX = Math.random() * window.innerWidth;
        particula.style.left = `${posicionInicialX}px`;
        particula.style.top = '-20px';
        
        // Configuración de la animación
        const desplazamientoX = (Math.random() - 0.5) * 200;
        const rotacionFinal = rotacionInicial + (Math.random() * 360 * 3);
        const duracion = Math.random() * 3 + 3;
        const retraso = Math.random() * 5;
        
        const nombreAnimacion = `animacionConfeti${indice}`;
        
        // Crear keyframes dinámicos
        const keyframes = `
            @keyframes ${nombreAnimacion} {
                0% {
                    transform: translate(0, 0) rotate(${rotacionInicial}deg);
                }
                100% {
                    transform: translate(${desplazamientoX}px, ${window.innerHeight + 20}px) rotate(${rotacionFinal}deg);
                }
            }
        `;
        
        const estiloAnimacion = document.createElement('style');
        estiloAnimacion.innerHTML = keyframes;
        document.head.appendChild(estiloAnimacion);
        
        particula.style.animation = `${nombreAnimacion} ${duracion}s linear ${retraso}s forwards`;
        contenedorConfeti.appendChild(particula);
        
        // Eliminar partícula y su estilo después de la animación
        setTimeout(() => {
            particula.remove();
            estiloAnimacion.remove();
        }, (duracion + retraso) * 1000);
    }

    // Función para lanzar confeti
    function lanzarConfeti() {
        // Limpiar confeti existente
        contenedorConfeti.innerHTML = '';
        
        // Crear nuevas partículas
        for (let i = 0; i < cantidadConfeti; i++) {
            setTimeout(() => {
                crearParticulaConfeti(i);
            }, i * 30);
        }
    }

    // Lanzar confeti al cargar y cada 15 segundos
    lanzarConfeti();
    setInterval(lanzarConfeti, 15000);

    // Lanzar confeti al hacer clic en cualquier parte
    document.addEventListener('click', function(e) {
        // Ajustar la posición inicial basada en el clic
        const posicionX = e.clientX;
        const particulasExtra = 30;
        
        for (let i = 0; i < particulasExtra; i++) {
            setTimeout(() => {
                const particula = document.createElement('div');
                const forma = formasConfeti[Math.floor(Math.random() * formasConfeti.length)];
                const color = colores[Math.floor(Math.random() * colores.length)];
                const tamaño = Math.random() * 8 + 4;
                const rotacionInicial = Math.random() * 360;
                
                particula.style.position = 'absolute';
                particula.style.width = `${tamaño}px`;
                particula.style.height = `${forma.tipo === 'triangulo' ? '0' : tamaño}px`;
                particula.style.backgroundColor = forma.tipo !== 'triangulo' ? color : 'transparent';
                particula.style.borderBottomColor = forma.tipo === 'triangulo' ? color : 'transparent';
                particula.style.opacity = Math.random() * 0.7 + 0.3;
                particula.style.zIndex = '1000';
                particula.style.pointerEvents = 'none';
                particula.style.left = `${posicionX + (Math.random() - 0.5) * 50}px`;
                particula.style.top = `${e.clientY}px`;
                particula.style.cssText += forma.estilo;
                
                const desplazamientoX = (Math.random() - 0.5) * 300;
                const rotacionFinal = rotacionInicial + (Math.random() * 360 * 4);
                const duracion = Math.random() * 2 + 2;
                
                const nombreAnimacion = `animacionConfetiClick${i}`;
                
                const keyframes = `
                    @keyframes ${nombreAnimacion} {
                        0% {
                            transform: translate(0, 0) rotate(${rotacionInicial}deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(${desplazamientoX}px, ${window.innerHeight}px) rotate(${rotacionFinal}deg);
                            opacity: 0;
                        }
                    }
                `;
                
                const estiloAnimacion = document.createElement('style');
                estiloAnimacion.innerHTML = keyframes;
                document.head.appendChild(estiloAnimacion);
                
                particula.style.animation = `${nombreAnimacion} ${duracion}s ease-out forwards`;
                contenedorConfeti.appendChild(particula);
                
                setTimeout(() => {
                    particula.remove();
                    estiloAnimacion.remove();
                }, duracion * 1000);
            }, i * 50);
        }
    });
});