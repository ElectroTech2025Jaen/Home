// Navegación móvil
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // Filtros de productos
  initProductFilters();

  // Formularios
  initForms();

  // Smooth scrolling
  initSmoothScrolling();
});

// Filtros de productos
function initProductFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Actualizar botones activos
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filtrar productos
      productCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          card.classList.remove("hidden");
        } else {
          card.style.display = "none";
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Inicializar formularios
function initForms() {
  // Formulario de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Formulario de registro
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  // Formulario de recuperación de contraseña
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", handleForgotPassword);
  }
}

// Manejar login
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;
  const rememberMe = document.getElementById("rememberMe").checked;

  // Validar términos y condiciones
  if (!acceptTerms) {
    showAlert(
      "Debes aceptar los términos y condiciones para continuar.",
      "error"
    );
    return;
  }

  // Validar campos
  if (!email || !password) {
    showAlert("Por favor, completa todos los campos.", "error");
    return;
  }

  // Validar formato de email
  if (!isValidEmail(email)) {
    showAlert("Por favor, ingresa un email válido.", "error");
    return;
  }

  // Simular proceso de login
  showAlert("Iniciando sesión...", "info");

  setTimeout(() => {
    // Aquí iría la lógica real de autenticación
    showAlert("¡Bienvenido! Has iniciado sesión correctamente.", "success");

    // Guardar sesión si se seleccionó "recordar"
    if (rememberMe) {
      localStorage.setItem("rememberUser", email);
    }

    // Redirigir después del login exitoso
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }, 1500);
}

// Manejar registro
function handleRegister(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("registerEmail").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const acceptTerms = document.getElementById("acceptTermsRegister").checked;
  const acceptPrivacy = document.getElementById("acceptPrivacy").checked;

  // Validaciones
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    showAlert("Por favor, completa todos los campos obligatorios.", "error");
    return;
  }

  if (!acceptTerms || !acceptPrivacy) {
    showAlert(
      "Debes aceptar los términos y condiciones y la política de privacidad.",
      "error"
    );
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Por favor, ingresa un email válido.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showAlert("Las contraseñas no coinciden.", "error");
    return;
  }

  if (password.length < 6) {
    showAlert("La contraseña debe tener al menos 6 caracteres.", "error");
    return;
  }

  // Simular proceso de registro
  showAlert("Creando cuenta...", "info");

  setTimeout(() => {
    showAlert(
      "¡Cuenta creada exitosamente! Puedes iniciar sesión ahora.",
      "success"
    );
    closeRegisterModal();

    // Prellenar el email en el formulario de login
    const loginEmail = document.getElementById("email");
    if (loginEmail) {
      loginEmail.value = email;
    }
  }, 2000);
}

// Manejar recuperación de contraseña
function handleForgotPassword(e) {
  e.preventDefault();

  const email = document.getElementById("forgotEmail").value;

  if (!email) {
    showAlert("Por favor, ingresa tu email.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Por favor, ingresa un email válido.", "error");
    return;
  }

  showAlert("Enviando enlace de recuperación...", "info");

  setTimeout(() => {
    showAlert("Se ha enviado un enlace de recuperación a tu email.", "success");
    closeForgotPasswordModal();
  }, 2000);
}

// Validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Mostrar/ocultar contraseña con animación
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggleIcon");
  const toggleButton = toggleIcon.parentElement;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");

    // Añadir animación y cambio de color
    toggleButton.classList.add("active");
    toggleButton.style.color = "#3498db";

    // Añadir indicador visual temporal
    const indicator = document.createElement("span");
    indicator.textContent = "Visible";
    indicator.className = "password-visibility-indicator";
    indicator.style.cssText = `
      position: absolute;
      right: 45px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.7rem;
      color: #3498db;
      background: rgba(52, 152, 219, 0.1);
      padding: 2px 6px;
      border-radius: 3px;
      animation: fadeIn 0.3s ease-out;
    `;

    // Eliminar indicador existente si hay uno
    const existingIndicator = document.querySelector(
      ".password-visibility-indicator"
    );
    if (existingIndicator) {
      existingIndicator.remove();
    }

    passwordInput.parentNode.appendChild(indicator);

    // Eliminar después de 2 segundos
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => indicator.remove(), 300);
      }
    }, 2000);
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
    toggleButton.classList.remove("active");
    toggleButton.style.color = "#666";

    // Eliminar indicador si existe
    const indicator = document.querySelector(".password-visibility-indicator");
    if (indicator) {
      indicator.remove();
    }
  }
}

// Modales
function showRegisterForm() {
  document.getElementById("registerModal").style.display = "block";
}

function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}

// Mejorar la función de mostrar el modal de recuperación de contraseña
function showForgotPassword() {
  const modal = document.getElementById("forgotPasswordModal");
  modal.style.display = "block";

  // Añadir animación de entrada
  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.animation = "slideInDown 0.4s ease-out";

  // Enfocar automáticamente el campo de email
  setTimeout(() => {
    const emailInput = document.getElementById("forgotEmail");
    if (emailInput) {
      emailInput.focus();
    }
  }, 400);
}

function closeForgotPasswordModal() {
  document.getElementById("forgotPasswordModal").style.display = "none";
}

// Cerrar modales al hacer click fuera
window.addEventListener("click", (e) => {
  const registerModal = document.getElementById("registerModal");
  const forgotPasswordModal = document.getElementById("forgotPasswordModal");

  if (e.target === registerModal) {
    closeRegisterModal();
  }

  if (e.target === forgotPasswordModal) {
    closeForgotPasswordModal();
  }
});

// Mostrar alertas
function showAlert(message, type = "info") {
  // Remover alertas existentes
  const existingAlert = document.querySelector(".custom-alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Crear nueva alerta
  const alert = document.createElement("div");
  alert.className = `custom-alert alert-${type}`;
  alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

  // Estilos para la alerta
  alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

  // Colores según el tipo
  const colors = {
    success: { bg: "#d4edda", border: "#c3e6cb", text: "#155724" },
    error: { bg: "#f8d7da", border: "#f5c6cb", text: "#721c24" },
    info: { bg: "#d1ecf1", border: "#bee5eb", text: "#0c5460" },
    warning: { bg: "#fff3cd", border: "#ffeaa7", text: "#856404" },
  };

  const color = colors[type] || colors.info;
  alert.style.backgroundColor = color.bg;
  alert.style.border = `1px solid ${color.border}`;
  alert.style.color = color.text;

  document.body.appendChild(alert);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove();
    }
  }, 5000);
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Mostrar política de privacidad
function showPrivacyPolicy() {
  showAlert(
    "La política de privacidad se encuentra en desarrollo. Por favor, contacta con nosotros para más información.",
    "info"
  );
}

// Cargar usuario recordado
document.addEventListener("DOMContentLoaded", () => {
  const rememberedUser = localStorage.getItem("rememberUser");
  const emailInput = document.getElementById("email");
  const rememberCheckbox = document.getElementById("rememberMe");

  if (rememberedUser && emailInput) {
    emailInput.value = rememberedUser;
    if (rememberCheckbox) {
      rememberCheckbox.checked = true;
    }
  }
});

// Validación en tiempo real
document.addEventListener("DOMContentLoaded", () => {
  // Validación de email en tiempo real
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = "#e74c3c";
        showFieldError(this, "Email no válido");
      } else {
        this.style.borderColor = "#ddd";
        hideFieldError(this);
      }
    });
  });

  // Validación de confirmación de contraseña
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const passwordInput = document.getElementById("registerPassword");

  if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener("blur", function () {
      if (this.value && this.value !== passwordInput.value) {
        this.style.borderColor = "#e74c3c";
        showFieldError(this, "Las contraseñas no coinciden");
      } else {
        this.style.borderColor = "#ddd";
        hideFieldError(this);
      }
    });
  }
});

// Mostrar error en campo
function showFieldError(field, message) {
  hideFieldError(field); // Remover error existente

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    `;

  field.parentNode.appendChild(errorDiv);
}

// Ocultar error en campo
function hideFieldError(field) {
  const existingError = field.parentNode.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }
}

// Agregar estilos CSS para animaciones
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .alert-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .alert-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        opacity: 0.7;
    }
    
    .alert-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Funciones de utilidad adicionales
function formatPhoneNumber(input) {
  // Formatear número de teléfono peruano
  let value = input.value.replace(/\D/g, "");
  if (value.length > 0) {
    if (value.length <= 3) {
      value = value;
    } else if (value.length <= 6) {
      value = value.slice(0, 3) + " " + value.slice(3);
    } else {
      value =
        value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6, 9);
    }
  }
  input.value = value;
}

// Aplicar formateo de teléfono
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      formatPhoneNumber(this);
    });
  }
});

// Función para solicitar cotización
function requestQuote(productName) {
  showAlert(
    `Solicitud de cotización para ${productName} enviada. Nos contactaremos contigo pronto.`,
    "success"
  );
}

// Agregar event listeners a botones de cotización
document.addEventListener("DOMContentLoaded", () => {
  const quoteButtons = document.querySelectorAll(".product-card .btn-primary");
  quoteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productName =
        this.closest(".product-card").querySelector("h3").textContent;
      requestQuote(productName);
    });
  });
});

// Añadir estilos de animación
const animationStyle = document.createElement("style");
animationStyle.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideInDown {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .toggle-password.active {
    background-color: rgba(52, 152, 219, 0.1);
  }
`;
document.head.appendChild(animationStyle);
