import { useEffect, useRef, useState } from 'react';
import Logo from "../assets/logo.png"
import Fuse from 'fuse.js';
import { getBotReply, BotReply } from '../utils/matchMessage'; // Assuming your logic is here
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ChatBotContainer.css';

// ChatBotContainer.tsx

interface Message {
  sender: 'user' | 'bot';
  text: string;
  image?: string;
  file?: string;
  highlight?: string[];
}



const chatbotGreetingKeywords: string[] = [
  "you","good morning", "good afternoon","good evening", "how are u", "how are you", "who are u", "who are you", "who are",
  "hay", "hi", "hello", "what's your name", "what are you", "tell me about yourself",
  "what can you do", "hey",  "sup", "what's up",  "greetings",
  "how do you work", "what are you capable of", "what's your purpose", "are you a robot",
  "are you human", "do you have a name", "introduce yourself", "can you help me",
  "can you talk", "say something", "talk to me", "who made you", "where are you from",
  "what is this", "explain yourself", "tell me something", "what do you do",
  "describe yourself", "chatbot", "virtual assistant", "talking bot"
];

const chatbotGreetingResponses: string[] = [
  `🤖 I'm your friendly Computer Engineering chatbot! Would you like to know about our <span class="highlight-keyword" data-msg="department appointments">department appointments</span>?`,
  `👋 Hello! I’m the Computer Engineering assistant bot. Curious about <span class="highlight-keyword" data-msg="how to calculate GP">how to calculate GP</span>?`,
  `💬 Hi there! I'm here to help with Computer Engineering info. Ask me about <span class="highlight-keyword" data-msg="our timetable">our timetable</span>.`,
  `🧠 I'm a smart bot built to assist you with department matters. Click <span class="highlight-keyword" data-msg="lecturer info">computer</span>course, to begin.`,
  `💡 Computer Engineering chatbot at your service! Want to know about how to get <span class="highlight-keyword" data-msg="past questions">past questions</span>?`,
  `💡 Computer Engineering chatbot at your service! Want to know about <span class="highlight-keyword" data-msg="how to identify student executive?">how to identify student executive</span>?`,
  // `🚀 Need guidance on <span class="highlight-keyword" data-msg="career opportunities">career opportunities</span> in Computer Engineering? Let me help!`,
  `🔧 I’m your assistant bot! Want to explore <span class="highlight-keyword" data-msg="our information">our information</span>? I can help you with that.`,
  `🎓 Want to know about our <span class="highlight-keyword" data-msg="academic workshops">academic</span> and how to get involved? Ask me now!`
];


// Fuse search setup for matching user input
const fuseChatbotGreeting = new Fuse<string>(chatbotGreetingKeywords, { threshold: 0.3 });

export default function ChatBotContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


const fresherKeywords = [
  "fresher", "new student", "beginner", "first year",
  "fresh student", "newcomer", "just admitted", "starting student",
  "freshman", "entry level student", "new enrollee", "fresh intake",
  "first time student", "admission requirements", "fresh admission",
  "freshers' guide", "how to start", "new student orientation", "what do freshers need"
];

const staliteKeywords = [
  "stalite", "returning student", "second year", "continuing student",
  "senior student", "upperclassman", "transfer student", "repeat student",
  "returnee", "ongoing student", "progressing student", "coming back",
  "year two student", "second year requirements", "what returning students need",
  "how to continue studies", "industrial training preparation", "final year prep"
];

const fuseFresher = new Fuse(fresherKeywords, { threshold: 0.35 });
const fuseStalite = new Fuse(staliteKeywords, { threshold: 0.35 });





  const handleSend = (text?: string) => {
    const userText = text || input.trim();
    if (!userText) return;
  
    const userMsg: Message = { sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
  
    setTimeout(() => {
      const lowerText = userText.toLowerCase();

// Keywords for matching various user intents around files and requirements
const facultyFileKeywords = [
  "file",
  "files",
  "requirement",
  "requirements",
  "faculty file",
  "faculty registration file",
  "faculty requirement",
  "faculty file arrangement",
  "faculty file needed",
  "faculty documents",
  "faculty requirements",
  "faculty registration documents",
  "how to arrange my files",
  "what are the requirement for clearance"
];

const departmentFileKeywords = [
  "department file",
  "department registration file",
  "department requirement",
  "department file arrangement",
  "department file needed",
  "department documents",
  "department requirements",
  "department registration documents"
];

const bothFileKeywords = [
  "registration file",
  "all registration file",
  "faculty and department file",
  "complete registration file",
  "file arrangement",
  "file needed",
  "requirements",
  "registration documents",
  "file requirements",
  "file documents"
];

// Initialize Fuse instances for fuzzy matching with a balanced threshold
const fuseFacultyFile = new Fuse(facultyFileKeywords, { threshold: 0.35 });
const fuseDeptFile = new Fuse(departmentFileKeywords, { threshold: 0.35 });
const fuseBoth = new Fuse(bothFileKeywords, { threshold: 0.35 });

// Assuming user input is already normalized (lowercased)
const facultyMatch = fuseFacultyFile.search(lowerText);
const deptMatch = fuseDeptFile.search(lowerText);
const bothMatch = fuseBoth.search(lowerText);

// Prepare professional file content responses
const facultyFileContents = `
📂 <strong>Faculty Registration File Contents (2022/2023):</strong><br><br>
1. 📝 Course Registration Form (signed)<br>
2. 🧾 Provisional Admission Slip<br>
3. 🧾 Copy of DPP Form Print-out<br>
4. 🧾 JAMB Slip (ND candidates only)<br>
5. 📑 Post ND Screening Result (HND candidates only)<br>
6. 🗂️ ND Certificate/Notification of Result (HND only)<br>
7. 🛠️ Industrial Training (IT) Letter (HND only)<br>
8. 💵 Acceptance Fee Print-out<br>
9. 📄 Photocopy of Credentials: SSCE, ND<br>
10. 💳 School Fees Receipt<br>
11. 💳 Faculty Levy Receipt<br>
12. 🖼️ Two Passport Photographs<br>
13. 🏥 Medical Fee Receipt (signed)<br>
14. ✍️ Oath Form<br>
15. 📘 NAPES Receipts<br>
16. 📘 SUG Receipt<br>
17. 📒 5-Subject Notebook Receipt (original)<br>
18. 📘 NECKMESH Receipt<br>
19. 🏷️ Departmental Clearance<br>
20. 📖 School Brochure<br>
21. 📔 Journal Receipts
`;

const departmentFileContents = `
📁 <strong>Department File Contents (Updated):</strong><br><br>
1. 📝 Course Registration Form (signed)<br>
2. 🪪 School ID Card<br>
3. 🖼️ Two Passport Photographs<br>
4. 🧾 School Fees Receipt (Departmental Copy)<br>
5. 🏷️ Departmental Clearance Form<br>
6. 📄 Admission Letter (Photocopy)<br>
7. 📑 DPP Form (Photocopy)<br>
8. 📄 Result Notification (ND or WAEC/NECO)<br>
9. 📎 Acceptance Letter (if available)<br>
10. 📝 Departmental Bio-Data Form<br>
11. 📘 Handbook<br>
12. 🏫 Orientation Attendance Proof (if any)<br>
13. 🧾 SUG Receipt (Photocopy)<br>
14. 📘 Departmental Dues Receipt<br>
15. 📦 File Jacket (with name & registration number)
`;



// Respond based on match priority: both > faculty > department
if (bothMatch.length > 0) {
  const botMsg: Message = {
    sender: 'bot',
    text: `${facultyFileContents}<br><hr><br>${departmentFileContents}`
  };
  setMessages(prev => [...prev, botMsg]);
  setIsTyping(false);
  return;
}

if (facultyMatch.length > 0) {
  const botMsg: Message = { sender: 'bot', text: facultyFileContents };
  setMessages(prev => [...prev, botMsg]);
  setIsTyping(false);
  return;
}

if (deptMatch.length > 0) {
  const botMsg: Message = { sender: 'bot', text: departmentFileContents };
  setMessages(prev => [...prev, botMsg]);
  setIsTyping(false);
  return;
}


  
      // Check for fresher or stalite match first
      
      const fresherMatch = fuseFresher.search(lowerText);
      const staliteMatch = fuseStalite.search(lowerText);
  
      if (fresherMatch.length > 0) {
        const fresherResponse = `🎓 Welcome, are you a fresher in Computer Engineering!<br><br>
      Here are the key things you should do:<br><br>
      1️⃣ 🗓️ Attend orientation to get familiar with the school environment.<br>
      2️⃣ 📘 Register for your courses early to avoid unnecessary delays.<br>
      3️⃣ 📖 Read and understand your departmental handbook and regulations.<br>
      4️⃣ 🧮 Take your foundational courses seriously (Maths, Physics, Intro to Programming).<br>
      5️⃣ 🤝 Connect with your course advisors and fellow students for guidance.<br>
      6️⃣ 👨‍🎓 Join academic groups and student support communities to grow academically and socially.<br>
    
          📑 <strong className="text-primary">Fresher Requirements:</strong><br>
    - Admission Letter<br>
    - O’Level Results<br>
    - Birth Certificate<br>
    - Passport Photograph<br>
    - School Fees Receipt`;
      
        const botMsg: Message = { sender: 'bot', text: fresherResponse };
        setMessages(prev => [...prev, botMsg]);
      
      } else if (staliteMatch.length > 0) {
        const staliteResponse = `💡 Welcome back, are you a Stalite in Computer Engineering!<br><br>
      Here’s how to make the most of your studies:<br><br>
      1️⃣ 💻 Focus on strengthening your technical and programming skills.<br>
      2️⃣ 🛠️ Participate in group projects or internships to gain real-world experience.<br>
      3️⃣ 🎯 Choose elective courses that align with your future career plans.<br>
      4️⃣ 🗣️ Attend departmental seminars and networking events.<br>
      5️⃣ 🧾 Start preparing early for SIWES (industrial training) or your final year project. <br>
      <strong className="text-primary">Stalite Requirements:</strong><br>
    - Course Registration Slip<br>
    - Clearance Form<br>
    - School ID Card<br>
    - Last Semester Results`;
      
        const botMsg: Message = { sender: 'bot', text: staliteResponse };
        setMessages(prev => [...prev, botMsg]);
      }
      
       else {
        // Proceed with original greeting check
        const greetingResults = fuseChatbotGreeting.search(lowerText);
  
        if (greetingResults.length > 0) {
          const response = chatbotGreetingResponses[Math.floor(Math.random() * chatbotGreetingResponses.length)];
          const botMsg: Message = { sender: 'bot', text: response };
          setMessages(prev => [...prev, botMsg]);
          
        } else {
          const botReply: BotReply = getBotReply(userText);
          const highlightedText = highlightKeywords(botReply.message, botReply.highlight);
          const botMsg: Message = {
            sender: 'bot',
            text: highlightedText,
            image: botReply.image,
            file: botReply.file,
            highlight: botReply.highlight,
          };
          setMessages(prev => [...prev, botMsg]);
        }
      }
  
      setIsTyping(false);
    }, 1000);
  };
  

  const highlightKeywords = (text: string, keywords?: string[]) => {
    if (!keywords) return text;
    return keywords.reduce((acc, keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      return acc.replace(regex, `<mark class="highlight-keyword" role="button" tabIndex="0">$1</mark>`);
    }, text);
  };

  const handleHighlightClick = (e: any) => {
    if (e.target.classList.contains('highlight-keyword')) {
      handleSend(e.target.innerText);
    }
  };

  const handleImageClick = (src: string) => {
    setEnlargedImage(prev => (prev === src ? null : src));
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

// greetings
useEffect(() => {
  const hour = new Date().getHours();
  let greeting = '';

  if (hour < 12) {
    greeting = '🌅 Good morning!';
  } else if (hour < 17) {
    greeting = '🌞 Good afternoon!';
  } else {
    greeting = '🌙 Good evening!';
  }

  const welcomeMessages = [
    "I'm your Computer Engineering chatbot. Ask me anything about the department!",
    "How can I help you explore Computer Engineering today?",
    "Got any questions about courses in Computer Engineering?",
    "I'm here to assist you with all things Computer Engineering!",
    "Need help understanding something in your department? Let's chat!",
    "Your Computer Engineering assistant is ready to answer your questions!"
  ];

  // Pick a random welcome message
  const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
  const randomWelcome = welcomeMessages[randomIndex];

  const botMsg: Message = {
    sender: 'bot',
    text: `${greeting} ${randomWelcome}`
  };

  setIsTyping(true);

  const timer = setTimeout(() => {
    setMessages([botMsg]);
    setIsTyping(false);
  }, 1000);

  return () => clearTimeout(timer);
}, []);

  

  return (
    <div className={`container-fluid min-vh-100 d-flex flex-md-row overflow-hidden p-0 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      
{/* Sidebar */}
<div
  className="block w-100 bg-image-container"
  style={{
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
  }}
>
  {/* Stronger fading overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.85)', // More faded
      zIndex: 1,
    }}
  ></div>

  {/* Foreground content */}
  <div
    className="w-100 min-vh-100 w-md-25 d-flex flex-column align-items-center justify-content-center p-3 text-center"
    style={{
      position: 'relative',
      zIndex: 2,
      color: '#000000',
      fontWeight: 800, // Extra bold
      textShadow: '0 1px 2px rgba(255,255,255,0.5)', // optional for lift effect
    }}
  >
    <i className="bi bi-robot fs-1 text-primary"></i>
    <h2 className="mt-2">The Polytechnic Ibadan</h2>
    <p className="text-dark">Smart Chat Assistant</p>
    <button onClick={toggleTheme} className="btn btn-dark mt-3">
      <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i> Toggle Mode
    </button>
  </div>
</div>



      {/* Chat Area */}
      <div className="w-100 w-md-75 d-flex flex-column p-3">
        <header className="chat-header py-3 border-bottom bg-dark text-white text-center">
          <h2>
            <i className="bi bi-cpu-fill me-2"></i>
            Computer-Engineering Chatbot (TPI)
            <button onClick={toggleTheme} className="btn btn-primary mt-3">
              <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
            </button>
          </h2>
        </header>

        {/* Messages */}
        <div className="flex-grow-1 overflow-auto border rounded p-3 mb-3 chat-body" onClick={handleHighlightClick}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender} animate__animated animate__fadeInUp`}>
              <div className={`d-flex flex-column ${msg.sender === 'user' ? 'align-items-end' : 'align-items-start'} mb-3`}>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="related"
                    className={`img-fluid chat-image mb-2 ${enlargedImage === msg.image ? 'enlarged' : ''}`}
                    style={{ maxWidth: enlargedImage === msg.image ? '100%' : '200px', transition: 'all 0.3s ease', cursor: 'pointer', borderRadius: '8px' }}
                    onClick={() => handleImageClick(msg.image!)}
                  />
                )}

                {msg.file && (
                  <a href={msg.file} download className="btn btn-sm btn-outline-primary mb-2">
                    <i className="bi bi-download me-1"></i>Download File
                  </a>
                )}

                <div className={`bubble px-3 py-2 shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light'}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message bot">
              <div className="d-inline-flex align-items-center text-muted gap-2">
                <i className="bi bi-arrow-repeat spin"></i>
                Bot is typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-group shadow-sm">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Ask me any thing about computer engineering..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="btn btn-primary" onClick={() => handleSend()}>
            <i className="bi bi-send" />
          </button>
        </div>
      </div>
    </div>
  );
}
