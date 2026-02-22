const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Analysis = require('../models/Analysis');
const jwt = require('jsonwebtoken');

// Configure Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Analyze resume endpoint
router.post('/', upload.single('resume'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No resume file uploaded' });
    }

    try {
        // 1. Get User ID from token (optional)
        let userId = null;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'advorix_secret_key_2026');
                userId = decoded.id;
            } catch (err) {
                console.log('Token verification failed, continuing as guest');
            }
        }

        // 2. Parse PDF to Text
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdf(dataBuffer);
        const resumeText = pdfData.text;

        // 3. Call Gemini AI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Analyze the following resume text and provide a detailed matching report in JSON format.
            The JSON should strictly follow this structure:
            {
                "matchPercentage": number (0-100),
                "matchedSkills": ["skill1", "skill2"],
                "missingSkills": ["skill1", "skill2"],
                "skillBreakdown": {
                    "programming": number,
                    "frameworks": number,
                    "tools": number,
                    "softSkills": number
                },
                "suggestions": ["suggestion1", "suggestion2"],
                "learningLinks": {
                    "skillName1": "YouTube search query or playlist title for skillName1",
                    "skillName2": "YouTube search query or playlist title for skillName2"
                },
                "jobTitle": "suggested job title",
                "companyName": "Unknown"
            }

            For each skill in missingSkills, provide a concise but effective YouTube search query in the learningLinks object.

            Resume Text:
            ${resumeText}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean JSON response (Gemini sometimes adds markdown blocks)
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const analysisData = JSON.parse(text);

        // 4. Save to Database if user is logged in
        if (userId) {
            const newAnalysis = new Analysis({
                userId,
                resumeName: req.file.originalname,
                resumePath: req.file.path,
                ...analysisData
            });
            await newAnalysis.save();
        }

        res.json(analysisData);
    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({ message: 'Failed to analyze resume', error: error.message });
    }
});

module.exports = router;
