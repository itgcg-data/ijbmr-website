// IJBMR — shared behaviour (no dependencies)
(function () {
  document.documentElement.classList.remove('no-js');

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Issues list (data lives in assets/issues.js)
  var issues = window.IJBMR_ISSUES || [];
  var esc = function (str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  document.querySelectorAll('[data-issues]').forEach(function (list) {
    var limit = parseInt(list.getAttribute('data-limit'), 10) || issues.length;
    var shown = issues.slice(0, limit);
    if (!shown.length) {
      list.innerHTML = '<p class="empty-state">Issues will appear here soon.</p>';
      return;
    }
    list.innerHTML = shown.map(function (issue) {
      var link = (issue.link || '').trim();
      var isPdf = /\.pdf($|[?#])/i.test(link);
      var action = link
        ? '<a class="btn btn-outline" href="' + esc(link) + '" target="_blank" rel="noopener">' +
            (isPdf ? 'Open PDF' : 'View issue') + '<span class="visually-hidden"> for ' + esc(issue.title) + ' (opens in a new tab)</span></a>'
        : '<span class="tag warm">Coming soon</span>';
      return '<div class="article-item issue-item">' +
        '<div class="article-row">' +
          '<span class="article-title">' + esc(issue.title) + '</span>' +
          '<span class="article-leader" aria-hidden="true"></span>' +
          '<span class="article-date">' + esc(issue.date) + '</span>' +
        '</div>' +
        '<div class="issue-action">' + action + '</div>' +
      '</div>';
    }).join('');
  });

  // Editorial board (data lives in assets/board.js)
  var board = window.IJBMR_BOARD || [];
  document.querySelectorAll('[data-board]').forEach(function (grid) {
    if (!board.length) {
      grid.outerHTML = '<p class="note">Editorial board details will be published here soon. For enquiries, email <a href="mailto:tijbmr@gmail.com">tijbmr@gmail.com</a>.</p>';
      return;
    }
    grid.innerHTML = board.map(function (m) {
      return '<div class="card"><span class="tag">' + esc(m.role) + '</span>' +
        '<h3 style="margin-top:var(--space-3)">' + esc(m.name) + '</h3>' +
        '<p>' + esc(m.affiliation || '') + '</p></div>';
    }).join('');
  });

  // Contact: copy email address
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var status = document.querySelector('.copy-status');
      var done = function (ok) {
        if (status) status.textContent = ok ? 'Email address copied.' : 'Copy failed. Please select the address above.';
      };
      var fallback = function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
      } else {
        fallback();
      }
    });
  });

  // Standards: highlight current section in the table of contents
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
          var link = map[entry.target.id];
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }
})();
