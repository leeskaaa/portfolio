// Основной JavaScript файл для всего проекта

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌷 Сайт загружен!');
    
    // Обновление года в футере
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Анимация появления элементов при прокрутке
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.feature-card, .portfolio-item, .contact-method, .about-image, .about-text'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Изначально скрываем элементы для анимации
    document.querySelectorAll('.feature-card, .portfolio-item, .contact-method').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Запускаем анимацию
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Обработка формы на странице контактов
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем значения полей
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Простая валидация
            if (!name || !email || !message) {
                showError('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Пожалуйста, введите корректный email');
                return;
            }
            
            // Имитация отправки
            console.log('📤 Отправка формы:');
            console.log('Имя:', name);
            console.log('Email:', email);
            console.log('Тема:', document.getElementById('subject').value);
            console.log('Сообщение:', message);
            
            // Показываем сообщение об успехе
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // Скрываем сообщение через 5 секунд
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
                // Сбрасываем форму
                contactForm.reset();
            }
            
            // Анимация успешной отправки
            animateSuccess();
        });
    }
    
    // Вспомогательные функции
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(message) {
        // Создаем элемент ошибки
        let errorDiv = document.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.cssText = `
                background: linear-gradient(135deg, #ffaaa5, #ff8b94);
                color: white;
                padding: 1rem;
                border-radius: 10px;
                margin: 1rem 0;
                text-align: center;
                animation: fadeIn 0.3s ease;
            `;
            if (contactForm) {
                contactForm.insertBefore(errorDiv, contactForm.firstChild);
            }
        }
        
        errorDiv.textContent = message;
        
        // Удаляем ошибку через 3 секунды
        setTimeout(() => {
            if (errorDiv && errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
    
    function animateSuccess() {
        // Добавляем стиль для анимации
        const style = document.createElement('style');
        if (!document.querySelector('#success-animation')) {
            style.id = 'success-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Анимируем кнопку отправки
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.style.animation = 'float 0.5s ease 3';
            setTimeout(() => {
                submitBtn.style.animation = '';
            }, 1500);
        }
    }
    
    // Меню для мобильных устройств
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav');
            const menu = document.querySelector('.nav-menu');
            
            if (nav && menu && !document.querySelector('.menu-toggle')) {
                const toggleButton = document.createElement('button');
                toggleButton.className = 'menu-toggle';
                toggleButton.innerHTML = '🌸';
                toggleButton.style.cssText = `
                    background: linear-gradient(135deg, var(--accent-pink), var(--accent-lavender));
                    border: none;
                    color: white;
                    font-size: 1.8rem;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1001;
                    box-shadow: var(--shadow-soft);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                document.body.appendChild(toggleButton);
                
                // Скрываем меню по умолчанию на мобильных
                menu.style.display = 'none';
                menu.style.cssText += `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    padding: 2rem;
                `;
                
                toggleButton.addEventListener('click', function() {
                    const isVisible = menu.style.display === 'flex';
                    menu.style.display = isVisible ? 'none' : 'flex';
                    toggleButton.innerHTML = isVisible ? '🌸' : '✕';
                    toggleButton.style.background = isVisible ? 
                        'linear-gradient(135deg, var(--accent-pink), var(--accent-lavender))' :
                        'linear-gradient(135deg, #ffaaa5, #ff8b94)';
                });
            }
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});