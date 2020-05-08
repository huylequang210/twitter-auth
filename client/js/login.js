const main = document.querySelector('.main');
const login = document.querySelector('.login');
const form = document.querySelector('.form');
const API_URL = 'http://localhost:3222';

function message(data) {
  const div = `<p class="cautionMessage">${data.msg}.</p>`;
  login.insertAdjacentHTML('afterbegin', div);
}

function removeCautionMessage() {
  const allChild = Array.from(login.children);
  console.log(allChild);
  allChild.forEach(el => {
    if(el.classList.contains('cautionMessage')) {
      el.parentElement.removeChild(el);
    }
  });
}

login.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');
  const obj = {email, password};
  const go = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await go.json();
  if(data.msg) {
    removeCautionMessage();
    message(data);
  }
  if(data.length > 0) {
    location.href = `index.html?user=${data[0]._id}`;
  }
});