document.getElementById("wedding-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const url = "https://script.google.com/macros/s/AKfycbwPo7hrWECcFQDXUUdbzoaTy3MeMsXpugtG5DLGNgEPo4mimke6UejO408HBImgaUcsFQ/exec"; // URL og Google App script
    const formData = new FormData(this);
  
    // Добавляем токен
    formData.append("token", "my_secure_token_12345");
  
    fetch(url, {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      alert("Данные отправлены! Спасибо!");
      this.reset();
    })
    .catch(error => console.error("Ошибка:", error));
  });
  