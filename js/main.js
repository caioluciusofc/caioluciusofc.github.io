/* ==========================================
   CAIO LUCIUS 87 - PORTFÓLIO FUTURISTA
   JAVASCRIPT PRINCIPAL
========================================== */

// ==========================================
// 01 - CONTROLE DE ROLAGEM
// ==========================================

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

// ==========================================
// 02 - LOADING
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen = document.getElementById("loading-screen");
    const loadingPercent = document.getElementById("loading-percent");

    function liberarSite() {
        if (loadingScreen) {
            loadingScreen.remove();
        }

        document.body.classList.add("site-carregado");
    }

    if (!loadingScreen || !loadingPercent) {
        liberarSite();
        return;
    }

    const duracao = 2500;
    const inicio = performance.now();

    function atualizarLoading(tempoAtual) {

        const progresso = Math.min(
            (tempoAtual - inicio) / duracao,
            1
        );

        loadingPercent.textContent =
            Math.floor(progresso * 100) + "%";

        if (progresso < 1) {
            requestAnimationFrame(atualizarLoading);
            return;
        }

        loadingScreen.classList.add("loading-finalizado");

        setTimeout(liberarSite, 700);
    }

    requestAnimationFrame(atualizarLoading);
});

// ==========================================
// 03 - CHUVA BINÁRIA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("chuva-binaria");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (movimentoReduzido.matches) return;

    const tamanhoFonte = 16;
    const intervalo = 45;

    const azul = "#00bfff";
    const roxo = "#a855f7";

    let largura = 0;
    let altura = 0;
    let gotas = [];
    let ultimoFrame = 0;

    function ajustarCanvas() {

        largura = window.innerWidth;
        altura = window.innerHeight;

        const escala = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = Math.round(largura * escala);
        canvas.height = Math.round(altura * escala);

        ctx.setTransform(escala, 0, 0, escala, 0, 0);

        const colunas = Math.ceil(largura / tamanhoFonte);

        gotas = Array.from(
            { length: colunas },
            () => Math.random() * -(altura / tamanhoFonte)
        );

        ctx.clearRect(0, 0, largura, altura);
    }

    function desenharChuva() {

        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(8, 12, 28, 0.12)";
        ctx.fillRect(0, 0, largura, altura);

        ctx.font = `${tamanhoFonte}px monospace`;
        ctx.globalAlpha = 0.35;

        for (let i = 0; i < gotas.length; i++) {

            const numero = Math.random() > 0.5 ? "1" : "0";

            const x = i * tamanhoFonte;
            const y = gotas[i] * tamanhoFonte;

            ctx.fillStyle = Math.random() > 0.5
                ? azul
                : roxo;

            ctx.fillText(numero, x, y);

            gotas[i] += 0.45;

            if (y > altura && Math.random() > 0.975) {
                gotas[i] = 0;
            }
        }

        ctx.globalAlpha = 1;
    }

    function animarChuva(tempo) {

        requestAnimationFrame(animarChuva);

        if (document.hidden) return;

        if (tempo - ultimoFrame < intervalo) return;

        ultimoFrame = tempo;

        desenharChuva();
    }

    ajustarCanvas();

    window.addEventListener("resize", ajustarCanvas);

    requestAnimationFrame(animarChuva);
});

   
/* ==========================================
   04 - RASTRO BINÁRIO DO MOUSE
   SEM CARRO E SEM ROLAGEM AUTOMÁTICA
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("rastro-formula87");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // FUNCIONA EM DISPOSITIVOS COM MOUSE

    const possuiMouse = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (!possuiMouse.matches || movimentoReduzido.matches) {
        return;
    }

    const azul = "#00bfff";
    const roxo = "#a855f7";

    const particulas = [];

    const maximoParticulas = 100;
    const intervaloParticulas = 25;

    let largura = 0;
    let altura = 0;

    let ultimaParticula = 0;

    // AJUSTAR O CANVAS À TELA

    function ajustarCanvas() {

        largura = window.innerWidth;
        altura = window.innerHeight;

        const escala = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = Math.round(largura * escala);
        canvas.height = Math.round(altura * escala);

        ctx.setTransform(escala, 0, 0, escala, 0, 0);

    }

    // CRIAR NÚMEROS BINÁRIOS

    function criarParticula(x, y) {

        particulas.push({

            numero: Math.random() > 0.5 ? "1" : "0",

            cor: Math.random() > 0.5 ? azul : roxo,

            x: x + (Math.random() - 0.5) * 18,

            y: y + (Math.random() - 0.5) * 18,

            vida: 1,

            tamanho: 12 + Math.random() * 8,

            velocidadeY: 0.3 + Math.random() * 0.8

        });

        if (particulas.length > maximoParticulas) {
            particulas.shift();
        }

    }

    // DETECTAR MOVIMENTO DO MOUSE

    document.addEventListener("pointermove", (evento) => {

        if (evento.pointerType !== "mouse") return;

        const agora = performance.now();

        if (agora - ultimaParticula < intervaloParticulas) {
            return;
        }

        criarParticula(evento.clientX, evento.clientY);

        ultimaParticula = agora;

    });

    // ANIMAR OS NÚMEROS

    function animarRastro() {

        requestAnimationFrame(animarRastro);

        if (document.hidden) return;

        ctx.clearRect(0, 0, largura, altura);

        for (let i = particulas.length - 1; i >= 0; i--) {

            const particula = particulas[i];

            ctx.save();

            ctx.globalAlpha = particula.vida;

            ctx.fillStyle = particula.cor;

            ctx.font = `bold ${particula.tamanho}px monospace`;

            ctx.textAlign = "center";

            ctx.shadowColor = particula.cor;
            ctx.shadowBlur = 10;

            ctx.fillText(
                particula.numero,
                particula.x,
                particula.y
            );

            ctx.restore();

            particula.y += particula.velocidadeY;

            particula.vida -= 0.018;

            if (particula.vida <= 0) {
                particulas.splice(i, 1);
            }

        }

    }

    // INICIAR EFEITO

    ajustarCanvas();

    window.addEventListener("resize", ajustarCanvas);

    requestAnimationFrame(animarRastro);

});
