const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const nameEl = document.querySelector("#name");
  const emailEl = document.querySelector("#email");
  const messageEl = document.querySelector("#textAreaMessage");

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const message = messageEl.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    alert("Your message has been sent!");

    nameEl.value = "";
    emailEl.value = "";
    messageEl.value = "";
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
