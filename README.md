# AI Resume Analyzer

An AI-powered web application that analyzes resumes against job descriptions, Extracts skills, identifies gaps, and provides learning resources.

## Features
- **AI Analysis**: Uses Google Gemini 1.5 Flash to parse resumes and provide professional feedback.
- **Skill Matching**: Compares user skills with job requirements and calculates a match percentage.
- **Learning Roadmap**: Automatically generates YouTube search links for missing skills.
- **Secure Auth**: User registration and login using JWT and Mongoose.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React.
- **Backend**: Node.js, Express, Multer (File uploads), PDF-parse.
- **Database**: MongoDB Atlas.
- **AI**: Google Gemini API.

## Setup
1. **Clone the repo**
2. **Setup Backend**:
   - `cd server`
   - Create a `.env` file with `PORT`, `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.
   - `npm install`
   - `npm run dev`
3. **Setup Frontend**:
   - `npm install`
   - `npm run dev`

## License
MIT
