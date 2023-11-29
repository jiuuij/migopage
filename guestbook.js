// window.onload 이벤트 핸들러
window.onload = function () {
  loadGuestbook();
  displayGuestbook(); // Call displayGuestbook on page load
  // 글자 수를 세는 함수를 window.onload 내에 추가
  countText(); // 초기 로드 시에도 호출
    // 모달 외의 영역 클릭 시에도 모달을 닫도록 이벤트 처리
    window.onclick = function (event) {
    let overlayEdit = document.getElementById('overlay-edit');
    if (event.target === overlayEdit) {
    closeModal('overlay-edit');
      }
  
      let overlayDelete = document.getElementById('overlay-delete');
      if (event.target === overlayDelete) {
        closeModal('overlay-delete');
      }
    };
};

// 글자 수를 세는 함수
 function countText() {
  console.log('countText function called');
  // textarea의 내용을 가져와서 글자 수 계산
  let content = document.getElementById('content').value;
  let charCount = content.length;

  // 글자 수를 표시할 요소에 업데이트
  let countText = document.getElementById('usertext');
  countText.textContent = charCount + '/200 ';
}

let cnt = 1;
let guestbookEntry; // guestbookEntry를 전역으로 정의

function a() {
  let writer = f.writer.value;
  let pwd = f.pwd.value;
  let content = f.content.value;

  // 방명록을 Local Storage에 저장
  guestbookEntry = saveToLocalStorage(writer, pwd, content);
  console.log('Saved entry:', guestbookEntry);

  // 방명록을 화면에 표시
  displayGuestbook();
}

function saveToLocalStorage(writer, pwd, content) {
  // 현재 Local Storage에 저장된 방명록 불러오기
  let guestbookList = JSON.parse(localStorage.getItem('guestbook')) || [];

  let entry = {
    id: guestbookList.length + 1, // 현재 목록의 길이를 기반으로 ID 설정
    writer: writer,
    pwd: pwd,
    content: content,
    timestamp: new Date().toLocaleString(),
  };
  // 새로운 방명록 추가
  guestbookList.push(entry);

  // Local Storage에 업데이트된 방명록 저장
  localStorage.setItem('guestbook', JSON.stringify(guestbookList));

  // entry 반환
  return entry;
}

function displayGuestbook() {
  let list = document.getElementById('list');
  list.innerHTML = ''; // 기존 목록 지우기

// Local Storage에서 방명록 불러오기
let guestbookList = JSON.parse(localStorage.getItem('guestbook')) || [];
console.log('Loaded guestbook:', guestbookList);

// 방명록을 화면에 역순으로 표시
for (let i = guestbookList.length - 1; i >= 0; i--) {
  let entry = guestbookList[i];
  let el = mkDiv(entry.writer, entry.pwd, entry.content, entry.timestamp, entry.id);
  list.appendChild(el);
}
}

function loadGuestbook() {
  // Local Storage에서 방명록을 불러오는 작업
  let guestbookList = JSON.parse(localStorage.getItem('guestbook')) || [];
  return guestbookList;
}

function mkDiv(writer, pwd, content, timestamp, id) {
  let newDiv = document.createElement('div');
  newDiv.id = 'd_' + id;
  newDiv.pwd = pwd;

  newDiv.classList.add('list-Border');

  let html = '';
  html += '순서 : ' + id + '번째' + '<br/>';
  html += '작성자 : ' + writer + '<br/>';
  html += '내용 : ' + content.replace(/\n/g, '<br/>') + '<br/>'; // 줄 바꿈 문자를 <br> 태그로 변환
  html += '작성일 : ' + timestamp + '<br/>'; 
/*  html += "<input class='btn-edit' type='button' value='수정' onclick='editEntry(" + id + ")'>";*/
  html += "<input class='btn-delete' type='button' value='삭제' onclick='deleteEntry(" + id + ")'>";
  newDiv.innerHTML = html;
  return newDiv;
}

/*
// 수정 버튼 클릭 시
function editEntry(entry) {
  openModal('edit', entry);
}

// 모달 열기
function openModal(type, entry) {
  const modal = document.getElementById('overlay-edit');
  const modalContent = document.getElementById('modal-edit');

  // 모달에 어떤 작업을 할지 타입을 추가로 전달
  modal.setAttribute('data-type', type);

  if (type === 'edit') {
    // 수정 모달일 경우 entry 정보를 모달에 저장
    modal.setAttribute('data-entry', JSON.stringify(entry));
  }

  modal.style.display = 'flex';
  modalContent.style.display = 'block';
}

// 모달 닫기
function closeModal(modalId) {
  let overlay = document.getElementById(modalId);
  overlay.style.display = 'none';
}

// 수정 모달에서 비밀번호 확인 후 처리
function submitPassword() {
  const enteredPassword = document.getElementById('passwordInput').value;

  // 수정하는 경우 해당 entry의 비밀번호 가져오기
  const entryJSON = document.getElementById('overlay-edit').getAttribute('data-entry');
  const entry = entryJSON ? JSON.parse(entryJSON) : null;
  const storedPassword = entry ? entry.pwd : '';

  const modalType = document.getElementById('overlay-edit').getAttribute('data-type');

  console.log('입력한 비밀번호:', enteredPassword);
  console.log('저장된 비밀번호:', storedPassword);

  if (enteredPassword === storedPassword) {
    if (modalType === 'edit' && entry) {
      // 비밀번호가 일치하고, 수정 모달일 경우 수정 폼 표시
      loadEntryToForm(entry);
    }

    closeModal(); // 모달 닫기
  } else {
    // 비밀번호가 일치하지 않으면 알림 모달 띄우기
    displayAlertModal('비밀번호를 다시 확인해주세요.', 3000);
  }
}

// 수정 폼에 entry 데이터 로드
function loadEntryToForm(entry) {
  // 여기에 폼에 데이터를 로드하는 코드를 추가
  // 예를 들어, 아래와 같이 수정할 수 있습니다.

  // 수정 폼의 요소에 entry 데이터를 로드
  document.getElementById('writer').value = entry.writer;
  document.getElementById('content').value = entry.content;
  document.getElementById('pwd').value = entry.pwd; // 수정 부분
}
// 비밀번호 오류
// 알림 모달 표시 함수
function displayAlertModal(message, duration) {
  // 알림 모달 엘리먼트 찾기
  let alertModal = document.getElementById('overlay-re');
  let alertMessage = document.getElementById('modal-re');

  // 알림 메시지 설정
  alertMessage.textContent = message;

  // 알림 모달 표시
  alertModal.style.display = 'flex';

  // 일정 시간 후에 알림 모달 감추기
  setTimeout(() => {
    alertModal.style.display = 'none';
  }, duration);
}

// 수정모달 닫기
function closeEditModal() {
  closeModal('overlay-edit');
}
*/


//삭제버튼
// 삭제 기능 추가
let entryIdToDelete; // 전역 변수로 선언
function deleteEntry(entryId) {
  // 삭제 버튼을 눌렀을 때 모달을 생성하도록 함
  entryIdToDelete = entryId; // 삭제할 항목의 ID 저장
  openDeleteModal();
}
// 삭제모달 열기
function openDeleteModal() {
  closeModal('overlay-edit'); // 기존에 열려있는 수정 모달 닫기
  let overlayDelete = document.getElementById('overlay-delete');
  overlayDelete.style.display = 'flex';
}
// 삭제모달 닫기
function closeDeleteModal() {
  closeModal('overlay-delete');
}

// 삭제 확인 버튼 클릭 시 실행되는 함수
function deleteConfirmed() {
  // 삭제 확인되면 삭제 로직 추가
  deleteEntry(entryIdToDelete);

  // Local Storage에서 방명록 불러오기
  let guestbookList = JSON.parse(localStorage.getItem('guestbook')) || [];

  // entryIdToDelete와 일치하는 항목 제거
  guestbookList = guestbookList.filter(entry => entry.id !== entryIdToDelete);

  // 수정된 내용을 Local Storage에 저장
  localStorage.setItem('guestbook', JSON.stringify(guestbookList));

  // 모달 닫기
  closeDeleteModal();
  // 방명록을 화면에 다시 표시
  displayGuestbook();
}

// 모달들 닫기
function closeModal(modalId) {
  let overlay = document.getElementById(modalId);
  overlay.style.display = 'none';
}