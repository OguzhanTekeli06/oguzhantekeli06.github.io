document.addEventListener("mousemove", function (event) {
    createHeart(event.clientX, event.clientY);
});

document.addEventListener("touchmove", function (event) {
    let touch = event.touches[0];
    createHeart(touch.clientX, touch.clientY);
});

function createHeart(x, y) {
    let heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

function showEffect() {
    document.getElementById("loveSong").play();

    document.getElementById("message").style.display = "block";
    for (let i = 0; i < 50; i++) {  // Güllerin sayısını artırdık
        let rose = document.createElement("div");
        rose.classList.add("rose-scatter");
        rose.innerHTML = "🌹";
        rose.style.left = Math.random() * window.innerWidth + "px";
        rose.style.top = Math.random() * window.innerHeight + "px";
        document.body.appendChild(rose);
        setTimeout(() => rose.remove(), 2000);
    }

    // OpenRouter API'ye istek gönderme
    fetch('https://oguzhantekeli06-github-io.onrender.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: 'Sevgilime güzel bir söz söyle' })  // Burada istediğin prompt'u verebilirsin
    })
    .then(response => response.json())
    .then(data => {
        const message = data.message;
        document.getElementById('message').innerText = message;  // ChatGPT mesajını ekrana yazdır
    })
    .catch(error => console.error('Hata:', error));
}

