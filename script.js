document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) {
    var toggleBtnMarginTop = "10px";
    var toggleBtnMarginRight = "60px";
    var toggleBtnMarginRight2 = "0px";
  }
  const firstName = "Егор";
  const secondName = " Полины";
  var names = "";
  var staticDate = document.getElementById("static-date");
  const countdownBlock = document.getElementById("countdown");
  var toggleBtn = document.getElementById("toggle-countdown");
  const modal = document.getElementById("modalWindow");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.querySelector(".close");

  var daysEl = document.getElementById("days");
  var hoursEl = document.getElementById("hours");
  var minutesEl = document.getElementById("minutes");
  var secondsEl = document.getElementById("seconds");

  let isCountdownVisible = false;

  toggleBtn.addEventListener("click", function () {
    isCountdownVisible = !isCountdownVisible;

    if (isCountdownVisible) {
      staticDate.style.display = "none";
      countdownBlock.style.display = "block";
      toggleBtn.innerText = "date_range"; // Иконка календаря
      toggleBtn.style.marginTop = toggleBtnMarginTop;
      toggleBtn.style.marginRight = toggleBtnMarginRight;
    } else {
      staticDate.style.display = "block";
      countdownBlock.style.display = "none";

      toggleBtn.innerText = "history"; // Иконка часов
      toggleBtn.style.marginTop = toggleBtnMarginTop;
      toggleBtn.style.marginRight = toggleBtnMarginRight2;
    }
  });

  function replaceElements() {
    let gpsIcon = document.getElementById("gps"); // Родительский контейнер
    if (!gpsIcon) return; // Если контейнера нет, выходим

    if (window.innerWidth < 768) {
      gpsIcon.remove(); // Удаляем первый элемент в коллекции (оставшиеся сдвигаются)
    }
  }

  // Запуск при загрузке страницы
  replaceElements();
  // Find element and change inner.
  if (secondName == null || secondName == "") {
    names = `${firstName}`;
  } else {
    names = `${firstName} <span class="union">и</span> ${secondName}`;
  }
  document.getElementById("names").innerHTML = names;
  // Get element

  // Count down timer
  function countdownTimer() {
    const countDownDate = new Date("06/07/2025").getTime();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minutesEl.innerText = "00";
      secondsEl.innerText = "00";
      return;
    }
    daysEl.innerText = formatNumber(Math.floor(distance / day));
    hoursEl.innerText = formatNumber(Math.floor((distance % day) / hour));
    minutesEl.innerText = formatNumber(Math.floor((distance % hour) / minute));
    secondsEl.innerText = formatNumber(Math.floor((distance % minute) / second));
  }
  countdownTimer();
  const interval = setInterval(countdownTimer, 1000);
  function formatNumber(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }
  countdownTimer();

  // Open modal window
  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Close modal window
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when to click by outside window
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  document.getElementById("allergyCheckbox").addEventListener("change", function () {
    if (document.getElementById("allergyCheckbox").checked) {
      document.getElementById("allergyInput").style.display = "block"; // Показываем поле
    }
  });
  document.getElementById("noAllergy").addEventListener("change", function () {
    if (document.getElementById("noAllergy").checked) {
      document.getElementById("allergyInput").style.display = "none"; // Скрываем поле
      document.getElementById("allergyInput").value = ""; // Очищаем поле
    }
  });

  // Form submission handler
  document.getElementById("modal").addEventListener("submit", function (event) {
    event.preventDefault();

    // Отмена стандартной отправки
    const url =
      "https://script.google.com/macros/s/AKfycbxhpbsQO2acMs37ejCKoB2iaeCVcQRwRIONypgzeG2TgbHTPbtCo9m-nBF0EwyTwaCGtA/exec"; // URL og Google App script
    
    const formData = new FormData(this);

    // Добавляем токен
    formData.append("token", "my_secure_token_12345");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Данные отправлены! Спасибо!");
        this.reset();
      })
      .catch((error) => console.error("Ошибка:", error));
    toggleBtn.click();
    // const id = document.getElementById("idInput").value;
    // const come = document.getElementById("attend").checked ? "Да" : "Нет";
    // const drink = document.querySelector('input[name="drink"]:checked')?.value || "Не выбрано";
    // const allergy = document.getElementById("allergyCheckbox").checked
    //   ? document.getElementById("allergyInput").value
    //   : "Нет";

    fetch(url, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((data) => alert(data))
      .catch((error) => console.error("Ошибка:", error));

    modal.style.display = "none";
  });
});
