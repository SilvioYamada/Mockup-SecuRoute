// Criar partículas flutuantes
const particlesContainer = document.getElementById('particles');
const particleCount = 30;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    // Metade sobe, metade desce
    if (i % 2 === 0) {
        particle.className = 'particle up';
    } else {
        particle.className = 'particle down';
    }
    particle.style.left = Math.random() * 100 + '%';
    // Distribui o ponto inicial entre 0vh e 100vh
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.opacity = '0'; // invisível antes da animação
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
}

// Adicionar interatividade ao botão
const button = document.querySelector('.interactive-button');
if (button) {
    button.addEventListener('click', () => {
        // Efeito de ripple
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
}

// Adicionar estilo para animação de ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Animação de entrada e transição fluida para full screen
window.addEventListener('DOMContentLoaded', () => {
    const laptopContainer = document.querySelector('.laptop-container');
    const screenContent = document.querySelector('.screen-content');
    const iframe = document.querySelector('.iframe-full');
    const scene = document.querySelector('.scene');

    if (!laptopContainer || !screenContent || !iframe || !scene) {
        return;
    }

    // Laptop começa invisível para permitir a animação de aproximação
    laptopContainer.style.opacity = '0';
    laptopContainer.style.transform = 'scale(1.5) rotate(-5deg)';

    // 1. Laptop entra em cena
    setTimeout(() => {
        laptopContainer.style.transition = 'opacity 1.2s, transform 1.2s';
        laptopContainer.style.opacity = '1';
        laptopContainer.style.transform = 'scale(1) rotate(0deg)';

        // Revela o conteúdo do monitor de forma suave
        setTimeout(() => {
            screenContent.style.animation = 'none';
            screenContent.style.transition = 'opacity 0.6s ease';
            requestAnimationFrame(() => {
                screenContent.style.opacity = '1';
            });
        }, 500);
    }, 400);

    // 2. Faz o site "sair" da tela do laptop e preencher a viewport suavemente
    setTimeout(() => {
        const rect = iframe.getBoundingClientRect();
        const cornerRadius = 36;
        const finalRadius = 24;
        const initialClip = `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round ${cornerRadius}px)`;

        const stage = document.createElement('div');
        stage.style.position = 'fixed';
        stage.style.top = '0';
        stage.style.left = '0';
        stage.style.width = '100vw';
        stage.style.height = '100vh';
        stage.style.background = '#05040f';
        stage.style.clipPath = initialClip;
        stage.style.opacity = '0';
        stage.style.transition = 'clip-path 3s cubic-bezier(0.55, 0.06, 0.32, 1), opacity 2s ease, filter 2.2s ease, transform 2.2s cubic-bezier(0.55, 0.06, 0.32, 1)';
        stage.style.zIndex = '9400';
        stage.style.pointerEvents = 'none';
        stage.style.overflow = 'hidden';
        stage.style.filter = 'blur(25px)';
        stage.style.transform = 'scale(0.9)';

        const glow = document.createElement('div');
        glow.style.position = 'absolute';
        glow.style.top = '50%';
        glow.style.left = '50%';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.width = '160vw';
        glow.style.height = '160vh';
        glow.style.background = 'radial-gradient(circle, rgba(140, 92, 246, 0.35) 0%, rgba(37, 12, 58, 0.1) 45%, rgba(5, 4, 15, 0.0) 70%)';
        glow.style.filter = 'blur(80px)';
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 1.2s ease';
        stage.appendChild(glow);

        const fog = document.createElement('div');
        fog.style.position = 'absolute';
        fog.style.top = '0';
        fog.style.left = '0';
        fog.style.width = '100%';
        fog.style.height = '100%';
        fog.style.background = 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))';
        fog.style.filter = 'blur(120px)';
        fog.style.opacity = '0';
        fog.style.transition = 'opacity 1.4s ease';
        stage.appendChild(fog);

        screenContent.style.background = '#05040f';
        screenContent.style.transition = 'opacity 1.2s ease, filter 1.2s ease';
        screenContent.style.opacity = '0.08';
        screenContent.style.filter = 'blur(12px) brightness(0.55)';

        iframe.style.margin = '0';
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.display = 'block';
        iframe.style.transform = 'none';
        iframe.style.transition = 'none';

        laptopContainer.style.willChange = 'transform, opacity, filter';
        laptopContainer.style.filter = 'blur(0px)';
        laptopContainer.style.opacity = '1';
        laptopContainer.style.transform = 'translateY(0) scale(1)';

        stage.appendChild(iframe);
        document.body.appendChild(stage);

        laptopContainer.style.transition = 'transform 2.4s cubic-bezier(0.55, 0.06, 0.32, 1), opacity 2s ease, filter 2s ease';
        laptopContainer.style.transform = 'translateY(180px) scale(0.85)';
        laptopContainer.style.opacity = '0';
        laptopContainer.style.filter = 'blur(15px)';

        setTimeout(() => {
            requestAnimationFrame(() => {
                stage.style.opacity = '0.35';
                stage.style.filter = 'blur(18px)';
                stage.style.transform = 'scale(0.94)';
                glow.style.opacity = '0.4';
                fog.style.opacity = '0.3';

                setTimeout(() => {
                    stage.style.opacity = '1';
                    stage.style.clipPath = `inset(0 round ${finalRadius}px)`;
                    stage.style.filter = 'blur(0px)';
                    stage.style.transform = 'scale(1)';
                    glow.style.opacity = '1';
                    fog.style.opacity = '0.6';
                }, 200);
            });
        }, 650);

        const handleStageTransitionEnd = (event) => {
            if (event.target !== stage || event.propertyName !== 'clip-path') {
                return;
            }
            stage.removeEventListener('transitionend', handleStageTransitionEnd);

            fog.style.transition = 'opacity 1.5s ease';
            fog.style.opacity = '0';
            glow.style.opacity = '0.25';
            stage.style.pointerEvents = 'auto';
            stage.style.clipPath = 'none';
            stage.style.transition = 'opacity 1.4s ease, filter 1.4s ease';
            stage.style.filter = 'none';

            scene.style.transition = 'opacity 1.6s ease';
            scene.style.opacity = '0';

            setTimeout(() => {
                scene.remove();
                glow.remove();
                fog.remove();
            }, 1400);

            document.body.classList.add('show-full');
        };

        stage.addEventListener('transitionend', handleStageTransitionEnd);
    }, 5900);
});
