let username = prompt('Please enter your username:');
username = (username || '').trim();
if (!username) username = 'Guest' + Math.floor(Math.random() * 1000);

const statusEl = document.getElementById('chat-status');
const formEl = document.getElementById('messages-form');
const inputEl = document.getElementById('user-message');
const messagesEl = document.getElementById('messages');
const msgBox = document.getElementById('message-list');

function setStatus(state) {
  statusEl.classList.remove('ok', 'bad', 'warn');

  if (state === 'ok') {
    statusEl.textContent = '🟢 Connected';
    statusEl.classList.add('ok');
  } else if (state === 'warn') {
    statusEl.textContent = '🟡 Reconnecting…';
    statusEl.classList.add('warn');
  } else {
    statusEl.textContent = '🔴 Disconnected';
    statusEl.classList.add('bad');
  }
}

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
  msgBox.scrollTop = msgBox.scrollHeight;
}

function addMessageToUI(data) {
  const li = document.createElement('li');

  // Top row: username + time
  const top = document.createElement('div');
  top.className = 'msg-top';

  const user = document.createElement('span');
  user.className = 'msg-user';
  user.textContent = data.username ?? 'Unknown';

  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = data.createdAt ? formatTime(data.createdAt) : '';

  top.appendChild(user);
  top.appendChild(time);

  // Text (safe)
  const text = document.createElement('div');
  text.className = 'msg-text';
  text.textContent = data.newMessage ?? '';

  li.appendChild(top);
  li.appendChild(text);

  // Buttons ONLY for my messages (simple client-side rule)
  if (data.username === username) {
    const del = document.createElement('button');
    del.className = 'buttond';
    del.textContent = '🗑️ Delete';
    del.onclick = () => li.remove();

    const edit = document.createElement('button');
    edit.className = 'buttond';
    edit.textContent = '✏️ Edit';
    edit.onclick = () => {
      const next = prompt('Edit your message:', text.textContent);
      if (next === null) return;
      const trimmed = next.trim();
      if (!trimmed) return;
      text.textContent = trimmed;
    };

    li.appendChild(del);
    li.appendChild(edit);
  }

  messagesEl.appendChild(li);
  scrollToBottom();
}

// If you want to connect to a remote URL, put it here:
// const socket = io('https://YOUR_URL_HERE');
const socket = io();

socket.on('connect', () => {
  setStatus('ok');
  // optional: announce join
  socket.emit('joined', { username });
});

socket.on('disconnect', () => setStatus('bad'));
socket.io.on('reconnect_attempt', () => setStatus('warn'));

socket.on('messageFromServerToAllClients', (data) => {
  addMessageToUI(data);
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = inputEl.value.trim();
  if (!msg) return;

  const data = {
    newMessage: msg,
    username: username,
    createdAt: Date.now()
  };

  inputEl.value = '';
  socket.emit('messageFromClientToServer', data);
});
