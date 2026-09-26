# AI Chatbot Flow & Implementation Guide (using pgvector)

## Should You Use `pgvector`?

**Yes, absolutely.** Since you already have experience with PostgreSQL (as seen in your "Daily Learning Notes" project), using `pgvector` is an excellent choice for your vector database. 

### Why `pgvector`?
1. **Simplified Infrastructure:** Instead of managing a separate vector database (like Pinecone or Chroma) and a relational database, you can do everything inside one PostgreSQL instance.
2. **Open Source & Cost-Effective:** You aren't tied to a SaaS pricing model. You can host Postgres with pgvector cheaply on Supabase, Render, or Railway.
3. **LangChain Native:** LangChain has excellent built-in support for `pgvector`, making it very easy to integrate.

---

## 1. Complete System Flowchart

Here is the detailed flow of how a single user message travels from your portfolio website, gets augmented with your knowledge base, and returns a response.

```mermaid
sequenceDiagram
    autonumber
    
    actor User
    participant Frontend as Portfolio (React)
    participant Backend as API (FastAPI)
    participant Embedder as Embedding Model
    participant DB as PostgreSQL (pgvector)
    participant LLM as LLM (OpenAI/Gemini)

    %% Initial Interaction
    User->>Frontend: Clicks Floating Widget
    Frontend-->>User: Shows Consent Screen
    User->>Frontend: Accepts & Types Message (e.g., "What is Workasana?")
    
    %% API Request
    Frontend->>Backend: POST /chat { message, session_id }
    
    %% RAG Pipeline: Embedding
    Backend->>Embedder: Send message to embed
    Embedder-->>Backend: Returns Vector [0.01, 0.05, ...]
    
    %% RAG Pipeline: Vector Search
    Backend->>DB: Cosine Similarity Search with Vector
    DB-->>Backend: Returns relevant chunks (e.g., Workasana tech stack)
    
    %% LLM Generation
    Backend->>Backend: Combine Message + DB Chunks + Chat History
    Backend->>LLM: Send structured Prompt
    LLM-->>Backend: Returns AI Answer
    
    %% Response
    Backend-->>Frontend: JSON Response { text, sources }
    Frontend-->>User: Displays message in Chat UI
```

---

## 2. Step-by-Step Implementation Guide

To build this, you will need to create a **new backend project** alongside your existing portfolio frontend.

### Phase 1: Setup the Database (PostgreSQL + pgvector)

1. **Host a Postgres DB:** Create a free database on **Supabase** or **Neon**. These platforms support the `pgvector` extension natively out of the box.
2. **Enable the Extension:** Run this SQL command in your database:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

### Phase 2: Create the Knowledge Base (Data Ingestion Script)

In your backend project, create a Python script (`ingest.py`) to load your resume into Postgres.

1. **Install Dependencies:**
   ```bash
   pip install langchain langchain-groq langchain-huggingface psycopg2-binary pgvector
   ```
2. **Load & Chunk Data:**
   ```python
   from langchain_community.document_loaders import TextLoader
   from langchain_text_splitters import RecursiveCharacterTextSplitter

   loader = TextLoader("docs/Anurag_Shaw_Resume_2026.txt")
   docs = loader.load()
   
   text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
   chunks = text_splitter.split_documents(docs)
   ```
3. **Embed and Save to `pgvector`:**
   ```python
   from langchain_huggingface import HuggingFaceEmbeddings
   from langchain_postgres.vectorstores import PGVector

   connection = "postgresql+psycopg://user:password@host:port/dbname"
   # Using HuggingFace's free local embeddings instead of OpenAI
   embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

   # This creates the table and stores the embeddings
   vectorstore = PGVector.from_documents(
       documents=chunks,
       embedding=embeddings,
       connection=connection,
       collection_name="portfolio_data",
   )
   print("Data ingested successfully!")
   ```

### Phase 3: Build the Backend API (FastAPI)

Create the API server (`main.py`) that will handle the chat requests.

1. **Setup FastAPI:**
   ```python
   from fastapi import FastAPI
   from pydantic import BaseModel
   from fastapi.middleware.cors import CORSMiddleware

   app = FastAPI()

   # Allow your React frontend to call this API
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:5173", "https://3-d-portfolie.vercel.app"],
       allow_methods=["*"],
       allow_headers=["*"],
   )

   class ChatRequest(BaseModel):
       message: str
       session_id: str
   ```
2. **Create the RAG Retrieval Logic inside the endpoint:**
   ```python
   from langchain_groq import ChatGroq
   from langchain_huggingface import HuggingFaceEmbeddings
   from langchain.chains import create_retrieval_chain
   from langchain.chains.combine_documents import create_stuff_documents_chain
   from langchain_core.prompts import ChatPromptTemplate
   import os

   @app.post("/chat")
   async def chat(request: ChatRequest):
       # 1. Connect to the existing pgvector store using free embeddings
       vectorstore = PGVector(
           connection=connection, 
           embeddings=HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2"), 
           collection_name="portfolio_data"
       )
       retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

       # 2. Setup the Groq LLM (Ensure GROQ_API_KEY is in your .env)
       llm = ChatGroq(
           model="llama3-8b-8192", 
           temperature=0.3
       )

       # 3. Create the prompt instructing the bot
       system_prompt = (
           "You are an AI assistant for Anurag Shaw's portfolio. "
           "Use the following pieces of retrieved context to answer the user's question. "
           "If you don't know the answer, say that you don't know. "
           "Context: {context}"
       )
       prompt = ChatPromptTemplate.from_messages([
           ("system", system_prompt),
           ("human", "{input}"),
       ])

       # 4. Run the chain
       question_answer_chain = create_stuff_documents_chain(llm, prompt)
       rag_chain = create_retrieval_chain(retriever, question_answer_chain)

       response = rag_chain.invoke({"input": request.message})
       
       return {"response": response["answer"]}
   ```

### Phase 4: Build the Frontend (React / Tailwind)

1. **Create the Floating Button:** Add a fixed button in `App.jsx`:
   ```jsx
   <button className="fixed bottom-6 right-6 bg-red-500 rounded-full p-4 z-50">
       <ChatIcon />
   </button>
   ```
2. **Create the Chat Window & Consent Form:** When clicked, open a small modal (`fixed bottom-20 right-6 w-80`).
   * Show a terms checkbox first. Once accepted, show the chat UI.
3. **Connect to API:** When the user types a message, make a fetch request:
   ```javascript
   const sendMessage = async (text) => {
       const res = await fetch("https://your-fastapi-backend.com/chat", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ message: text, session_id: "user1" })
       });
       const data = await res.json();
       // Add data.response to your chat UI state
   }
   ```
