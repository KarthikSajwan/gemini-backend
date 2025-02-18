const aiService = require("../services/ai.service");
const Response = require("../models/Response");

module.exports.getResponse = async (req, res) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Check if response exists in DB
    const cachedResponse = await Response.findOne({ prompt });
    if (cachedResponse) {
      return res.json({ response: cachedResponse.response });
    }

    const response = await aiService(prompt);

    // Save response to DB
    const savedResponse = new Response({ prompt, response });
    await savedResponse.save();

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate AI response" });
  }
};
