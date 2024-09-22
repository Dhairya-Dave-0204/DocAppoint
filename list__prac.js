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

/* ------------------ MULTI FORM ------------------ */

const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}
