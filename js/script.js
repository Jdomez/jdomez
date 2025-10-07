document.addEventListener('DOMContentLoaded', function() {
  const boxes = document.querySelectorAll('.box--top, .box--bottom');
  const sections = document.querySelector('section');
  const footer = document.querySelector('footer');
  const logoLoading = document.querySelector('.logo-loading--animated');
  let isHidden = true;

  function resetAnimation() {
    boxes.forEach(box => {
      box.classList.remove('in', 'out');
      box.classList.add('out');
    });
    sections.classList.remove('in', 'out');
    sections.classList.add('out');
    footer.classList.remove('in', 'out');
    footer.classList.add('out');
    logoLoading.classList.remove('in', 'out');
    logoLoading.classList.add('out');
    isHidden = true;
  }

  // Resetear la animación cuando la página se muestra (incluso desde el caché)
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      // La página fue restaurada desde el caché del navegador
      resetAnimation();
    }
  });

  // Inicialmente, desaparecen los bloques
  setTimeout(() => {
    resetAnimation();
    setTimeout(() => {
      sections.classList.add('out');
      footer.classList.add('out');
    }, 100);
  }, 1200);
  
  // Ajustamos el tiempo de desaparición del logo
  setTimeout(() => {
    logoLoading.classList.add('out');
  }, 700);

  document.querySelectorAll('.e').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      boxes.forEach(box => {
        if (isHidden) {
          box.classList.remove('out');
          box.classList.add('in');
          sections.classList.remove('out');
          sections.classList.add('in');
          footer.classList.remove('out');
          footer.classList.add('in');
          
          setTimeout(() => {
            logoLoading.classList.remove('out');
            logoLoading.classList.add('in');
          }, 500);
        } else {
          box.classList.remove('in');
          box.classList.add('out');
          sections.classList.remove('in');
          sections.classList.add('out');
          footer.classList.remove('in');
          footer.classList.add('out');
          logoLoading.classList.remove('in');
          logoLoading.classList.add('out');
        }
      });

      isHidden = !isHidden;

      setTimeout(() => {
        window.location.href = this.href;
      }, 1000);
    });
  });
});


const cursor = document.querySelector('.cursor');
const cursorText = document.querySelector('.cursor-arrow');
let currentX = 0;
let currentY = 0;
let targetX = -100;
let targetY = -100;
let scale = 1;

const easeAmount = 0.18;
const scaleAmount = 3; // Factor de escala cuando está sobre un enlace

document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    let target = e.target;
    while (target !== null) {
        if (target.tagName.toLowerCase() === 'a') {
            scale = scaleAmount;
            cursorText.classList.add('active');
            break;
        }
        target = target.parentElement;
    }
    if (target === null) {
        scale = 1;
        cursorText.classList.remove('active');
    }
});

function animate() {
    let dx = targetX - currentX;
    let dy = targetY - currentY;

    currentX += dx * easeAmount;
    currentY += dy * easeAmount;

    const cursorWidth = cursor.offsetWidth;
    const cursorHeight = cursor.offsetHeight;

    cursor.style.left = (currentX - cursorWidth / 2) + 'px';
    cursor.style.top = (currentY - cursorHeight / 2) + 'px';
    cursor.style.transform = `scale(${scale})`;

    requestAnimationFrame(animate);
}

animate();



function initTextReveal() {
  document.querySelectorAll('.text-reveal').forEach(element => {
    const topText = element.querySelector('.text-top');
    const bottomText = element.querySelector('.text-bottom');
    const text = topText.textContent;
    
    [topText, bottomText].forEach(textElement => {
      textElement.innerHTML = text.split('').map((char, i) => 
        `<span style="transition-delay: ${i * 30}ms">${char}</span>`
      ).join('');
    });
  });
}

initTextReveal();

'use strict';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

document.querySelectorAll(".project").forEach((element) => {
  gsap.to(element, {
    opacity: 1,
    translateY: 0,
    scale: 1,
    scrollTrigger: {
      trigger: element, // Aplica el trigger al elemento específico
      start: "top 90%",
      end: "bottom 90%",
      scrub: 1,
      toggleActions: "play pause reverse reset",
      markers: false
    }
  });
});

document.querySelectorAll(".mockup__img").forEach((element) => {
  gsap.to(element, {
    scale: 1.2,
    scrollTrigger: {
      trigger: element, // Aplica el trigger al elemento específico
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
      toggleActions: "play pause reverse reset",
      markers: false
    }
  });
});

const videos = document.querySelectorAll('.video video');

videos.forEach((video) => {
  video.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      // Ajusta estilos para pantalla completa
      video.style.objectFit = 'contain';
    } else {
      // Revertir estilos cuando salga de pantalla completa
      video.style.objectFit = 'cover';
    }
  });
});

document.querySelectorAll('.videoControles').forEach((video) => {
  video.controls = false; // Oculta los controles inicialmente

  video.addEventListener('mouseenter', () => {
    video.controls = true; // Muestra los controles al hacer hover
  });

  video.addEventListener('mouseleave', () => {
    video.controls = false; // Oculta los controles al salir del hover
  });
});

document.getElementById('toggleButton').addEventListener('click', function() {
  var menu = document.getElementById('menuToggle');
  menu.classList.toggle('active');
});