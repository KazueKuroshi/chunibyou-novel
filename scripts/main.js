let novelData = [];

fetch('data/novels.json')
  .then(res => res.json())
  .then(novels => {
    novelData = novels;
    renderNovels('all');
  });

function renderNovels(filter) {
  const section = document.getElementById('popular');
  section.innerHTML = '';
  const filtered = filter === 'all' ? novelData : novelData.filter(n => n.genre === filter);
  filtered.forEach(novel => {
    const card = document.createElement('div');
    card.className = 'reveal';
    card.innerHTML = `
      <img src="assets/images/${novel.thumbnail}" alt="${novel.title}" width="120" />
      <h3>${novel.title}</h3>
      <p><span class="badge">${novel.genre}</span> — <em>${novel.status}</em></p>
      <button onclick="toggleBookmark('${novel.title}')">🔖 Bookmark</button>
    `;
    section.appendChild(card);
  });
  revealOnScroll();
}

function filterGenre(genre) {
  renderNovels(genre);
}

function toggleMode() {
  document.body.classList.toggle('light');
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const winHeight = window.innerHeight;
    if (top < winHeight - 50) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);

function toggleBookmark(title) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const exists = bookmarks.includes(title);
  const updated = exists
    ? bookmarks.filter(t => t !== title)
    : [...bookmarks, title];

  localStorage.setItem('bookmarks', JSON.stringify(updated));
  showSnackbar(exists ? '❌ Bookmark dihapus!' : '🔖 Ditambahkan ke Bookmark!');
}

function showSnackbar(message) {
  const bar = document.getElementById('snackbar');
  bar.textContent = message;
  bar.className = 'show';
  setTimeout(() => {
    bar.className = '';
  }, 3000);
}
