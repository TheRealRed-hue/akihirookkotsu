const weaponItems = document.querySelectorAll(".weapon-item");
const weaponImg = document.getElementById("weapon-img");
const weaponName = document.getElementById("weapon-name");
const weaponDamage = document.getElementById("weapon-damage");
const weaponDesc = document.getElementById("weapon-desc");

weaponItems.forEach(item => {
  item.addEventListener("click", () => {
    weaponImg.src = item.dataset.img;
    weaponName.textContent = item.dataset.name;
    weaponDamage.innerHTML = `<strong>Dano:</strong> ${item.dataset.damage}`;
    weaponDesc.textContent = item.dataset.desc;

    weaponItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});
