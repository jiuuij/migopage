const savedFriends = JSON.parse(localStorage.getItem('friends')) || [];

    renderFriendList(savedFriends);

    function addFriend() {
      const friendNameInput = document.getElementById('friendName');
      const friendBirthdayInput = document.getElementById('friendBirthday');
      const friendImageInput = document.getElementById('friendImage');

      const friendName = friendNameInput.value.trim();
      const friendBirthday = parseInt(friendBirthdayInput.value);
      const friendImage = friendImageInput.files[0];

      if (friendName === '' || isNaN(friendBirthday) || !friendImage) {
        alert('입력값을 확인하세요.');
        return;
      }

      const newFriend = {
        name: friendName,
        birthday: friendBirthday,
        image: URL.createObjectURL(friendImage),
      };

      const newFriends = [...savedFriends, newFriend];

      localStorage.setItem('friends', JSON.stringify(newFriends));

      renderFriendList(newFriends);

      friendNameInput.value = '';
      friendBirthdayInput.value = '';
      friendImageInput.value = '';
    }

    function renderFriendList(friends) {
      const friendList = document.getElementById('friendList');
      friendList.innerHTML = '';

      friends.forEach(friend => {
        const li = document.createElement('li');
         li.style.listStyle = 'none';

        const name = document.createElement('span');
        name.textContent = '이름:' + friend.name;
        li.appendChild(name);

        const birthday = document.createElement('span');
        birthday.textContent = '생일: ' + friend.birthday;
        li.appendChild(birthday);

        const image = document.createElement('img');
        image.alt = friend.name + '의 사진';
        image.src = friend.image;
            // 이미지에 고정된 너비와 높이 설정
        image.style.width = '200px';
        image.style.height = '200px';
        li.appendChild(image);

        friendList.appendChild(li);
      });
    }