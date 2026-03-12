export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 从前端接收：用户输入的问题 (message) 和 当前屏幕上的数据 (context)
  const { message, context } = req.body;
  
  // 从云端环境变量中安全读取 API Key (绝对不会泄露给浏览器)
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key not configured in server' });
  }

  try {
    // 组装给 Gemini 的提示词，把当前的业务场景数据喂给它
    const prompt = `
      你是一个专业的 IFRS 17 财务与精算 AI 助手。
      用户当前正在查看以下业务场景和财务数据：
      ${JSON.stringify(context)}
      
      请根据上述具体的数据和场景，回答用户的问题。回答要专业、简练。
      用户的问题是：${message}
    `;

    // 发送请求给 Gemini API (这里使用 gemini-1.5-flash 模型，速度快且适合文本)
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await geminiResponse.json();
    
    // 提取 Gemini 的文字回复并返回给前端
    const reply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to communicate with AI' });
  }
}
