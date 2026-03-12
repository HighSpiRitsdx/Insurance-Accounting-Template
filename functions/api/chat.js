// 这是 Cloudflare Pages Functions 的专属写法，专门处理 POST 请求
export async function onRequestPost({ request, env }) {
  try {
    // 1. 从 Cloudflare 的环境变量中安全获取 Key
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key 未配置' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. 解析前端发来的问题和业务场景数据
    const { message, context } = await request.json();

    // 3. 组装给 Gemini 的提示词
    const prompt = `
      你是一个专业的 IFRS 17 财务与精算 AI 助手。
      用户当前正在查看以下业务场景和财务数据：
      ${JSON.stringify(context)}
      
      请根据上述具体的数据和场景，回答用户的问题。回答要专业、简练。
      用户的问题是：${message}
    `;

    // 4. 安全地在云端向 Gemini 发起请求
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await geminiResponse.json();
    
    // 5. 提取回复并返回给前端
    const reply = data.candidates[0].content.parts[0].text;
    
    return new Response(JSON.stringify({ reply }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '与 AI 通信失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
