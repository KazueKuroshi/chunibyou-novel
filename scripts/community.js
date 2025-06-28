// Profil Lokal
function saveAlias() {
  const alias = document.getElementById('userAlias').value.trim();
  if (!alias) return;
  localStorage.setItem('alias', alias);
  showGreeting();
}

function showGreeting() {
  const alias = localStorage.getItem('alias');
  if (alias) {
    document.getElementById('greetingMsg').textContent = `Selamat datang, ${alias}! 🌟`;
  }
}

// Quest Harian
function loadDailyQuest() {
  const el = document.getElementById('daily-quest');
  const done = localStorage.getItem('daily-quest') === new Date().toDateString();
  el.innerHTML = `
    <h2>🗓️ Quest Harian</h2>
    <p>${done ? '✅ Kamu telah menyelesaikan quest hari ini!' : '🎯 Baca 3 genre dan bookmark 1 novel untuk menyelesaikan quest hari ini.'}</p>
  `;
  if (!done) {
    setTimeout(() => {
      localStorage.setItem('daily-quest', new Date().toDateString());
      loadDailyQuest();
    }, 3000);
  }
}

// Leaderboard
function loadLeaderboard() {
  const section = document.getElementById('leaderboard');
  const reads = Object.entries(localStorage)
    .filter(([k]) => k.startsWith('read-'))
    .map(([k, v]) => [k.slice(5), parseInt(v)])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  section.innerHTML = '<h2>🔥 Top Pembaca Minggu Ini</h2><ol>' +
    reads.map(([title, count]) => `<li>${title} (${count}x)</li>`).join('') +
    '</ol>';
}

// Badge
function loadBadges() {
  const badgeList = ['🏅', '🔮', '🔥', '📚'];
  const badgeDiv = document.getElementById('badge-wall');
  badgeDiv.innerHTML = `<h2>🎖️ Lencana Kamu</h2>` +
    badgeList.map(b => `<span class="badge">${b}</span>`).join('');
}

// Voting
document.getElementById('voteForm').addEventListener('submit', e => {
  e.preventDefault();
  const choice = document.querySelector('input[name="vote"]:checked');
  if (!choice) return;
  const vote = choice.value;
  let results = JSON.parse(localStorage.getItem('votes') || '{}');
  results[vote] = (results[vote] || 0) + 1;
  localStorage.setItem('votes', JSON.stringify(results));
  renderPollResults();
});

function renderPollResults() {
  const resDiv = document.getElementById('pollResults');
  const results = JSON.parse(localStorage.getItem('votes') || '{}');
  let html = '<h3>Hasil Sementara:</h3><ul>';
  for (const [judul, jumlah] of Object.entries(results)) {
    html += `<li>${judul}: ${jumlah} suara</li>`;
  }
  html += '</ul>';
  resDiv.innerHTML = html;
}

// Komentar
function postComment() {
  const box = document.getElementById('commentBox');
  const text = box.value.trim();
  if (!text) return;
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  comments.push(text);
  localStorage.setItem('comments', JSON.stringify(comments));
  box.value = '';
  renderComments();
}

function renderComments() {
  const list = document.getElementById('commentList');
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  list.innerHTML = comments.map(c => `<li>${c}</li>`).join('');
}

window.addEventListener('DOMContentLoaded', () => {
  showGreeting();
  loadDailyQuest();
  loadLeaderboard();
  loadBadges();
  renderPollResults();
  renderComments();
});
