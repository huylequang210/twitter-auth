const main = document.querySelector('.main');
const dashboard = document.querySelector('.dashboard');
const userComments = document.querySelector('.userComments');
const API_URL = 'http://localhost:3222';
let comments; 

function createDiv(data) {
  const div =  `
    <div class="comment">
      <h4 class="author">${data.userName}</h4>
      <p class="content">${data.content}</p>
      <p class="createdAt">${Date(data.createdAt)}</p>
    </div>
  `;
  userComments.insertAdjacentHTML('beforeend', div);
}

async function fetchUser() {
  let userId = new URL(window.location.href);
  userId = userId.search.split('?user=')[1];
  const go = await fetch(`${API_URL}/user/dashboard/${userId}`, {
    method: 'GET',
    credentials: 'include'
  });
  const data = await go.json();
  console.log(data);
  data.forEach(el => {
    createDiv(el);
  })

}



fetchUser();