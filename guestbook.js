window.onload = function () {
  loadGuestbook();
  displayGuestbook(); // Call displayGuestbook on page load
};

let cnt = 1;

function a() {
  let writer = f.writer.value;
  let pwd = f.pwd.value;
  let content = f.content.value;

  // 방명록을 Local Storage에 저장
  saveToLocalStorage(writer, pwd, content);

  // 방명록을 화면에 표시
  displayGuestbook();
}

function saveToLocalStorage(writer, pwd, content) {
  let guestbookEntry = {
    id: cnt++,
    writer: writer,
    pwd: pwd,
    content: content
  };

  // 현재 Local Storage에 저장된 방명록 불러오기
  let guestbookList = JSON.parse(localStorage.getItem('guestbook')) || [];

  // 새로운 방명록 추가
  guestbookList.push(guestbookEntry);

  // Local Storage에 업데이트된 방명록 저장
  localStorage.setItem('guestbook', JSON.stringify(guestbookList));
}

function displayGuestbook() {
  let list = document.getElementById('list');
  list.innerHTML = ''; // 기존 목록 지우기

  // Local Storage에서 방명록 불러오기
  let guestbookList = JSON.parse(localStorage.getItem('guestbook')) || [];

  // 방명록을 화면에 표시
  for (let entry of guestbookList) {
    let el = mkDiv(entry.writer, entry.pwd, entry.content);
    list.appendChild(el);
  }
}

function mkDiv(writer, pwd, content) {
  let newDiv = document.createElement('div');
  newDiv.id = 'd_' + cnt++;
  newDiv.pwd = pwd;
  let html = '';
  html += '작성자:' + writer + '<br/>';
  html += '내용:' + content + '<br/>';
  html += "<input type='button' value='수정'>";
  html += "<input type='button' value='삭제'>";
  newDiv.innerHTML = html;
  return newDiv;
}
