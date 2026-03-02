# 🤖 AI Content Automation System

## 📌 Overview
Automated AI pipeline that:

- Generates content using Ollama
- Creates images using Node.js (Express server)
- Uploads images to Cloudinary
- Posts automatically to Instagram
- Sends same content to Telegram
- Runs daily using n8n Schedule Trigger

## 🏗 Architecture
n8n → Ollama → Node Image Server → Cloudinary → Instagram API → Telegram API

## 🚀 Run Locally

cd image-generator
npm install
node server.js

Server runs on: http://localhost:4000

## 📸 Project Screenshots

### 🧠 AI Agent Workflow
![AI Agent Workflow](screenshots/AI_AGENT_WORKFLOW.png)

### 📊 Flow Diagram
![Flow Diagram](screenshots/flow_diagram.png)

### 📸 Instagram Post
![Instagram](screenshots/INSTA.jpeg)

### ✈ Telegram Post
![Telegram](screenshots/TELE.jpeg)
