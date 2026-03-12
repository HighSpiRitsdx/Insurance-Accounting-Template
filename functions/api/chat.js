export async function onRequestPost({ request, env }) {
  try {
    // 1. 检查 API Key
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: '诊断结果：Cloudflare 没有读取到 GEMINI_API_KEY 环境变量，请检查环境变量设置并重新部署。' }), { 
        status: 500, headers: { 'Content-Type': 'application/json' }
      });
    }

    const { message, context } = await request.json();

    const prompt = `
      你是一个专业的 IFRS 17 财务与精算 AI 助手。
      用户当前正在查看以下业务场景和财务数据：
      ${JSON.stringify(context)}
      
      请根据上述具体的数据和场景，回答用户的问题。回答要专业、简练。
      用户的问题是：${message}
    `;

    // 2. 发起请求
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await geminiResponse.json();
    
    // 3. 增强报错：如果 Google 接口不返回 200，直接把 Google 的原话抛给前端
    if (!geminiResponse.ok) {
        return new Response(JSON.stringify({ error: `Google API 拒绝了请求，具体原因：${JSON.stringify(data)}` }), { 
            status: 500, headers: { 'Content-Type': 'application/json' }
        });
    }
    
    // 4. 正常提取回复
    const reply = data.candidates[0].content.parts[0].text;
    
    return new Response(JSON.stringify({ reply }), { 
      status: 200, headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // 5. 抓取代码本身的执行错误
    return new Response(JSON.stringify({ error: `代码执行异常：${error.message}` }), { 
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
