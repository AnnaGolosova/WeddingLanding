document.addEventListener("DOMContentLoaded", function () {
  const firstName = "Егор";
  const secondName = "Полина";
  // Получаем элементы
  const modal = document.getElementById("modal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.querySelector(".close");

  // Открываем модальное окно
  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Закрываем модальное окно
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Закрываем при клике вне окна
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  // Находим элемент и меняем содержимое
  document.getElementById("names").innerHTML = `${firstName} <span class="union">и</span> ${secondName}`;
  document.getElementById("allergyCheckbox").addEventListener("change", function () {
    document.getElementById("allergyInput").classList.toggle("hidden", !this.checked);
  });

  // Обработчик отправки формы
  document.getElementById("weddingForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Отмена стандартной отправки

    const attend = document.getElementById("attend").checked ? "Да" : "Нет";
    const drink = document.querySelector('input[name="drink"]:checked')?.value || "Не выбрано";
    const allergy = document.getElementById("allergyCheckbox").checked
      ? document.getElementById("allergyInput").value
      : "Нет";

    alert(`Придёшь: ${attend}\nНапитки: ${drink}\nАллергия: ${allergy}`);
  });
});
