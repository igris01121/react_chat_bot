from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

# Initialize FastAPI app
app = FastAPI()

# CORS setup for React (Vite + React dev servers)
origins = ["http://localhost:3000", "http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Message model
class Message(BaseModel):
    text: str

# In-memory message storage
messages: List[str] = ["Hello 👋", "This is a amine's chat box"]

# Root endpoint to test server
@app.get("/")
def root():
    return {"message": "Server is running"}

# GET /chat to fetch all messages
@app.get("/chat")
def get_messages():
    return {"messages": messages}

# POST /chat to send a new message
@app.post("/chat")
async def post_message(message: Message):
    # Append user's message
    messages.append(f"You: {message.text}")

    # Placeholder bot reply (replace with real API call if needed)
    bot_reply = f"Bot: Echoing '{message.text}'"
    messages.append(bot_reply)

    # ✅ Return both the bot reply and updated messages
    return {"reply": bot_reply, "messages": messages}
