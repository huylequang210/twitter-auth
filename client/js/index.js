const main = document.querySelector('.main');
const chatting = document.querySelector('.chatting');
const API_URL = 'http://localhost:3222';
const greeting = document.querySelector('.greeting');
const form = document.querySelector('.form');
const comments = document.querySelector('.comments');
const submitButton = document.querySelector('.submit');
const logoutButton = document.querySelector('.logout');
const registerLink = document.querySelector('.register');
const loginLink = document.querySelector('.login')
let afterbegin = false;
let userId = new URL(window.location.href);
let userName;
userId = userId.search.split('?user=')[1];

function createDiv(data) {
  const div =  `
    <div class="comment">
      <a href="dashboard.html?user=${data.userId}"><h4 class="author">${data.userName}</h4></a>
      <p class="content">${data.content}</p>
      <p class="createdAt">${Date(data.createdAt)}</p>
    </div>
  `;
  if(afterbegin) {
    comments.insertAdjacentHTML('afterbegin', div);
    afterbegin = false;
    return;
  }
  comments.insertAdjacentHTML('beforeend', div);
}

chatting.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log(form);
  const formData = new FormData(form);
  const content = formData.get('content');
  const obj = {content, userId, userName};
  const go = await fetch(`${API_URL}/user/chatting/${userId}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await go.json();
  afterbegin = true;
  createDiv(data);
});

function userLogout() {
  logoutButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const go = await fetch(`${API_URL}/user/logout`, {
      method: 'GET',
      credentials: 'include'
    });
    console.log(go);
    if(go.ok) {
      submitButton.style.display = "none";
      greeting.innerHTML = 'You have been logged out';
      logoutButton.style.display = "none";
      registerLink.style.display = "inline-block";
      loginLink.style.display = "inline-block";
    }
  });
}

async function fetchComments() {
  const go = await fetch(`${API_URL}/comments`);
  const data = await go.json();
  if(data.length > 0) {
    data.forEach((el) => {
      createDiv(el);
    });
  }
  if(!userId) {
    logoutButton.style.display = "none";
    submitButton.style.display = "none";
  }
}

async function fetchUser() {
  if(userId) {
    const go = await fetch(`${API_URL}/user/chatting/${userId}`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await go.json();
    submitButton.style.display = "none";
    if(!data.msg) {
      greeting.innerHTML += 'Hello ' + data[0].name;
      userName = data[0].name;
      submitButton.style.display = "inline-block";
      registerLink.style.display = "none";
      loginLink.style.display = "none";
    } else {
      logoutButton.style.display = "none";
    }
    userLogout();
  }
}

fetchComments();
fetchUser();

