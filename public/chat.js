function displayMountainPicture() {
    // Generate a random image ID (you can customize the width and height)
    const randomImageId = Math.floor(Math.random() * 1000) + 1;
  
    const containerEl = document.querySelector('#mountain-picture');
  
    const imgEl = document.createElement('img');
    imgEl.classList.add('mountain-picture');
    imgEl.src = `https://picsum.photos/id/${randomImageId}/800/600`; // Adjust the width and height as needed
    imgEl.alt = 'Random Mountain';
  
    containerEl.appendChild(imgEl);
  }
  
  const storedUser = localStorage.getItem('user') || 'exampleUser';
  document.getElementById('displayedUser').innerText = storedUser;

  const conversations = [
      [{ user: 'John', message: 'Hi there!' }],
      [{ user: 'Alice', message: 'Hey! How are you?' }],
      [{ user: 'Bob', message: 'Hello!' }],
  ];

  let currentConversationIndex = 0;

  function changeConversation(index) {
      currentConversationIndex = index;
      renderMessages();
  }

  function updateSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.innerHTML = '';

      for (let i = 0; i < conversations.length; i++) {
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = `Conversation ${i + 1}`;
          link.onclick = function () {
              changeConversation(i);
              sidebar.appendChild(link);
          };
          sidebar.appendChild(link);
      }
  }

  function renderMessages() {
      const chatContainer = document.getElementById('chatContainer');
      chatContainer.innerHTML = '';

      const conversation = conversations[currentConversationIndex];
      conversation.forEach(msg => {
          const messageDiv = document.createElement('div');
          messageDiv.className = `chat-message ${msg.user === storedUser ? 'user-message' : 'other-user-message'}`;
          messageDiv.textContent = `${msg.user}: ${msg.message}`;
          chatContainer.appendChild(messageDiv);
      });
  }

  function sendMessage() {
      const messageInput = document.getElementById('message');
      const messageText = messageInput.value.trim();

      if (messageText !== '') {
          const conversation = conversations[currentConversationIndex];
          conversation.push({ user: storedUser, message: messageText });

          renderMessages();
          messageInput.value = ''; 
      }
  }
  
  updateSidebar();
  renderMessages();