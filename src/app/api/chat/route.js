import http from "http";

export async function GET() {
  const startTime = Date.now();

  try {
    const prompt = `
You are an experienced JavaScript developer and professional technical writer.

Create ONE high-quality technical blog article.

TOPIC:
JavaScript map() Method

CATEGORY:
JavaScript

LEVEL:
Beginner

TARGET AUDIENCE:
Beginner developers learning JavaScript, React.js and MERN Stack.

ARTICLE REQUIREMENTS:

Explain:

1. Introduction
2. What is map()?
3. Why map() is useful
4. Syntax
5. How map() works
6. Basic JavaScript example
7. Practical JavaScript example
8. React.js example
9. MERN Stack example
10. Common mistakes
11. Best practices
12. Interview questions
13. Summary

CONTENT REQUIREMENTS:

- Write approximately 600-800 words.
- Use simple professional language.
- Use valid modern JavaScript.
- All code examples must be correct.
- Explain code examples clearly.
- Use realistic examples.
- Do not invent APIs.
- Do not invent facts.
- Do not mention AI.
- Do not include fake statistics.
- Do not include fake references.

CONTENT FORMAT:

The "content" field must contain HTML.

Use:

<h2>
<h3>
<p>
<ul>
<li>
<pre><code>

Do not use Markdown code fences inside content.

IMAGE:

Do NOT create an actual image.

Create only an "imagePrompt" describing a professional 16:9 developer-focused hero image for this article.

SEO:

Generate:

- SEO title
- SEO description
- Primary keyword
- Secondary keywords
- Relevant tags
- URL-friendly slug

IMPORTANT:

Return ONLY valid JSON.

Do not return Markdown.
Do not return explanations.
Do not return text outside the JSON.

Return EXACTLY this structure:

{
  "title": "string",
  "slug": "string",
  "description": "string",
  "category": "JavaScript",
  "tags": ["string"],
  "level": "Beginner",
  "primaryKeyword": "string",
  "secondaryKeywords": ["string"],
  "content": "string",
  "imagePrompt": "string",
  "seoTitle": "string",
  "seoDescription": "string"
}
`;

    console.log("========================================");
    console.log("🚀 BLOG GENERATOR");
    console.log("========================================");
    console.log("📌 Topic: JavaScript map() Method");
    console.log("📂 Category: JavaScript");
    console.log("📊 Level: Beginner");
    console.log("🤖 Model: qwen3:latest");
    console.log("⏳ Generating...");
    console.log("========================================");

    const result = await callOllama(prompt);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("📥 Response received");
    console.log(`⏱️ Generation time: ${elapsed}s`);

    const blog = JSON.parse(result);

    console.log("✅ JSON parsed successfully");
    console.log(`📝 Title: ${blog.title}`);
    console.log(`🔗 Slug: ${blog.slug}`);
    console.log(`🏷️ Tags: ${blog.tags?.join(", ")}`);
    console.log(`🖼️ Image prompt: ${blog.imagePrompt ? "YES" : "NO"}`);
    console.log(`📄 Content: ${blog.content ? "YES" : "NO"}`);
    console.log("========================================");

    return Response.json({
      success: true,
      generationTime: `${elapsed}s`,
      blog
    });

  } catch (error) {

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    console.error("========================================");
    console.error("❌ BLOG GENERATION FAILED");
    console.error(`⏱️ Time: ${elapsed}s`);
    console.error("========================================");
    console.error(error);
    console.error("========================================");

    return Response.json(
      {
        success: false,
        error: error.message,
        generationTime: `${elapsed}s`
      },
      {
        status: 500
      }
    );
  }
}


function callOllama(prompt) {
  return new Promise((resolve, reject) => {

    const requestData = JSON.stringify({
      model: "qwen3:latest",
      prompt: prompt,
      stream: false,
      format: "json",

      options: {
        temperature: 0.4,
        num_predict: 3000
      }
    });

    const options = {
      hostname: "localhost",
      port: 11434,
      path: "/api/generate",
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestData)
      },

      timeout: 15 * 60 * 1000
    };

    const req = http.request(options, (res) => {

      let body = "";

      console.log(`📡 Ollama status: ${res.statusCode}`);

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {

        if (res.statusCode !== 200) {
          reject(
            new Error(
              `Ollama returned ${res.statusCode}: ${body}`
            )
          );

          return;
        }

        try {

          const data = JSON.parse(body);

          if (!data.response) {
            reject(
              new Error("Ollama returned an empty response")
            );

            return;
          }

          resolve(data.response);

        } catch (error) {

          reject(
            new Error(
              `Invalid Ollama response: ${error.message}`
            )
          );
        }
      });
    });

    req.on("timeout", () => {

      req.destroy();

      reject(
        new Error(
          "Ollama request timed out after 15 minutes"
        )
      );
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(requestData);

    req.end();
  });
}