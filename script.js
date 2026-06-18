// LWI shared JS — hamburger nav + FAQ accordion
(function () {
  // Mobile nav
  const hb = document.getElementById('hamburger');
  const mn = document.getElementById('mobile-nav');
  if (hb && mn) {
    hb.addEventListener('click', () => {
      const o = mn.classList.toggle('open');
      hb.setAttribute('aria-expanded', String(o));
    });
    mn.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mn.classList.remove('open');
        hb.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Map tooltip
  const mapTooltip = document.getElementById('map-tooltip');
  if (mapTooltip) {
    document.querySelectorAll('.map-pin').forEach(pin => {
      const label = pin.getAttribute('data-tip');
      if (!label) return;
      const mapWrap = pin.closest('svg').parentElement;
      pin.addEventListener('mouseenter', () => {
        mapTooltip.textContent = label;
        mapTooltip.setAttribute('aria-hidden', 'false');
        mapTooltip.classList.add('visible');
      });
      pin.addEventListener('mousemove', e => {
        const rect = mapWrap.getBoundingClientRect();
        const x = e.clientX - rect.left + 12;
        const y = e.clientY - rect.top - 44;
        mapTooltip.style.left = Math.min(x, rect.width - 220) + 'px';
        mapTooltip.style.top = Math.max(y, 8) + 'px';
      });
      pin.addEventListener('mouseleave', () => {
        mapTooltip.classList.remove('visible');
        mapTooltip.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // Newsletter form
  const nf = document.getElementById('nf');
  if (nf) {
    nf.addEventListener('submit', e => {
      e.preventDefault();
      const btn = document.getElementById('sub-btn');
      const inp = document.getElementById('email-in');
      if (!inp.value) return;
      btn.textContent = 'Subscribed!';
      btn.style.background = 'var(--success)';
      btn.style.borderColor = 'var(--success)';
      btn.disabled = true;
      inp.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Submit';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        inp.disabled = false;
        inp.value = '';
      }, 3000);
    });
  }
})();
