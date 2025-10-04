// snow.js - efeito de neve suave e elegante

const snowContainer = document.querySelector('.snow');

const NUM_SNOWFLAKES = 50;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  // Estilos iniciais
  snowflake.style.left = `${randomRange(0, 100)}vw`;
  snowflake.style.opacity = randomRange(0.3, 0.9);
  snowflake.style.fontSize = `${randomRange(10, 20)}px`;
  snowflake.style.animationDuration = `${randomRange(8, 15)}s`;
  snowflake.style.animationDelay = `${randomRange(0, 15)}s`;

  snowflake.textContent = '❄'; // símbolo de floco de neve

  snowContainer.appendChild(snowflake);

  // Remover snowflake após animação para evitar acúmulo
  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
    createSnowflake();
  });
}

// Inicializa os flocos
for (let i = 0; i < NUM_SNOWFLAKES; i++) {
  createSnowflake();
}
