// Script para funcionalidades do site de roteiro de viagem

document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave ao clicar nos links do menu
    document.querySelectorAll('#navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Navegação fixa ao rolar a página
    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Botão de voltar ao topo
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.display = 'none';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '99';
        button.style.border = 'none';
        button.style.outline = 'none';
        button.style.backgroundColor = 'var(--primary-color)';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.padding = '15px';
        button.style.borderRadius = '50%';
        button.style.fontSize = '18px';
        button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        button.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTopButton();

    // Animação de fade-in para os elementos ao rolar a página
    const fadeInElements = () => {
        const elements = document.querySelectorAll('.section, .timeline-item, .hotel-card, .food-item, .attraction-card, .tip-card');
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            fadeInObserver.observe(element);
        });
        
        // Adicionar classe CSS para elementos que aparecem
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .fade-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            </style>
        `);
    };
    
    // Verificar se o navegador suporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        fadeInElements();
    }

    // Adicionar funcionalidade de galeria de imagens para as atrações
    const setupImageGallery = () => {
        // Simulação de galeria - em um site real, seriam imagens reais
        const attractionCards = document.querySelectorAll('.attraction-card');
        
        attractionCards.forEach(card => {
            const header = card.querySelector('.attraction-header');
            const cityName = header.textContent.trim();
            
            // Adicionar botão para ver galeria
            const galleryButton = document.createElement('button');
            galleryButton.textContent = 'Ver Fotos';
            galleryButton.className = 'gallery-button';
            galleryButton.style.backgroundColor = 'var(--secondary-color)';
            galleryButton.style.color = 'white';
            galleryButton.style.border = 'none';
            galleryButton.style.padding = '8px 15px';
            galleryButton.style.borderRadius = '4px';
            galleryButton.style.cursor = 'pointer';
            galleryButton.style.marginTop = '10px';
            galleryButton.style.fontWeight = 'bold';
            
            galleryButton.addEventListener('click', () => {
                alert(`Galeria de fotos de ${cityName} seria exibida aqui em um site completo.`);
            });
            
            card.querySelector('.attraction-content').appendChild(galleryButton);
        });
    };
    
    setupImageGallery();

    // Adicionar funcionalidade de conversão de moeda
    const setupCurrencyConverter = () => {
        const infoSection = document.querySelector('#informacoes-gerais');
        
        // Criar conversor de moeda
        const converterHTML = `
            <div class="info-card">
                <div class="info-icon">
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <div class="info-content">
                    <h3>Conversor de Moeda</h3>
                    <div class="currency-converter">
                        <div class="converter-input">
                            <label for="amount">Valor em Reais (R$):</label>
                            <input type="number" id="amount" min="1" value="100">
                        </div>
                        <button id="convert-button">Converter para Euro</button>
                        <div id="result" class="converter-result">
                            100 BRL = <span id="euro-value">Aproximadamente 17 EUR</span>
                        </div>
                        <p class="converter-note">Nota: Taxa de câmbio aproximada. Verifique valores atualizados antes da viagem.</p>
                    </div>
                </div>
            </div>
        `;
        
        infoSection.insertAdjacentHTML('beforeend', converterHTML);
        
        // Estilizar o conversor
        const style = document.createElement('style');
        style.textContent = `
            .currency-converter {
                margin-top: 10px;
            }
            .converter-input {
                margin-bottom: 15px;
            }
            .converter-input label {
                display: block;
                margin-bottom: 5px;
            }
            .converter-input input {
                padding: 8px;
                width: 100%;
                max-width: 200px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            #convert-button {
                background-color: var(--primary-color);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 4px;
                cursor: pointer;
                margin-bottom: 15px;
            }
            #convert-button:hover {
                background-color: var(--secondary-color);
            }
            .converter-result {
                font-size: 1.1rem;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .converter-note {
                font-size: 0.8rem;
                font-style: italic;
                color: #666;
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar funcionalidade ao botão
        document.getElementById('convert-button').addEventListener('click', () => {
            const amount = document.getElementById('amount').value;
            // Taxa de conversão aproximada (BRL para EUR)
            const rate = 0.17;
            const euroValue = (amount * rate).toFixed(2);
            
            document.getElementById('euro-value').textContent = `Aproximadamente ${euroValue} EUR`;
            document.getElementById('result').innerHTML = `${amount} BRL = <span id="euro-value">Aproximadamente ${euroValue} EUR</span>`;
        });
    };
    
    setupCurrencyConverter();

    // Adicionar contador regressivo para a viagem
    const setupCountdown = () => {
        const headerContent = document.querySelector('.header-content');
        
        // Criar elemento de contagem regressiva
        const countdownHTML = `
            <div class="countdown">
                <h3>Contagem Regressiva para a Viagem</h3>
                <div class="countdown-timer">
                    <div class="countdown-item">
                        <span id="countdown-days">0</span>
                        <span class="countdown-label">Dias</span>
                    </div>
                    <div class="countdown-item">
                        <span id="countdown-hours">0</span>
                        <span class="countdown-label">Horas</span>
                    </div>
                    <div class="countdown-item">
                        <span id="countdown-minutes">0</span>
                        <span class="countdown-label">Minutos</span>
                    </div>
                    <div class="countdown-item">
                        <span id="countdown-seconds">0</span>
                        <span class="countdown-label">Segundos</span>
                    </div>
                </div>
            </div>
        `;
        
        headerContent.insertAdjacentHTML('beforeend', countdownHTML);
        
        // Estilizar a contagem regressiva
        const style = document.createElement('style');
        style.textContent = `
            .countdown {
                margin-top: 30px;
                background-color: rgba(0, 0, 0, 0.5);
                padding: 20px;
                border-radius: 8px;
                display: inline-block;
            }
            .countdown h3 {
                color: white;
                margin-bottom: 15px;
                text-align: center;
            }
            .countdown-timer {
                display: flex;
                justify-content: center;
                gap: 20px;
            }
            .countdown-item {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .countdown-item span:first-child {
                font-size: 2rem;
                font-weight: bold;
                color: var(--secondary-color);
            }
            .countdown-label {
                font-size: 0.8rem;
                color: white;
            }
            
            @media (max-width: 480px) {
                .countdown-timer {
                    gap: 10px;
                }
                .countdown-item span:first-child {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Função para atualizar a contagem regressiva
        const updateCountdown = () => {
            // Data da viagem: 22 de setembro de 2025
            const travelDate = new Date('2025-09-22T00:00:00');
            const currentDate = new Date();
            
            // Diferença em milissegundos
            const diff = travelDate - currentDate;
            
            // Se a data já passou, mostrar zeros
            if (diff <= 0) {
                document.getElementById('countdown-days').textContent = '0';
                document.getElementById('countdown-hours').textContent = '0';
                document.getElementById('countdown-minutes').textContent = '0';
                document.getElementById('countdown-seconds').textContent = '0';
                return;
            }
            
            // Calcular dias, horas, minutos e segundos
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Atualizar elementos HTML
            document.getElementById('countdown-days').textContent = days;
            document.getElementById('countdown-hours').textContent = hours;
            document.getElementById('countdown-minutes').textContent = minutes;
            document.getElementById('countdown-seconds').textContent = seconds;
        };
        
        // Atualizar a contagem regressiva imediatamente e a cada segundo
        updateCountdown();
        setInterval(updateCountdown, 1000);
    };
    
    setupCountdown();
});
