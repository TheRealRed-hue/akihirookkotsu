/* ==========================
   Palavras flutuantes + Sidebar
========================== */

const phrases = [
 
];

function createWord() {
  if (!phrases || phrases.length === 0) return; // evita erro se lista vazia

  const word = document.createElement('div');
  word.className = 'word';
  word.textContent = phrases[Math.floor(Math.random() * phrases.length)];

  // estilos inline mínimos (mova para CSS se preferir)
  word.style.position = 'absolute';
  word.style.left = (Math.random() * 70 + 10) + 'vw';
  word.style.top  = (Math.random() * 70 + 10) + 'vh';
  word.style.fontSize = (Math.random() * 0.6 + 1) + 'rem';
  word.style.pointerEvents = 'none';
  word.style.opacity = '0';
  word.style.transition = 'opacity .6s ease, transform 8s linear';
  word.style.transform = 'translateY(0)';

  document.body.appendChild(word);

  // fade in
  requestAnimationFrame(() => { word.style.opacity = '1'; });

  // depois de 6s começa a subir e sumir
  setTimeout(() => {
    word.style.transform = 'translateY(-20px)';
    word.style.opacity = '0';
  }, 6000);

  // remove após 8s
  setTimeout(() => word.remove(), 8000);
}

window.addEventListener('DOMContentLoaded', () => {
  // inicia as palavras flutuantes
  createWord();
  setInterval(createWord, 9000);

  // Sidebar
  const sidebar  = document.getElementById('sidebar');
  const toggle   = document.getElementById('sidebarToggle');
  const channels = sidebar ? sidebar.querySelectorAll('.channel') : [];

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.style.display === 'block';
      sidebar.style.display = isOpen ? 'none' : 'block';
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  channels.forEach(ch => {
    ch.addEventListener('click', () => {
      // marca ativo
      channels.forEach(c => c.classList.remove('active'));
      ch.classList.add('active');

      if (ch.dataset.href) {
        window.location.href = ch.dataset.href;
        return;
      }

      if (ch.dataset.target) {
        const target = document.querySelector(ch.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }

      if (window.innerWidth <= 900 && sidebar) {
        sidebar.style.display = 'none';
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
