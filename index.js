/* ------------------ AI CHATBOT ------------------ */

const sendChatBtn = document.querySelector(".chat-input button");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");
const chatBotToggler = document.querySelector(".chatbot-toggler");
const chatBotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const inputHeight = chatInput.scrollHeight;
const API_KEY = "AIzaSyClazX_egBmUNnUpa3dESoQ24dYv6zHxrM";

const createChatLI = (message, className) => {
    const chatLI = document.createElement("li");
    chatLI.classList.add("chat", className);
    let chatContent = className === "outgoing" 
        ? `<p></p>` : `<span> <i class="fa-solid fa-robot"></i> </span> <p></p>`
    chatLI.innerHTML = chatContent;
    chatLI.querySelector("p").textContent = message;
    return chatLI;
}

const generateResponse = (incomingChatLI) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`

    const messageElement = incomingChatLI.querySelector("p")

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
      }),
    };

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.candidates[0].content.parts[0].text;
    }).catch((error) => {
        messageElement.classList.add("error")
        messageElement.textContent = "Oops! Someting went worng. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) {
        return;
    }

    chatInput.value = "";
    chatInput.style.height = `${inputHeight}px`;
    
    chatbox.appendChild(createChatLI(userMessage, "outgoing"));

    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLI = createChatLI("Thinking...!", "incoming")
        chatbox.appendChild(incomingChatLI);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLI);
    }, 600)
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatBotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatBotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

/* ------------------ NAVIGATION BAR ------------------ */

const btn= document.getElementById("btn")
const list= document.querySelector(".list")

btn.addEventListener("click", ()=>{
  list.classList.toggle("show")
});


/* ------------------ DOCTOR COROUSEL SECTION ------------------ */

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

/* ------------------ USER TESTIMONIAL SECTION ------------------ */

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});