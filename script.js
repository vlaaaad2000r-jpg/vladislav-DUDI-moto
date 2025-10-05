document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#bike-selector form");
  const bikes = document.querySelectorAll(".bike-card");
  const resetBtn = document.getElementById("reset-filters");

  // Кнопка схована на старті
  resetBtn.style.display = "none";

  // Логіка кнопки "Повернутись до каталогу"
  resetBtn.addEventListener("click", function () {
    bikes.forEach((bike) => (bike.style.display = "block"));
    form.reset();

    const oldMsg = document.querySelector("#no-result-message");
    if (oldMsg) oldMsg.remove();

    resetBtn.style.display = "none"; // сховати кнопку знову
  });

  // Логіка пошуку мотоциклів
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const type = document.querySelector("#type").value;
    const power = parseInt(document.querySelector("#power").value);
    const price = parseInt(document.querySelector("#price").value);

    let found = false;

    bikes.forEach((bike) => {
      const bikeType = bike.dataset.type;
      const bikePower = parseInt(bike.dataset.power);
      const bikePrice = parseInt(bike.dataset.price);

      // ховаємо всі
      bike.style.display = "none";

      // точне співпадіння
      if (
        bikeType === type &&
        (!isNaN(power) ? bikePower >= power : true) &&
        (!isNaN(price) ? bikePrice <= price : true)
      ) {
        bike.style.display = "block";
        found = true;
      }
    });

    // прибираємо попереднє повідомлення
    const oldMsg = document.querySelector("#no-result-message");
    if (oldMsg) oldMsg.remove();

    // якщо немає точних збігів → показати схожі
    if (!found) {
      const message = document.createElement("p");
      message.textContent =
        "На жаль, точного співпадіння немає 😔 Але ось схожі варіанти:";
      message.style.color = "red";
      message.style.fontWeight = "bold";
      message.id = "no-result-message";
      form.after(message);

      bikes.forEach((bike) => {
        const bikePower = parseInt(bike.dataset.power);
        const bikePrice = parseInt(bike.dataset.price);

        if (
          (!isNaN(power) ? Math.abs(bikePower - power) <= power * 0.3 : true) &&
          (!isNaN(price) ? Math.abs(bikePrice - price) <= price * 0.3 : true)
        ) {
          bike.style.display = "block";
        }
      });
    }

    // показуємо кнопку скидання після будь-якого пошуку
    resetBtn.style.display = "inline-block";
  });
});
