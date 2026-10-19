import { signInJourneyInlineScript } from "@agent-native/core/shared";
import { createAuthPlugin } from "@agent-native/core/server";

const loginHtml = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>История России для чайников — вход</title>
  <style>
    :root{color-scheme:light;--ink:#5d3a3a;--rose:#b96879;--gold:#c49a3a;--paper:#fffaf8;--line:#ead9d4}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:28px;background:radial-gradient(ellipse at 78% 18%,#f5e2e2 0,transparent 38%),#fbf1ed;color:var(--ink);font-family:Arial,sans-serif}.auth-wrap{width:min(100%,460px)}.brand{display:flex;align-items:center;justify-content:center;gap:10px;margin:0 0 27px;color:#a85568;font:500 27px Georgia,serif;letter-spacing:-.05em}.brand span{color:var(--gold);font-size:30px}.brand em{color:#bf8e51;font-weight:400}.auth-card{padding:clamp(26px,7vw,46px);background:var(--paper);border:1px solid var(--line);box-shadow:0 22px 60px #62434712}.eyebrow{text-align:center;color:#a37168;font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}.auth-card h1{margin:12px 0 8px;text-align:center;color:#743d4a;font:400 36px/1.1 Georgia,serif}.subcopy{margin:0 auto 26px;max-width:290px;text-align:center;color:#927471;font:italic 14px/1.6 Georgia,serif}.tabs{display:grid;grid-template-columns:1fr 1fr;margin-bottom:23px;border-bottom:1px solid var(--line)}.tabs button{padding:12px 8px;border:0;border-bottom:2px solid transparent;background:transparent;color:#927471;font-size:11px;cursor:pointer}.tabs button[aria-selected="true"]{border-bottom-color:var(--rose);color:#8e4f5a;font-weight:700}.field{display:block;margin:0 0 15px}.field span{display:block;margin-bottom:7px;color:#755754;font-size:10px;font-weight:700;letter-spacing:.08em}.field input{display:block;width:100%;height:45px;padding:0 13px;border:1px solid #e3ceca;border-radius:0;background:#fff;color:var(--ink);font:13px Arial,sans-serif;outline:none}.field input:focus{border-color:var(--rose);box-shadow:0 0 0 3px #b968791c}.submit{display:flex;align-items:center;justify-content:center;width:100%;min-height:47px;margin-top:22px;border:1px solid var(--rose);background:var(--rose);color:white;font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;cursor:pointer}.submit:disabled{opacity:.65;cursor:wait}.error{min-height:18px;margin:12px 0 0;color:#a0404c;font-size:12px;line-height:1.5}.error:empty{display:none}.legal{margin:18px 0 0;color:#a28c85;font-size:9px;line-height:1.6;text-align:center}.local-note{margin:18px 0 0;color:#947b73;font-size:10px;line-height:1.6;text-align:center}.hidden{display:none!important}@media(max-width:480px){body{padding:16px}.brand{font-size:23px}.auth-card h1{font-size:31px}}
  </style>
</head>
<body>
  <main class="auth-wrap">
    <div class="brand"><span>✿</span><div>История России <em>для чайников</em></div></div>
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
        <label class="field"><span>ПАРОЛЬ</span><input name="password" type="password" autocomplete="new-password" minlength="8" required></label>
        <label class="field"><span>ПОВТОРИТЕ ПАРОЛЬ</span><input name="repeatPassword" type="password" autocomplete="new-password" minlength="8" required></label>
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
  </main>
  <script>${signInJourneyInlineScript()}</script>
  <script>
    (function(){
      var journey=__anCreateSignInJourney("","/welcome");
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
      function showMode(mode){var signup=mode==="signup";signupTab.setAttribute("aria-selected",String(signup));loginTab.setAttribute("aria-selected",String(!signup));signupForm.classList.toggle("hidden",!signup);loginForm.classList.toggle("hidden",signup);heading.textContent=signup?"Создать аккаунт":"С возвращением";subcopy.textContent=signup?"Сохраните место в первом ряду к истории.":"Продолжите знакомство с историей.";error.textContent="";}
      signupTab.addEventListener("click",function(){showMode("signup")});
      loginTab.addEventListener("click",function(){showMode("login")});
      async function post(path,body){var response=await fetch(path,{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json","X-Agent-Native-Frontend":"1"},body:JSON.stringify(body)});var data=await response.json().catch(function(){return {}});if(!response.ok||data.error||data.ok===false)throw new Error(data.error||"Не удалось выполнить запрос. Попробуйте ещё раз.");return data;}
      async function submit(form,button,work){button.disabled=true;error.textContent="";try{await work(new FormData(form));window.location.replace(resumeHref);}catch(reason){error.textContent=reason instanceof Error?reason.message:"Не удалось выполнить запрос. Попробуйте ещё раз.";button.disabled=false;}}
      signupForm.addEventListener("submit",function(event){event.preventDefault();var button=signupForm.querySelector("button[type=submit]");submit(signupForm,button,async function(form){var username=String(form.get("username")||"").trim();var email=String(form.get("email")||"").trim();var password=String(form.get("password")||"");var repeatPassword=String(form.get("repeatPassword")||"");if(password!==repeatPassword)throw new Error("Пароли не совпадают.");if(username.length<2)throw new Error("Юзернейм должен содержать не менее двух символов.");await post("/_agent-native/auth/register",{email:email,password:password});await post("/_agent-native/auth/login",{email:email,password:password});await post("/_agent-native/actions/update-user-profile",{name:username});});});
      loginForm.addEventListener("submit",function(event){event.preventDefault();var button=loginForm.querySelector("button[type=submit]");submit(loginForm,button,async function(form){await post("/_agent-native/auth/login",{email:String(form.get("email")||"").trim(),password:String(form.get("password")||"")});});});
      fetch("/_agent-native/auth/session",{credentials:"same-origin"}).then(function(response){return response.json()}).then(function(session){if(session&&session.email)window.location.replace(resumeHref)}).catch(function(){});
    })();
  </script>
</body>
</html>`;

export default createAuthPlugin({ rootAuth: true, loginHtml });
