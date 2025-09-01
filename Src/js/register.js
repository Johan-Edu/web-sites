document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthLevel = document.getElementById('strengthLevel');
    const showPasswordBtn = document.querySelector('.show-password');
    
    // Mostrar/ocultar contraseña
    showPasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Validar fortaleza de la contraseña
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Actualizar barra de fortaleza
        strengthBar.style.width = strength.percentage + '%';
        strengthBar.style.backgroundColor = strength.color;
        strengthLevel.textContent = strength.text;
        strengthLevel.style.color = strength.color;
    });
    
    // Validar coincidencia de contraseñas
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            this.setCustomValidity('Las contraseñas no coinciden');
            this.style.borderColor = '#ff4d4d';
        } else {
            this.setCustomValidity('');
            this.style.borderColor = '#e0e0e0';
        }
    });
    
    // Validación del formulario antes de enviar
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!this.checkValidity()) {
            // Mostrar errores de validación
            this.classList.add('was-validated');
            return;
        }
        
        // Verificar términos aceptados
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            alert('Debes aceptar los términos y condiciones para continuar');
            return;
        }
        
        // Verificar coincidencia de contraseñas
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        // Mostrar carga mientras se procesa
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        submitButton.disabled = true;
        
        // Simular envío de datos (reemplazar con AJAX real)
        setTimeout(() => {
            // Aquí iría tu petición AJAX real
            console.log('Datos a enviar:', getFormData(this));
            
            // Simular respuesta exitosa
            submitButton.innerHTML = '<i class="fas fa-check"></i> Registro completado';
            
            // Redirigir después de 2 segundos

            setTimeout(() => {
                // Cambia esta ruta por la correcta para tu proyecto
                const dashboardPath = 'dashboard.html'; 
                
                try {
                    window.location.href = dashboardPath;
                } catch (error) {
                    console.error('Error al redirigir:', error);
                    window.location.href = '/'; // Fallback a la página principal
                }
            }, 2000);
            
            // En caso de error, podrías hacer:
            // submitButton.innerHTML = originalText;
            // submitButton.disabled = false;
            // alert('Error en el registro. Por favor intenta nuevamente.');
        }, 1500);
    });
    
    // Función para calcular fortaleza de contraseña
    function calculatePasswordStrength(password) {
        let strength = 0;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;
        
        if (isLongEnough) strength += 20;
        if (hasUpperCase) strength += 20;
        if (hasLowerCase) strength += 20;
        if (hasNumbers) strength += 20;
        if (hasSpecialChars) strength += 20;
        
        let result = {
            percentage: strength,
            color: '#ff4d4d', // Rojo por defecto
            text: 'Débil'
        };
        
        if (strength >= 80) {
            result.color = '#2ecc71'; // Verde
            result.text = 'Fuerte';
        } else if (strength >= 50) {
            result.color = '#f39c12'; // Amarillo/naranja
            result.text = 'Moderada';
        }
        
        return result;
    }
    
    // Función para obtener datos del formulario
    function getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            // No incluir campos vacíos opcionales
            if (value.trim() !== '' || form.elements[key].required) {
                data[key] = value.trim();
            }
        });
        
        return data;
    }
    
    // Validación en tiempo real para campos requeridos
    const requiredInputs = document.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#ff4d4d';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    // Mejorar UX para campos de teléfono
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+]/g, '');
        });
    }
});