const main = document.querySelector('.main');
const register = document.querySelector('.register');
const form = document.querySelector('.form');
const API_URL = 'http://localhost:3222';

function message(data) {
  data.forEach(el => {
    const div = `<p class="cautionMessage">${el.msg}</p>`;
    register.insertAdjacentHTML('afterbegin', div);
  });
}

register.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const password2 = formData.get('password2');
  const obj = {name, email, password, password2};
  const go = await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await go.json();
  document.getElementById("password").value = "";
  document.getElementById("password2").value = "";
  if(data[0].msg) {
    message(data);
  }
  if(data.name) {
    location.href = 'login.html?register=true';
  }
});