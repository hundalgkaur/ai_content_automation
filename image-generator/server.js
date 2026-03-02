const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json({ limit: "1mb" }));

// Catch unexpected crashes
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

app.post("/generate-image", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Split German & Meaning
    const lines = text.split("Meaning:");
    const germanText = lines[0].trim();
    const meaningText = lines[1] ? lines[1].trim() : "";

    // Gradient backgrounds
    const gradients = [
      "linear-gradient(135deg, #6C5CE7, #00B894)",
      "linear-gradient(135deg, #FF6B6B, #FDCB6E)",
      "linear-gradient(135deg, #0984E3, #6C5CE7)",
      "linear-gradient(135deg, #E84393, #6C5CE7)",
      "linear-gradient(135deg, #00B894, #0984E3)",
      "linear-gradient(135deg, #FDCB6E, #E17055)"
    ];

    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Force exact Instagram size
    await page.setViewport({
      width: 1080,
      height: 1080,
      deviceScaleFactor: 1,
    });

    const html = `
    <html>
    <head>
    <meta charset="UTF-8">
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: ${randomGradient};
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .wrapper {
        width: 85%;
        text-align: center;
        color: white;
        top:60%;
      }

      .german {
        font-size: clamp(60px, 6vw, 100px);
        font-weight: 800;
        line-height: 1.3;
        margin-bottom: 40px;
        text-shadow: 0 10px 25px rgba(0,0,0,0.35);
        word-break: break-word;
      }

      .meaning {
        font-size: clamp(28px, 3vw, 45px);
        font-weight: 500;
        opacity: 0.95;
        word-break: break-word;
      }
    </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="german">${germanText}</div>
        ${
          meaningText
            ? `<div class="meaning">Meaning: ${meaningText}</div>`
            : ""
        }
      </div>
    </body>
    </html>
    `;

    await page.setContent(html, { waitUntil: "networkidle0" });

    const buffer = await page.screenshot({
      type: "png",
      fullPage: false,
    });

    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(buffer);

  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(4000, () => {
  console.log("✅ Image generator running on port 4000");
});