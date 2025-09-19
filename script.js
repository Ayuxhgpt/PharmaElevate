// script.js

document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Animated hero word sequence (simple stagger)
  const words = document.querySelectorAll('.anim-word');
  words.forEach((w,i) => {
    w.style.animationDelay = (i * 0.25) + 's';
  });

  // Counters - animate numbers
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = +counter.dataset.target || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const update = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(update);
      }
    };
    // start when visible
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          update();
          obs.disconnect();
        }
      });
    }, {threshold:0.6});
    obs.observe(counter);
  });

  // Drop-zone & file preview (gallery page)
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const previewGrid = document.getElementById('previewGrid');

  function handleFiles(files){
    if (!previewGrid) return;
    previewGrid.innerHTML = '';
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = file.name;
        img.tabIndex = 0;
        img.className = 'preview-img';
        img.addEventListener('click', () => openLightbox(e.target.result));
        previewGrid.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  if (dropZone){
    dropZone.addEventListener('click', () => fileInput && fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', e => { dropZone.classList.remove('dragover'); });
    dropZone.addEventListener('drop', e => {
      e.preventDefault(); dropZone.classList.remove('dragover');
      const dt = e.dataTransfer;
      if (dt && dt.files) handleFiles(dt.files);
    });
  }
  if (fileInput){
    fileInput.addEventListener('change', e => handleFiles(e.target.files));
  }

  // Lightbox
  function openLightbox(src){
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999';
    overlay.innerHTML = `<img src="${src}" style="max-width:92%;max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.6)"/>`;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }

  // Expose to global for inline calls if needed
  window.openLightbox = openLightbox;
});
