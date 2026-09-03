# Portfolio Website Update Plan

Based on the newly provided resume (`Anurag_Shaw_Resume_2026.docx`), several sections of your portfolio website (`src/App.jsx`) are outdated and need to be refreshed to accurately reflect your latest skills, experience, and projects.

## User Review Required

Please review the proposed changes below, especially the wording for the hero section and the specific projects to be highlighted. Let me know if you would like to keep any of the old projects (like the E-commerce platform or Meetup App) alongside the new ones, or if we should replace them entirely.

## Open Questions

> [!WARNING]
> 1. **Location:** The website currently says "Kolkata, India", but your new job is in "Noida, India". Should we update the location in the Contact section to Noida?
> 2. **Projects to Display:** The website has 4 projects (E-Commerce, Workasana, Event Management, Lead Management). Your resume lists 3 (Memory Photo Album, Daily Learning Notes, Workasana Backend). Should we replace the old projects completely, or merge them to show a total of 5-6 projects?

## Proposed Changes

### `src/App.jsx`

#### [MODIFY] App.jsx

1. **Hero Section (Title & Bio)**
   - Update subtitle from `"Full Stack Developer & Creative Problem Solver"` to `"Full Stack Developer + AI"`.
   - Update bio description to highlight AI/LLM tooling, Next.js, and FastAPI alongside your React and Node.js expertise.

2. **About Section (Experience & Education)**
   - **Experience:** Update to reflect your current role as `"Full Stack Developer + AI"` at **Pelocal Fintech** (10/2025 - Present), highlighting your work on AI Voice/WhatsApp bots and Next.js/FastAPI dashboards.
   - **Education:** Replace "NeogCamp" with your formal degree: **Bachelor of Engineering in Computer Engineering** from **Parul University** (2021 - 2025).

3. **Skills Section**
   - **Frontend:** Add `Next.js`, `Material UI`, and `shadcn UI`.
   - **Backend:** Add `FastAPI`, `Zod`, `Redis`, and `Cloudinary`.
   - **Cloud & DevOps (New Category/Add to Tools):** Add `AWS`, `Google Cloud Platform (GCP)`, and `Docker`.
   - **AI / LLM Tooling (New Category):** Add `LangChain`, `LangGraph`, `LLM APIs`, and `RAG fundamentals`. (We may need to adjust the grid layout from 3 columns to 4 or reorganize the categories to fit the AI skills).

4. **Projects Section**
   - Integrate new projects from the resume:
     - **Memory Photo Album:** React, TS, Material UI, Node.js, MongoDB.
     - **Daily Learning Notes:** Next.js, PostgreSQL.
     - **Workasana:** Update the description to highlight the backend work you've done (JWT, RESTful APIs, Chart.js).
   - Adjust the grid and cards to display these new projects prominently.

5. **Contact & Footer**
   - Fix the email display typo from `shawanurag155@email.com` to `shawanurag155@gmail.com`.
   - Update the footer copyright year to **2026**.

## Verification Plan

### Automated Tests
- Run `npm run dev` to ensure the React application compiles without warnings or errors.

### Manual Verification
- Verify that the layout remains responsive and aesthetically pleasing with the newly added skills and project cards.
- Ensure all social and contact links correctly map to the updated information.
