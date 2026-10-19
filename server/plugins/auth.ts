import { signInJourneyInlineScript } from "@agent-native/core/shared";
import { createAuthPlugin } from "@agent-native/core/server";

const loginHtml = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>История России для чайников — вход</title>
  <style>
    :root{color-scheme:light;--ink:#5d3a3a;--rose:#b96879;--gold:#c49a3a;--paper:#fffaf8;--line:#ead9d4}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;flex-direction:column;background:radial-gradient(ellipse at 78% 18%,#f5e2e2 0,transparent 38%),#fbf1ed;color:var(--ink);font-family:Arial,sans-serif}.auth-wrap{width:min(100%,460px)}.brand{display:flex;align-items:center;justify-content:center;gap:10px;margin:0 0 27px;color:#a85568;font:500 27px Georgia,serif;letter-spacing:-.05em}.brand span{color:var(--gold);font-size:30px}.brand em{color:#bf8e51;font-weight:400}.auth-card{padding:clamp(26px,7vw,46px);background:var(--paper);border:1px solid var(--line);box-shadow:0 22px 60px #62434712}.eyebrow{text-align:center;color:#a37168;font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}.auth-card h1{margin:12px 0 8px;text-align:center;color:#743d4a;font:400 36px/1.1 Georgia,serif}.subcopy{margin:0 auto 26px;max-width:290px;text-align:center;color:#927471;font:italic 14px/1.6 Georgia,serif}.tabs{display:grid;grid-template-columns:1fr 1fr;margin-bottom:23px;border-bottom:1px solid var(--line)}.tabs button{padding:12px 8px;border:0;border-bottom:2px solid transparent;background:transparent;color:#927471;font-size:11px;cursor:pointer}.tabs button[aria-selected="true"]{border-bottom-color:var(--rose);color:#8e4f5a;font-weight:700}.field{display:block;margin:0 0 15px}.field span{display:block;margin-bottom:7px;color:#755754;font-size:10px;font-weight:700;letter-spacing:.08em}.field input{display:block;width:100%;height:45px;padding:0 13px;border:1px solid #e3ceca;border-radius:0;background:#fff;color:var(--ink);font:13px Arial,sans-serif;outline:none}.field input:focus{border-color:var(--rose);box-shadow:0 0 0 3px #b968791c}.submit{display:flex;align-items:center;justify-content:center;width:100%;min-height:47px;margin-top:22px;border:1px solid var(--rose);background:var(--rose);color:white;font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;cursor:pointer}.submit:disabled{opacity:.65;cursor:wait}.error{min-height:18px;margin:12px 0 0;color:#a0404c;font-size:12px;line-height:1.5}.error:empty{display:none}.legal{margin:18px 0 0;color:#a28c85;font-size:9px;line-height:1.6;text-align:center}.local-note{margin:18px 0 0;color:#947b73;font-size:10px;line-height:1.6;text-align:center}.hidden{display:none!important}@media(max-width:480px){body{padding:16px}.brand{font-size:23px}.auth-card h1{font-size:31px}}
    .lp-topline{height:31px;display:flex;align-items:center;justify-content:center;gap:8px;background:#f7dfe3;color:#7e5058;font-size:9px;letter-spacing:.09em;text-transform:uppercase}.lp-topline span{color:#bd9250;font-size:11px}.lp-topline strong{color:#985968;font-weight:700}
    .lp-header{height:82px;padding:0 max(5.6vw,28px);display:flex;align-items:center;justify-content:space-between;background:#fffaf8}
    .lp-brand{display:inline-flex;align-items:center;gap:8px;color:#a85568;font:500 24px/1 Georgia,serif;letter-spacing:-.055em;white-space:nowrap;text-decoration:none}.lp-brand i{font-weight:400;color:#bf8e51}.lp-brand span:first-child{font-size:25px;color:#c29a50}
    .lp-nav{display:flex;gap:clamp(20px,3vw,47px);align-items:center}.lp-nav a{font-size:11px;letter-spacing:.045em;color:#6e5553;text-decoration:none}.lp-nav a:hover,.lp-footer a:hover{color:#b25c70}
    .auth-main{flex:1;display:grid;place-items:center;padding:48px 28px 64px}
    .lp-footer{background:#5c4141;color:#f8eeea;padding:56px max(5.6vw,28px) 0}
    .lp-footer-main{display:grid;grid-template-columns:1.35fr .8fr 1fr;gap:35px;padding-bottom:48px}
    .lp-footer-main h3{margin:0 0 14px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#f3d5d5}
    .lp-footer-main p{margin:0 0 11px;font-size:9px;line-height:1.6;color:#dac5bf}
    .lp-footer-main a:not(.lp-brand){display:block;margin:0 0 11px;font-size:9px;color:#dac5bf;text-decoration:none}
    .lp-footer .lp-brand{color:#f3d5d5}.lp-footer .lp-brand i{color:#d3b377}.lp-footer .lp-brand span:first-child{color:#d8bc7d}
    .lp-copy{margin-top:22px!important;letter-spacing:.08em}
    .lp-footer-bottom{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:20px 0;border-top:1px solid #6e5454;font-size:9px;letter-spacing:.1em;color:#dac5bf}
    @media (max-width:900px){.lp-header{height:auto;padding:16px 20px;flex-wrap:wrap;gap:12px}.lp-nav{flex-wrap:wrap;gap:12px 18px}.lp-footer-main{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="lp-topline">Первая лекция бесплатно <span>✦</span> Скидка 10% на первый курс по промокоду <strong>BLOOMHISTORY</strong></div>
  <header class="lp-header">
    <a class="lp-brand" href="/" title="На главную"><span>✿</span><span>История России <i>для чайников</i></span></a>
    <nav class="lp-nav" aria-label="Меню"><a href="/new">Новинки</a><a href="/map">Интерактивная карта</a><a href="/lectures">Лекции</a><a href="/eras">Ключевые эпохи</a><a href="/about">О нас</a></nav>
  </header>
  <div class="auth-main"><div class="auth-wrap">
    <section class="auth-card">
      <p class="eyebrow">ИСТОРИЯ НАЧИНАЕТСЯ С ВАС</p>
      <h1 id="heading">Создать аккаунт</h1>
      <p class="subcopy" id="subcopy">Сохраните место в первом ряду к истории.</p>
      <div class="tabs" role="tablist" aria-label="Вход или регистрация">
        <button type="button" role="tab" id="signupTab" aria-selected="true">Регистрация</button>
        <button type="button" role="tab" id="loginTab" aria-selected="false">Войти</button>
      </div>
      <form id="signupForm">
        <label class="field"><span>ЮЗЕРНЕЙМ</span><input name="username" autocomplete="nickname" minlength="2" maxlength="120" required></label>
        <label class="field"><span>АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ</span><input name="email" type="email" autocomplete="email" required></label>
        <label class="field"><span>ПАРОЛЬ</span><input name="password" type="password" autocomplete="new-password" minlength="12" required></label>
        <label class="field"><span>ПОВТОРИТЕ ПАРОЛЬ</span><input name="repeatPassword" type="password" autocomplete="new-password" minlength="12" required></label>
        <button class="submit" type="submit">Зарегистрироваться <span aria-hidden="true">→</span></button>
      </form>
      <form id="loginForm" class="hidden">
        <label class="field"><span>АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ</span><input name="email" type="email" autocomplete="email" required></label>
        <label class="field"><span>ПАРОЛЬ</span><input name="password" type="password" autocomplete="current-password" required></label>
        <button class="submit" type="submit">Войти <span aria-hidden="true">→</span></button>
      </form>
      <p class="error" id="error" role="alert" aria-live="polite"></p>
      <p class="legal">Продолжая, вы соглашаетесь с условиями использования и политикой конфиденциальности.</p>
      <p class="local-note">Ваш юзернейм будет сохранён в профиле аккаунта.</p>
    </section>
  </div></div>
  <footer class="lp-footer">
    <div class="lp-footer-main">
      <div><a class="lp-brand" href="/"><span>✿</span><span>История России <i>для чайников</i></span></a><p>История в розовом свете.</p><p class="lp-copy">© 2025 ИСТОРИЯ РОССИИ</p></div>
      <div><h3>Контакты</h3><p>+7 (495) 318-27-64</p><p>hello@istoriya-chaynikov.ru</p><p>Москва, ул. Лесная, 14, оф. 302</p></div>
      <div><h3>Навигация</h3><a href="/">На главную</a><a href="/new">Новинки</a><a href="/lectures">Лекции</a><a href="/eras">Ключевые эпохи</a><a href="/about">О нас</a></div>
    </div>
    <div class="lp-footer-bottom"><span>СОЗДАНО С ЛЮБОВЬЮ К ИСТОРИИ</span><span>МОСКВА · ВЕЗДЕ</span></div>
  </footer>
  <script>${signInJourneyInlineScript()}</script>
  <script>
    (function(){
      var journey=__anCreateSignInJourney("","/");
      var locationParams=new URLSearchParams(window.location.search);
      var isRootEntry=window.location.pathname==="/"&&!locationParams.has(journey.PARAM)&&!locationParams.has(journey.LEGACY_PARAM);
      var resumeHref=isRootEntry?journey.homeHref():journey.journeyForLocation(window.location).resumeHref;
      var signupTab=document.getElementById("signupTab");
      var loginTab=document.getElementById("loginTab");
      var signupForm=document.getElementById("signupForm");
      var loginForm=document.getElementById("loginForm");
      var heading=document.getElementById("heading");
      var subcopy=document.getElementById("subcopy");
      var error=document.getElementById("error");
      var cyrillicPattern=/[\u0400-\u04FF]/;
      document.querySelectorAll("input").forEach(function(input){input.addEventListener("input",function(){input.value=input.value.replace(/[\u0400-\u04FF]/g,"")})});
      function showMode(mode){var signup=mode==="signup";signupTab.setAttribute("aria-selected",String(signup));loginTab.setAttribute("aria-selected",String(!signup));signupForm.classList.toggle("hidden",!signup);loginForm.classList.toggle("hidden",signup);heading.textContent=signup?"Создать аккаунт":"С возвращением";subcopy.textContent=signup?"Сохраните место в первом ряду к истории.":"Продолжите знакомство с историей.";error.textContent="";}
      signupTab.addEventListener("click",function(){showMode("signup")});
      loginTab.addEventListener("click",function(){showMode("login")});
      async function post(path,body){var response=await fetch(path,{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json","X-Agent-Native-Frontend":"1"},body:JSON.stringify(body)});var data=await response.json().catch(function(){return {}});if(!response.ok||data.error||data.ok===false)throw new Error(data.error||"Не удалось выполнить запрос. Попробуйте ещё раз.");return data;}
      async function submit(form,button,work){button.disabled=true;error.textContent="";try{await work(new FormData(form));window.location.replace(resumeHref);}catch(reason){error.textContent=reason instanceof Error?reason.message:"Не удалось выполнить запрос. Попробуйте ещё раз.";button.disabled=false;}}
      signupForm.addEventListener("submit",function(event){event.preventDefault();var button=signupForm.querySelector("button[type=submit]");submit(signupForm,button,async function(form){var username=String(form.get("username")||"").trim();var email=String(form.get("email")||"").trim();var password=String(form.get("password")||"");var repeatPassword=String(form.get("repeatPassword")||"");if(cyrillicPattern.test(username+email+password+repeatPassword))throw new Error("Русские буквы нельзя использовать.");if(password.length<12)throw new Error("Пароль должен содержать не менее 12 символов.");if(password!==repeatPassword)throw new Error("Пароли не совпадают.");if(username.length<2)throw new Error("Юзернейм должен содержать не менее двух символов.");await post("/_agent-native/auth/register",{email:email,password:password});await post("/_agent-native/auth/login",{email:email,password:password});await post("/_agent-native/actions/update-user-profile",{name:username});});});
      loginForm.addEventListener("submit",function(event){event.preventDefault();var button=loginForm.querySelector("button[type=submit]");submit(loginForm,button,async function(form){await post("/_agent-native/auth/login",{email:String(form.get("email")||"").trim(),password:String(form.get("password")||"")});});});
      fetch("/_agent-native/auth/session",{credentials:"same-origin"}).then(function(response){return response.json()}).then(function(session){if(session&&session.email)window.location.replace(resumeHref)}).catch(function(){});
    })();
  </script>
</body>
</html>`;

export default createAuthPlugin({ rootAuth: false, loginHtml });
