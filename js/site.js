(function () {
  var data = window.SITE_DATA;
  var icons = window.SITE_ICONS;
  var auth = window.SiteAuth;
  var FAVORITES_KEY = "favorite-lectures";

  function esc(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function scroller() {
    return document.querySelector(".agent-native-app-main") || window;
  }

  function scrollToTop() {
    scroller().scrollTo({ top: 0, behavior: "smooth" });
  }

  function readFavorites() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(function (item) { return typeof item === "string"; }) : [];
    } catch (error) {
      return [];
    }
  }

  function toggleFavorite(title) {
    var current = readFavorites();
    var next = current.indexOf(title) >= 0
      ? current.filter(function (item) { return item !== title; })
      : current.concat([title]);
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    paintFavoriteButtons();
    renderOverlay();
  }

  function paintFavoriteButtons() {
    var favorites = readFavorites();
    document.querySelectorAll(".lecture-card").forEach(function (card) {
      var button = card.querySelector(".lecture-favorite");
      var heading = card.querySelector("h2");
      if (!button || !heading) return;
      var title = heading.textContent;
      var isFavorite = favorites.indexOf(title) >= 0;
      button.classList.toggle("is-favorite", isFavorite);
      button.setAttribute("aria-pressed", String(isFavorite));
      button.setAttribute(
        "aria-label",
        isFavorite ? "Убрать «" + title + "» из избранного" : "Добавить «" + title + "» в избранное"
      );
    });
  }

  var overlayOpen = false;

  function renderOverlay() {
    var existing = document.querySelector(".favorites-overlay-backdrop");
    if (existing) existing.remove();
    var heart = document.querySelector(".header-favorites");
    if (heart) {
      heart.classList.toggle("is-active", overlayOpen);
      heart.setAttribute("aria-pressed", String(overlayOpen));
    }
    if (!overlayOpen) return;

    var favorites = readFavorites();
    var lectures = data.allLectures.filter(function (lecture) { return favorites.indexOf(lecture.title) >= 0; });
    var body = lectures.length === 0
      ? '<p class="favorites-overlay-empty">Вы пока не отметили ни одной лекции сердечком.</p>'
      : '<div class="favorites-overlay-list">' + lectures.map(function (lecture) {
          return '<a href="/lectures/' + lecture.sectionId + "#lecture-" + lecture.number + '">' +
            esc(lecture.title) + "<span>" + esc(lecture.sectionTitle) + "</span></a>";
        }).join("") + "</div>";

    var html = '<div class="favorites-overlay-backdrop"><section class="favorites-overlay" role="dialog" aria-modal="true" aria-label="Понравившиеся лекции">' +
      '<div class="favorites-overlay-header"><div><p class="eyebrow">ВАШ СПИСОК</p><h2>Понравившиеся <em>лекции</em></h2></div>' +
      '<button aria-label="Закрыть список">' + icons.favClose + "</button></div>" + body + "</section></div>";

    var main = document.querySelector("main.site-page-content");
    main.insertAdjacentHTML("beforebegin", html);
    var backdrop = document.querySelector(".favorites-overlay-backdrop");
    backdrop.addEventListener("click", closeOverlay);
    backdrop.querySelector(".favorites-overlay").addEventListener("click", function (event) { event.stopPropagation(); });
    backdrop.querySelector(".favorites-overlay-header button").addEventListener("click", closeOverlay);
  }

  function closeOverlay() {
    overlayOpen = false;
    renderOverlay();
  }

  function renderHeaderActions() {
    var box = document.querySelector(".header-actions");
    if (!box) return;
    var session = auth.getSession();
    var loginLink = box.querySelector(".header-login");
    var stale = box.querySelectorAll(".header-favorites, .header-logout");
    stale.forEach(function (node) { node.remove(); });
    if (!session) {
      if (!loginLink) {
        box.insertAdjacentHTML("beforeend", '<a class="header-login" href="/login" title="Войти">Войти</a>');
      }
      return;
    }
    if (loginLink) loginLink.remove();
    var title = session.name ? "Выйти, " + session.name : "Выйти из аккаунта";
    var search = box.querySelector(".header-search");
    search.insertAdjacentHTML(
      "afterend",
      '<button class="header-favorites" aria-label="Понравившиеся лекции" aria-pressed="false">' + icons.heart + "</button>" +
      '<button class="header-logout" aria-label="Выйти из аккаунта" title="' + esc(title) + '">' + icons.logout + "</button>"
    );
  }

  function searchNormalize(value) {
    return value.toLowerCase().replace(/ё/g, "е");
  }

  function searchWords(value) {
    return searchNormalize(value).split(/[^a-zа-я0-9]+/).filter(Boolean);
  }

  function searchStem(word) {
    return word.length >= 5 ? word.slice(0, -1) : word;
  }

  function matchesQuery(fields, queryWords) {
    var fieldWords = fields.flatMap(searchWords);
    return queryWords.every(function (queryWord) {
      var stem = searchStem(queryWord);
      return fieldWords.some(function (fieldWord) { return fieldWord.indexOf(stem) === 0; });
    });
  }

  function searchSite(query) {
    var queryWords = searchWords(query.trim());
    if (queryWords.length === 0) return [];
    var results = [];
    data.searchPages.forEach(function (page) {
      if (matchesQuery([page.title, page.text], queryWords)) {
        results.push({ key: "page-" + page.to, title: page.title, subtitle: page.text, to: page.to });
      }
    });
    data.allLectures.forEach(function (lecture) {
      if (matchesQuery([lecture.title, lecture.detail], queryWords)) {
        results.push({
          key: "lecture-" + lecture.sectionId + "-" + lecture.number,
          title: lecture.title,
          subtitle: lecture.sectionTitle,
          to: "/lectures/" + lecture.sectionId + "#lecture-" + lecture.number
        });
      }
    });
    return results.slice(0, 12);
  }

  var searchOpen = false;

  function renderSearch() {
    var box = document.querySelector(".header-search");
    if (!box) return;
    var button = box.querySelector("button");
    var input = box.querySelector('input[type="search"]');
    var results = box.querySelector(".header-search-results");
    if (results) results.remove();
    if (!searchOpen) {
      if (input) input.remove();
      button.setAttribute("aria-label", "Открыть поиск");
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = icons.search;
      return;
    }
    if (!input) {
      button.insertAdjacentHTML("beforebegin", '<input type="search" placeholder="Поиск" aria-label="Поиск по сайту" />');
      input = box.querySelector('input[type="search"]');
      input.addEventListener("input", function () { renderSearch(); });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeSearch();
      });
      input.focus();
    }
    button.setAttribute("aria-label", "Закрыть поиск");
    button.setAttribute("aria-expanded", "true");
    button.innerHTML = icons.headerClose;
    var query = input.value;
    if (query.trim()) {
      var found = searchSite(query);
      var list = found.length === 0
        ? '<p class="header-search-empty">Ничего не найдено</p>'
        : found.map(function (result) {
            return '<a href="' + esc(result.to) + '">' + esc(result.title) + "<span>" + esc(result.subtitle) + "</span></a>";
          }).join("");
      input.insertAdjacentHTML("afterend", '<div class="header-search-results">' + list + "</div>");
    }
  }

  function closeSearch() {
    searchOpen = false;
    renderSearch();
  }

  function openDialog(contentHtml, className, onClose) {
    var overlay = document.createElement("div");
    overlay.className = "site-dialog-overlay";
    overlay.setAttribute("data-state", "open");
    var content = document.createElement("div");
    content.className = className ? "site-dialog " + className : "site-dialog";
    content.setAttribute("role", "dialog");
    content.setAttribute("aria-modal", "true");
    content.setAttribute("data-state", "open");
    content.innerHTML = contentHtml + '<button type="button" class="site-dialog-close" aria-label="Закрыть">×</button>';
    document.body.appendChild(overlay);
    document.body.appendChild(content);

    function close() {
      if (!overlay.parentNode) return;
      overlay.remove();
      content.remove();
      document.removeEventListener("keydown", onKey);
      if (onClose) onClose();
    }

    function onKey(event) {
      if (event.key === "Escape") close();
    }

    overlay.addEventListener("click", close);
    content.querySelector(".site-dialog-close").addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return { element: content, close: close };
  }

  function openNewsletterDialog() {
    openDialog(
      '<h2 class="site-dialog-title">Спасибо за подписку!</h2>' +
      '<p class="site-dialog-text">Спасибо за подписку на нашу рассылку, проверяйте уведомления на электронной почте.</p>'
    );
  }

  function openRegisterDialog() {
    var remaining = 5;
    var dialog = null;
    var timer = null;
    function render() {
      if (!dialog) return;
      dialog.element.querySelector(".site-dialog-text").textContent =
        "Чтобы заполнить данные автоматически, создайте аккаунт. Перенаправим вас на страницу регистрации через " + remaining + " с.";
    }
    function stop() {
      clearInterval(timer);
    }
    function tick() {
      remaining -= 1;
      if (remaining <= 0) {
        stop();
        window.location.assign("/login");
        return;
      }
      render();
    }
    dialog = openDialog(
      '<h2 class="site-dialog-title">Нужна регистрация</h2>' +
      '<p class="site-dialog-text"></p>' +
      '<div class="site-dialog-actions"><button type="button" class="site-dialog-secondary">Остаться</button></div>',
      "",
      stop
    );
    render();
    timer = setInterval(tick, 1000);
    dialog.element.querySelector(".site-dialog-secondary").addEventListener("click", function () {
      dialog.close();
    });
  }

  function openFeedbackDialog() {
    var dialog = openDialog(
      '<h2 class="site-dialog-title">Обратная связь</h2>' +
      '<p class="site-dialog-text">Предложите доработку, напишите возражение или задайте вопрос.</p>' +
      '<form class="site-dialog-form">' +
      '<label class="site-dialog-field">Имя пользователя<input type="text" name="username" required /></label>' +
      '<label class="site-dialog-field">Эл. почта<input type="email" name="email" required /></label>' +
      '<label class="site-dialog-field">Вопрос<textarea name="question" required rows="4" maxlength="2000"></textarea></label>' +
      '<label class="site-dialog-field">Замечание или возражение<textarea name="remark" rows="4" maxlength="2000"></textarea></label>' +
      '<div class="site-dialog-actions"><button type="button" class="site-dialog-secondary">Автоматически заполнить данные</button><button type="submit" class="site-dialog-submit">Отправить</button></div>' +
      "</form>" +
      '<a class="site-dialog-home" href="/">' + icons.arrowLeft16 + " На главную</a>",
      "site-dialog-wide"
    );
    var form = dialog.element.querySelector("form");
    form.querySelector(".site-dialog-secondary").addEventListener("click", function () {
      var session = auth.getSession();
      if (!session) {
        openRegisterDialog();
        return;
      }
      form.querySelector('input[name="username"]').value = session.name || "";
      form.querySelector('input[name="email"]').value = session.email || "";
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.querySelector('textarea[name="question"]').value = "";
      form.querySelector('textarea[name="remark"]').value = "";
      if (!form.parentNode.querySelector(".site-dialog-status")) {
        form.insertAdjacentHTML("afterend", '<p class="site-dialog-status">Спасибо! Ваше сообщение принято.</p>');
      }
    });
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;

    var favoriteButton = target.closest(".lecture-favorite");
    if (favoriteButton) {
      var card = favoriteButton.closest(".lecture-card");
      var heading = card && card.querySelector("h2");
      if (heading) toggleFavorite(heading.textContent);
      return;
    }

    var footerTop = target.closest(".footer-bottom a");
    if (footerTop) {
      event.preventDefault();
      scrollToTop();
      return;
    }

    if (target.closest(".header-search > button")) {
      searchOpen = !searchOpen;
      renderSearch();
      return;
    }

    if (target.closest(".header-favorites")) {
      overlayOpen = !overlayOpen;
      renderOverlay();
      return;
    }

    if (target.closest(".header-logout")) {
      auth.signOut();
      window.location.assign("/");
      return;
    }

    if (target.closest(".footer-column-button")) {
      openFeedbackDialog();
      return;
    }

    if (target.closest(".header-search-results a")) {
      searchOpen = false;
    }
  });

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.closest(".footer-newsletter")) return;
    event.preventDefault();
    openNewsletterDialog();
    form.querySelector('input[type="email"]').value = "";
  });

  function initHashScroll() {
    if (!document.querySelector(".lecture-grid") || !window.location.hash) return;
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ block: "center" });
  }

  renderHeaderActions();
  paintFavoriteButtons();
  renderSearch();
  initHashScroll();

  window.Site = { esc: esc };
})();
