// Regex para validar e-mail
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// === FORMULÁRIO ===
if (document.getElementById("userForm")) {
  const form = document.getElementById("userForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = parseInt(document.getElementById("idade").value.trim());

    let valido = true;

    // Limpa mensagens anteriores
    document.querySelectorAll(".erro").forEach(el => el.textContent = "");

    // Validações
    if (nome.length < 3 || nome.length > 50) {
      document.getElementById("erroNome").textContent = "Nome deve ter entre 3 e 50 caracteres.";
      valido = false;
    }

    if (sobrenome.length < 3 || sobrenome.length > 50) {
      document.getElementById("erroSobrenome").textContent = "Sobrenome deve ter entre 3 e 50 caracteres.";
      valido = false;
    }

    if (!emailRegex.test(email)) {
      document.getElementById("erroEmail").textContent = "E-mail inválido.";
      valido = false;
    }

    if (isNaN(idade) || idade <= 0 || idade >= 120) {
      document.getElementById("erroIdade").textContent = "Idade deve ser um número positivo menor que 120.";
      valido = false;
    }

    if (valido) {
      const dados = { nome, sobrenome, email, idade };
      localStorage.setItem("dadosUsuario", JSON.stringify(dados));
      window.location.href = "confirmation.html";
    }
  });
}

// === CONFIRMAÇÃO ===
if (window.location.pathname.includes("confirmation.html")) {
  const dadosDiv = document.getElementById("dados");
  const dados = JSON.parse(localStorage.getItem("dadosUsuario"));

  if (dados) {
    dadosDiv.innerHTML = `
      <p><strong>Nome:</strong> ${dados.nome}</p>
      <p><strong>Sobrenome:</strong> ${dados.sobrenome}</p>
      <p><strong>Email:</strong> ${dados.email}</p>
      <p><strong>Idade:</strong> ${dados.idade}</p>
    `;
  }

  document.getElementById("editar").addEventListener("click", () => {
    window.location.href = "form.html";
  });

  document.getElementById("confirmar").addEventListener("click", () => {
    // Aqui simulamos o salvamento no arquivo data.json
    console.log("Dados salvos:", dados);
    alert("Dados confirmados e salvos com sucesso!");
    localStorage.removeItem("dadosUsuario");
    window.location.href = "index.html";
  });
}
