# AI Chatbot Integration: Architecture & Implementation Guide

This document outlines the complete architecture and step-by-step implementation plan for adding an intelligent, RAG-powered (Retrieval-Augmented Generation) chatbot to your portfolio website. 

Based on the provided screenshots, the bot will feature a floating trigger button, a consent/terms screen, and a chat interface. It will require a separate backend service to handle LLM responses and a knowledge base to answer questions about your experience, projects, and skills.

---

## 1. System Architecture Overview

To build a scalable and responsive chatbot, we will divide the system into three main components:

```mermaid
graph TD
    A[Portfolio Frontend (React)] <-->|REST API / WebSockets| B(Chatbot Backend Service)
    B -->|Query / Context| C{LLM (e.g., OpenAI, Gemini)}
    B <-->|Similarity Search| D[(Knowledge Base / Vector DB)]
    
    subgraph Frontend
    A1[Floating Widget] --> A2[Consent UI]
    A2 --> A3[Chat Interface]
    end
    
    subgraph Backend
    B1[API Endpoints] --> B2[LangChain Orchestration]
    B2 --> B3[RAG Logic]
    end
```

### Component Breakdown

1.  **Frontend (Portfolio - React/Next.js)**
    *   **UI Components:** A floating action button (FAB) fixed to the bottom right. When clicked, it opens a chat window.
    *   **State Management:** Handles user consent, chat history, loading states (typing indicators), and error handling.
    *   **Communication:** Sends user messages to the backend service and receives AI responses.

2.  **Backend Chat Service (FastAPI / Node.js)**
    *   *Recommendation: Use **FastAPI (Python)** since you have it on your resume and it pairs excellently with LangChain.*
    *   **API Layer:** Exposes endpoints (e.g., `/api/chat`) to receive messages.
    *   **LLM Orchestration:** Uses **LangChain** to manage prompts, memory (conversation history), and interactions with the core LLM (e.g., OpenAI GPT-4o, Anthropic Claude, or Google Gemini).
    *   **RAG Engine:** Takes the user's query, fetches relevant context from the Knowledge Base, and injects it into the LLM prompt.

3.  **Knowledge Base (Vector Database)**
    *   **Purpose:** Stores chunks of text about you (your resume, project details, contact info, blog posts).
    *   **Technology:** **Pinecone**, **ChromaDB**, or **Supabase (pgvector)**.
    *   **Process:** Documents are converted into numerical representations (embeddings) and stored here. When a user asks a question, the system finds the most relevant information to help the LLM answer accurately.

---

## 2. Step-by-Step Implementation Plan

### Phase 1: Create the Knowledge Base (Data Ingestion)

Before the bot can answer questions, it needs to learn about you.

1.  **Gather Data:** Collect your resume (PDF/Docx), project descriptions, LinkedIn summary, and any specific FAQs you want the bot to handle.
2.  **Process Data:** Write a small Python script using LangChain's `DocumentLoaders` to read these files.
3.  **Chunking:** Split the text into smaller, meaningful chunks (e.g., using `RecursiveCharacterTextSplitter`).
4.  **Embedding & Storage:** Pass the chunks through an embedding model (like OpenAI's `text-embedding-3-small`) and store them in a Vector Database (e.g., a free tier Pinecone index).

### Phase 2: Build the Backend Service (LLM Logic)

Create a new repository for this service to keep concerns separated from your portfolio frontend.

1.  **Project Setup:** Initialize a FastAPI project (`pip install fastapi uvicorn langchain openai pinecone-client`).
2.  **Create the RAG Pipeline:**
    *   Define a system prompt: *"You are an AI assistant for Anurag Shaw, a Full Stack Developer + AI. Answer questions about his experience and projects using only the provided context. Be professional and concise."*
    *   Setup the retrieval chain: When a message arrives, embed it, query the Vector DB for context, and pass the context + user message to the LLM.
3.  **Conversation Memory:** Implement `ConversationBufferMemory` or store chat history in a database (like MongoDB or Redis) so the bot remembers the context of the current conversation.
4.  **API Endpoint:** Create a `POST /chat` endpoint that accepts a `message` and `session_id`, and returns the bot's response. Add CORS middleware so your portfolio frontend can call it.
5.  **Deployment:** Deploy this service to **Render**, **Railway**, or **AWS EC2/Lambda**.

### Phase 3: Frontend Integration (Portfolio Website)

Update your existing React application to include the chat UI.

1.  **Create UI Components:**
    *   `ChatWidget.jsx`: The main container managing the open/close state.
    *   `ChatButton.jsx`: The floating button (e.g., red circle with a bot icon, matching your screenshot).
    *   `ConsentScreen.jsx`: The initial view asking for agreement to the Privacy Policy.
    *   `ChatWindow.jsx`: The message area (scrollable) and input field.
2.  **Implement Logic:**
    *   Track consent state in `localStorage` so the user isn't asked every time.
    *   Maintain an array of message objects: `{ role: 'user' | 'bot', text: string }`.
    *   On submit, append the user message, show a loading indicator, call your Backend Service API, and then append the bot's response.
3.  **Styling (Tailwind CSS):**
    *   Ensure the chat window is fixed (`fixed bottom-4 right-4 z-50`).
    *   Style user messages differently from bot messages (e.g., different background colors, alignment).

---

## 3. Data Structure Examples

### Frontend to Backend Request (Example)
```json
POST https://your-backend-service.com/api/chat
{
  "session_id": "user_12345",
  "message": "What projects has Anurag built using Next.js?"
}
```

### Backend to Frontend Response (Example)
```json
{
  "response": "Anurag has built the 'Call Report Analytics Dashboard' and 'Daily Learning Notes' using Next.js. Would you like to know more about either of these?",
  "sources": ["resume_projects.txt"]
}
```

---

## 4. Required Tech Stack Summary

| Component | Recommended Technology |
| :--- | :--- |
| **Frontend Framework** | React (Existing Portfolio) |
| **Styling** | Tailwind CSS (Existing) |
| **Backend Framework** | Python + FastAPI |
| **AI/LLM Framework** | LangChain |
| **LLM Provider** | OpenAI (GPT-4o-mini) or Anthropic (Claude 3.5 Sonnet) |
| **Vector Database** | Pinecone or ChromaDB |
| **Backend Hosting** | Render or Railway (Free tiers available) |

> [!TIP]
> **Next Steps:** If you approve this architecture, the best place to start is **Phase 1: Knowledge Base**. We can begin writing the Python script to extract your resume data and embed it into a vector database.
