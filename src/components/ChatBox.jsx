import React, { useState } from "react";

function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [modalBox, setModalBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const aiMessage = { sender: "ai", text: data?.response};

      setMessages((prev) => [...prev, aiMessage]);
      console.log("Input sent to server:", input);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "ai", text: "Something went wrong!" }]);
    } finally {
      setLoading(false);
      console.log(messages);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <>
      <div 
       className="fixed bottom-6 right-5 bg-white flex items-center md:space-x-2 lg:space-x-2 p-5 rounded-lg drop-shadow-md hover:drop-shadow-lg"
       onClick={() => setModalBox(true)}
       >
         <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/message-bot.png" alt="message-bot"/>
         <span className="text-xs md:text-base lg:text-base hidden md:block lg:block">Ask Country With Ai</span>
      </div>
    
      { modalBox && (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex flex-col justify-center items-center ">

        <div 
         className="absolute top-5 right-5 bg-white p-1 rounded-full cursor-pointer"
         onClick={() => setModalBox(false)}
         >
         <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/delete-sign.png" alt="delete-sign"/>
        </div>

        <div className="bg-white w-96 md:w-1/2 lg:w-1/2 mx-auto p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Ask AI about countries!</h2>
          <div className="h-48 overflow-auto border p-2 mb-2 bg-gray-50 rounded">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <p className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                  {msg.text}
                </p>
              </div>
            ))}
            {loading && 
               <div className="animate-pulse w-fit">
                  <p className="text-xs text-gray-500">Ai Is Typing...</p>
              </div>}
          </div>
          <div className="flex flex-col md:flex-col lg:flex-row gap-2">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-lg"
              placeholder="Ask about a country..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="p-3 bg-[#6265ee] text-white rounded-lg"
              onClick={handleSendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default ChatBox;
