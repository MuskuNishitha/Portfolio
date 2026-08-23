exports.optimizeCode = async (req, res) => {
  try {
    const { code } = req.body;

    console.log("👉 Incoming:", code);

    // ✅ Validation
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    // ✅ Gemini API call (correct model)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Strictly return ONLY valid JSON:

{
  "optimizedCode": "...",
  "explanation": "..."
}

Optimize this code:
${code}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("👉 Gemini full response:", JSON.stringify(data, null, 2));

    // ❌ API error handling
    if (!response.ok) {
      return res.status(500).json({
        success: false,
        message: "Gemini API error",
        error: data,
      });
    }

    // ✅ Extract AI text safely
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("👉 AI raw:", aiText);

    let parsed;

    // ✅ Safe JSON parse
    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      console.log("❌ JSON parse failed");

      parsed = {
        optimizedCode: aiText,
        explanation: "AI returned non-JSON response",
      };
    }

    // ✅ Final response
    return res.status(200).json({
      success: true,
      optimizedCode: parsed.optimizedCode,
      explanation: parsed.explanation,
    });

  } catch (error) {
    console.error("🔥 Server Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};