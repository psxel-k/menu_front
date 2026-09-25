/* =========================================================
   Lavanda — interações (menu + animações)
   ========================================================= */
(() => {
  'use strict';

  /* ---------- menu mobile ---------- */
  const btnMenu       = document.getElementById('menu');
  const btnMenuX      = document.getElementById('menuX');
  const menuPrincipal = document.getElementById('menu-principal');

  if (btnMenu && menuPrincipal) {
    btnMenu.addEventListener('click', () => menuPrincipal.classList.add('aberto'));
  }
  if (btnMenuX && menuPrincipal) {
    btnMenuX.addEventListener('click', () => menuPrincipal.classList.remove('aberto'));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuPrincipal) {
      menuPrincipal.classList.remove('aberto');
    }
  });

  if (menuPrincipal) {
    menuPrincipal.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => menuPrincipal.classList.remove('aberto'))
    );
  }

  /* ---------- entrada orquestrada do hero ---------- */
  const hero = document.querySelector('.hero');
  const iniciarHero = () => { if (hero) hero.classList.add('entrou'); };

  /* ---------- revelação ao rolar ---------- */
  const alvos = document.querySelectorAll('.card, .reveal');

  if ('IntersectionObserver' in window && alvos.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = (i * 70) + 'ms';
        entry.target.classList.add('visivel');
        io.unobserve(entry.target);

        entry.target.addEventListener('transitionend', function limpar(ev) {
          if (ev.propertyName === 'opacity') {
            entry.target.style.transitionDelay = '';
            entry.target.removeEventListener('transitionend', limpar);
          }
        });
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    alvos.forEach((el) => io.observe(el));
  } else {
    alvos.forEach((el) => el.classList.add('visivel'));
  }

  /* ---------- start ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarHero);
  } else {
    iniciarHero();
  }
})();