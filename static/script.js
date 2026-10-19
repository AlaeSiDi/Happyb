const music=document.getElementById("birthdayMusic");const musicToggle=document.getElementById("musicToggle");const startBtn=document.getElementById("startBtn");const catsBtn=document.getElementById("catsBtn");const lilyBtn=document.getElementById("lilyBtn");const surpriseBtn=document.getElementById("surpriseBtn");const againBtn=document.getElementById("againBtn");const message=document.getElementById("message");const cats=document.getElementById("cats");const lily=document.getElementById("lily");const finalScreen=document.getElementById("finalScreen");const particles=document.getElementById("particles");const catCaption=document.getElementById("catCaption");

function showSection(section){section.classList.add("visible");setTimeout(()=>section.scrollIntoView({behavior:"smooth",block:"center"}),50)}
function updateMusicButton(){musicToggle.textContent=music.paused?"♫":"❚❚"}
async function startMusic(){music.volume=.45;try{await music.play()}catch(e){console.log("Автовоспроизведение не разрешено браузером.")}updateMusicButton()}
function createParticle(){const p=document.createElement("span");p.className="particle";p.style.left=Math.random()*100+"%";p.style.animationDuration=5+Math.random()*5+"s";p.style.opacity=.25+Math.random()*.55;particles.appendChild(p);setTimeout(()=>p.remove(),11000)}
function createConfetti(){for(let i=0;i<70;i++){const p=document.createElement("span");p.className="confetti";p.style.left=Math.random()*100+"%";p.style.animationDelay=Math.random()*1.5+"s";p.style.transform=`rotate(${Math.random()*360}deg)`;p.style.background=`hsl(${Math.random()*360},70%,75%)`;document.body.appendChild(p);setTimeout(()=>p.remove(),4500)}}
setInterval(createParticle,500);for(let i=0;i<18;i++)setTimeout(createParticle,i*180);
startBtn.addEventListener("click",async()=>{await startMusic();showSection(message)});
musicToggle.addEventListener("click",async()=>{if(music.paused)await startMusic();else{music.pause();updateMusicButton()}});
catsBtn.addEventListener("click",()=>{showSection(cats);const captions=["Первый котик одобряет этот праздник.","Второй котик тоже передаёт поздравления.","Третий котик официально разрешает веселиться!"];let i=0;setInterval(()=>{i=(i+1)%captions.length;catCaption.textContent=captions[i]},1800)});
lilyBtn.addEventListener("click",()=>{showSection(lily);for(let i=0;i<12;i++)setTimeout(createParticle,i*120)});
surpriseBtn.addEventListener("click",async()=>{finalScreen.classList.add("visible");createConfetti();await startMusic()});
againBtn.addEventListener("click",()=>{finalScreen.classList.remove("visible");window.scrollTo({top:0,behavior:"smooth"})});



// Simple client-side password gate. This is a playful barrier, not strong security:
// the password is present in the JavaScript source and can be discovered by visitors.
(() => {
    const PASSWORD = "1234";
    const screen = document.getElementById("passwordScreen");
    const site = document.getElementById("birthdaySite");
    const form = document.getElementById("passwordForm");
    const input = document.getElementById("sitePassword");
    const error = document.getElementById("passwordError");

    if (!screen || !site || !form || !input || !error) return;

    input.focus({ preventScroll: true });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (input.value === PASSWORD) {
            screen.classList.add("password-screen-unlocked");
            screen.style.transition = "opacity .45s ease, visibility .45s ease";
            screen.style.opacity = "0";
            screen.style.visibility = "hidden";
            site.hidden = false;
            document.body.classList.add("birthday-unlocked");
            window.setTimeout(() => screen.remove(), 500);
        } else {
            error.textContent = "Не тот код, попробуй ещё раз 💗";
            input.value = "";
            input.focus();
            input.setAttribute("aria-invalid", "true");
        }
    });

    input.addEventListener("input", () => {
        error.textContent = "";
        input.removeAttribute("aria-invalid");
    });
})();
