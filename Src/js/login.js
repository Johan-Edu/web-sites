document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const showPasswordBtn = document.querySelector('.show-password');
    const passwordInput = document.getElementById('password');
    
    // Mostrar/ocultar contraseña
    showPasswordBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            this.setAttribute('aria-label', 'Ocultar contraseña');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            this.setAttribute('aria-label', 'Mostrar contraseña');
        }
    });
    
    // Validación del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const remember = document.getElementById('remember').checked;
        
        // Validación básica
        if (!email || !password) {
            showError('Por favor, completa todos los campos');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Por favor, ingresa un correo electrónico válido');
            return;
        }
        
        // Deshabilitar el botón durante el envío
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
        
        // Aquí iría la llamada AJAX para autenticar al usuario
        simulateLogin(email, password, remember)
            .then(response => {
                // Redirección después de login exitoso
                window.location.href = '../dashboard/';
            })
            .catch(error => {
                showError(error.message);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Iniciar Sesión';
            });
    });
    
    // Función para mostrar errores
    function showError(message) {
        // Eliminar mensajes de error anteriores
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Crear y mostrar nuevo mensaje de error
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#f72585';
        errorElement.style.marginBottom = '1rem';
        errorElement.style.textAlign = 'center';
        errorElement.style.fontWeight = '500';
        errorElement.textContent = message;
        
        // Insertar después del header del formulario
        const formHeader = document.querySelector('.login-form-header');
        formHeader.insertAdjacentElement('afterend', errorElement);
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Función simulada para login (reemplazar con llamada real a tu API)
    function simulateLogin(email, password, remember) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulación de credenciales válidas
                if (email === 'usuario@digitalsolutions.com' && password === 'password123') {
                    // Guardar en localStorage si "Recordar sesión" está marcado
                    if (remember) {
                        localStorage.setItem('rememberMe', 'true');
                    }
                    resolve({ success: true });
                } else {
                    reject(new Error('Correo electrónico o contraseña incorrectos'));
                }
            }, 1500);
        });
    }
    
    // Login con redes sociales (simulado)
    document.querySelectorAll('.social-button').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Microsoft';
            alert(`Inicio de sesión con ${provider} (simulado)`);
        });
    });
    
    // Verificar si hay credenciales guardadas
    if (localStorage.getItem('rememberMe') === 'true') {
        document.getElementById('remember').checked = true;
        // Aquí podrías autocompletar el email si lo guardaste
    }
});