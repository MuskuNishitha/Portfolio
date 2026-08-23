export async function POST(req) {
  const { code } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a code optimization expert.",
        },
        {
          role: "user",
          content: `Optimize this code and explain improvements:\n${code}`,
        },
      ],
    }),
  });

  const data = await response.json();

  return Response.json({
    optimizedCode: data.choices[0].message.content,
    explanation: "Improved performance and readability",
  });
}