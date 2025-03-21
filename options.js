document.getElementById('save-button').addEventListener('click', function (e) {
  e.preventDefault();
  const chatbotUrl = document.getElementById('chatbot-url').value;
  const errorTip = document.getElementById('error-tip');

  if (chatbotUrl.trim() === "") {
      errorTip.textContent = "Recomi AI ChatBot URL cannot be empty.";
  } else {
    errorTip.textContent = "";

    chrome.storage.sync.set({
      'AI Chatbot URL': chatbotUrl,
      'chatbotUrl': chatbotUrl
    }, function () {
      // Create custom modal instead of alert
      const modal = document.createElement('div');
      modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(3px);';
      
      const modalContent = document.createElement('div');
      modalContent.style.cssText = 'background-color: #808080; border-radius: 16px; padding: 32px; text-align: center; width: 320px; color: white; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);';
      
      // Add the image wrapper for better centering
      const imageWrapper = document.createElement('div');
      imageWrapper.style.cssText = 'display: flex; justify-content: center; margin-bottom: 20px;';
      
      // Add the image with better resolution
      const image = document.createElement('img');
      image.src = 'images/128.png';  // 使用更高分辨率的图标
      image.alt = 'Recomi Logo';
      image.style.cssText = 'width: 42px; height: 42px; display: block; border-radius: 10px;';
      
      const title = document.createElement('h3');
      title.textContent = 'Recomi AI Chatbot';
      title.style.cssText = 'margin: 0 0 12px; font-size: 18px; font-weight: 500; letter-spacing: -0.2px;';
      
      const message = document.createElement('p');
      message.textContent = 'Save Success!';
      message.style.cssText = 'margin: 0 0 24px; font-size: 16px; opacity: 0.9;';
      
      const okButton = document.createElement('button');
      okButton.textContent = 'OK';
      okButton.style.cssText = 'background-color: #8064fc; color: white; border: none; padding: 12px 0; width: 100%; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;';
      
      okButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#6e51e8';
      });
      
      okButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#8064fc';
      });
      
      okButton.addEventListener('click', function() {
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 200);
      });
      
      imageWrapper.appendChild(image);
      modalContent.appendChild(imageWrapper);
      modalContent.appendChild(title);
      modalContent.appendChild(message);
      modalContent.appendChild(okButton);
      modal.appendChild(modalContent);
      
      // Add a fade-in effect
      modal.style.opacity = '0';
      document.body.appendChild(modal);
      setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.3s ease';
      }, 10);
    });
  }
});

// Load parameters from chrome.storage when the page loads
chrome.storage.sync.get(['chatbotUrl'], function (result) {
  const chatbotUrlInput = document.getElementById('chatbot-url');

  if (result.chatbotUrl) {
    chatbotUrlInput.value = result.chatbotUrl;
  }

});