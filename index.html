import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, BookOpen, Landmark, Activity, 
  CheckCircle2, Circle, ChevronRight, ChevronLeft,
  PieChart, DollarSign, Target
} from 'lucide-react';

// --- 数据模型：业务场景与会计分录 ---
const scenarios = {
  single: [
    {
      id: 0, time: "T0", title: "初始确认与趸交保费",
      business: "销售团队成功售出 100 份 3年期寿险保单，客户一次性缴纳总保费 1200 元。",
      actuarial: "精算模型测算：未来预计理赔支出现值900，风险调整(RA)为60。保费抵减BEL与RA后，剩余240确认为初始CSM。Day 1 不确认利润。",
      entries: [
        { id: 1, acc: "现金", type: "借", amount: 1200, group: "asset" },
        { id: 2, acc: "保险合同负债-BEL", type: "贷", amount: 900, group: "liability" },
        { id: 3, acc: "保险合同负债-RA", type: "贷", amount: 60, group: "liability" },
        { id: 4, acc: "保险合同负债-CSM", type: "贷", amount: 240, group: "liability" }
      ]
    },
    {
      id: 1, time: "T1 年末", title: "第一年提供服务与理赔",
      business: "第一年平稳度过，本年度有部分客户出险，公司共计支付理赔款 300 元。",
      actuarial: "时间推移，精算释放 1/3 的 RA(20) 和 CSM(80)，加上预期理赔(300)，共同构成当期的「保险服务收入」。",
      entries: [
        { id: 1, acc: "保险合同负债-BEL", type: "借", amount: 300, group: "liability" },
        { id: 2, acc: "保险合同负债-RA", type: "借", amount: 20, group: "liability" },
        { id: 3, acc: "保险合同负债-CSM", type: "借", amount: 80, group: "liability" },
        { id: 4, acc: "保险服务收入", type: "贷", amount: 400, group: "revenue" },
        { id: 5, acc: "保险服务费用", type: "借", amount: 300, group: "expense" },
        { id: 6, acc: "现金", type: "贷", amount: 300, group: "asset" }
      ]
    },
    {
      id: 2, time: "T2 期初", title: "第二年续期保费 (无)",
      business: "第二年开始，由于是趸交产品，本期无客户交费动作。",
      actuarial: "无保费流入，负债端与现金端保持不变。",
      entries: []
    },
    {
      id: 3, time: "T2 年末", title: "第二年提供服务与理赔",
      business: "第二年平稳度过，本年度又有部分客户出险，公司再次支付理赔款 300 元。",
      actuarial: "与第一年一致，继续按既定模式释放 1/3 的 RA 和 CSM 确认当期收入。",
      entries: [
        { id: 1, acc: "保险合同负债-BEL", type: "借", amount: 300, group: "liability" },
        { id: 2, acc: "保险合同负债-RA", type: "借", amount: 20, group: "liability" },
        { id: 3, acc: "保险合同负债-CSM", type: "借", amount: 80, group: "liability" },
        { id: 4, acc: "保险服务收入", type: "贷", amount: 400, group: "revenue" },
        { id: 5, acc: "保险服务费用", type: "借", amount: 300, group: "expense" },
        { id: 6, acc: "现金", type: "贷", amount: 300, group: "asset" }
      ]
    },
    {
      id: 4, time: "T3 期初", title: "第三年续期保费 (无)",
      business: "第三年开始，由于是趸交产品，本期依然无客户交费动作。",
      actuarial: "无保费流入，负债端与现金端保持不变。",
      entries: []
    },
    {
      id: 5, time: "T3 年末", title: "期满给付与负债清零",
      business: "三年保单期满。公司向最后生存的客户支付满期金，共计 300 元。所有保单顺利终止。",
      actuarial: "最后一年，剩余的 RA 和 CSM 全部释放完毕。支付满期金后，保险合同负债完全清零，保单生命周期结束。",
      entries: [
        { id: 1, acc: "保险合同负债-BEL", type: "借", amount: 300, group: "liability" },
        { id: 2, acc: "保险合同负债-RA", type: "借", amount: 20, group: "liability" },
        { id: 3, acc: "保险合同负债-CSM", type: "借", amount: 80, group: "liability" },
        { id: 4, acc: "保险服务收入", type: "贷", amount: 400, group: "revenue" },
        { id: 5, acc: "保险服务费用", type: "借", amount: 300, group: "expense" },
        { id: 6, acc: "现金", type: "贷", amount: 300, group: "asset" }
      ]
    }
  ],
  regular: [
     {
      id: 0, time: "T0", title: "初始确认与首期保费",
      business: "销售团队售出 100 份 3年期期交寿险，客户缴纳首年保费共 400 元，并承诺未来两年继续交费。",
      actuarial: "精算测算：未来理赔支出现值900，未来续期保费现值800。BEL初始为(900-800)=100。RA为60。首期保费400抵减BEL与RA后，产生CSM 240。",
      entries: [
        { id: 1, acc: "现金", type: "借", amount: 400, group: "asset" },
        { id: 2, acc: "保险合同负债-BEL", type: "贷", amount: 100, group: "liability" },
        { id: 3, acc: "保险合同负债-RA", type: "贷", amount: 60, group: "liability" },
        { id: 4, acc: "保险合同负债-CSM", type: "贷", amount: 240, group: "liability" }
      ]
    },
    {
      id: 1, time: "T1 年末", title: "第一年提供服务与理赔",
      business: "第一年平稳度过，本年度有部分客户出险，公司共计支付理赔款 300 元。",
      actuarial: "释放 1/3 的 RA(20) 和 CSM(80)，预期理赔(300)确认为当期收入。实际发生理赔确认为费用。",
      entries: [
        { id: 1, acc: "保险合同负债-BEL", type: "借", amount: 300, group: "liability" },
        { id: 2, acc: "保险合同负债-RA", type: "借", amount: 20, group: "liability" },
        { id: 3, acc: "保险合同负债-CSM", type: "借", amount: 80, group: "liability" },
        { id: 4, acc: "保险服务收入", type: "贷", amount: 400, group: "revenue" },
        { id: 5, acc: "保险服务费用", type: "借", amount: 300, group: "expense" },
        { id: 6, acc: "现金", type: "贷", amount: 300, group: "asset" }
      ]
    },
    {
      id: 2, time: "T2 期初", title: "收取第二期保费",
      business: "第二年开始，存活的客户按时缴纳了第二年的续期保费，共计收到现金 400 元。",
      actuarial: "未来可收取的保费减少，导致 BEL（代表未来的净流出）相应增加。",
      entries: [
        { id: 1, acc: "现金", type: "借", amount: 400, group: "asset" },
        { id: 2, acc: "保险合同负债-BEL", type: "贷", amount: 400, group: "liability" }
      ]
    },
    {
      id: 3, time: "T2 年末", title: "第二年提供服务与理赔",
      business: "第二年平稳度过，本年度有部分客户出险，公司再次支付理赔款 300 元。",
      actuarial: "继续释放 1/3 的 RA 和 CSM 确认为当期收入，并确认实际理赔费用。",
      entries: [
        { id: 1, acc: "保险合同负债-BEL", type: "借", amount: 300, group: "liability" },
        { id: 2, acc: "保险合同负债-RA", type: "借", amount: 20, group: "liability" },
        { id: 3, acc: "保险合同负债-CSM", type: "借", amount: 80, group: "liability" },
        { id: 4, acc: "保险服务收入", type: "贷", amount: 400, group: "revenue" },
        { id: 5, acc: "保险服务费用", type: "借", amount: 300, group: "expense" },
        { id: 6, acc: "现金", type: "贷", amount: 300, group: "asset" }
      ]
    },
    {
      id: 4, time: "T3 期初", title: "收取第三期保费",
      business: "第三年开始，存活的客户按时缴纳了最后一次续期保费，共计收到现金 400 元。",
      actuarial: "此时未来已无保费流入，BEL 达到峰值。",
      entries: [
        { id: 1, acc: "现金", type: "借", amount: 400, group: "asset" },
        { id: 2, acc: "保险合同负债-BEL", type: "贷", amount: 400, group: "liability" }
      ]
    },
    {
      id: 5, time: "T3 年末", title: "期满给付与负债清零",
      business: "三年保单期满。公司向最后生存的客户支付满期金，共计 300 元。所有保单终止。",
      actuarial: "最后一年，剩余的 RA 和 CSM 全部释放完毕。支付满期金后，保险合同负债完全清零。",
      entries: [
        { id: 1, acc: "保险合同负债-BEL", type: "借", amount: 300, group: "liability" },
        { id: 2, acc: "保险合同负债-RA", type: "借", amount: 20, group: "liability" },
        { id: 3, acc: "保险合同负债-CSM", type: "借", amount: 80, group: "liability" },
        { id: 4, acc: "保险服务收入", type: "贷", amount: 400, group: "revenue" },
        { id: 5, acc: "保险服务费用", type: "借", amount: 300, group: "expense" },
        { id: 6, acc: "现金", type: "贷", amount: 300, group: "asset" }
      ]
    }
  ]
};

export default function App() {
  const [mode, setMode] = useState('single');
  const [currentStep, setCurrentStep] = useState(0);

  const activeData = scenarios[mode];
  const currentEvent = activeData[currentStep];

  // 计算截止当前步骤的累计余额
  const balances = useMemo(() => {
    const acc = {
      cash: 0,
      bel: 0,
      ra: 0,
      csm: 0,
      revenue: 0,
      expense: 0
    };

    for (let i = 0; i <= currentStep; i++) {
      activeData[i].entries.forEach(entry => {
        // 资产类：借增贷减
        if (entry.acc === "现金") {
          acc.cash += entry.type === "借" ? entry.amount : -entry.amount;
        }
        // 负债类：贷增借减
        if (entry.acc === "保险合同负债-BEL") {
          acc.bel += entry.type === "贷" ? entry.amount : -entry.amount;
        }
        if (entry.acc === "保险合同负债-RA") {
          acc.ra += entry.type === "贷" ? entry.amount : -entry.amount;
        }
        if (entry.acc === "保险合同负债-CSM") {
          acc.csm += entry.type === "贷" ? entry.amount : -entry.amount;
        }
        // 损益类
        if (entry.acc === "保险服务收入") {
          acc.revenue += entry.type === "贷" ? entry.amount : -entry.amount;
        }
        if (entry.acc === "保险服务费用") {
          acc.expense += entry.type === "借" ? entry.amount : -entry.amount;
        }
      });
    }
    return acc;
  }, [mode, currentStep, activeData]);

  const totalLiability = balances.bel + balances.ra + balances.csm;
  const netProfit = balances.revenue - balances.expense;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header区 */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Activity className="text-indigo-600" />
              IFRS 17 寿险会计演练
            </h1>
            <p className="text-slate-500 text-sm mt-1">从精算视角看保单生命周期中的财务报表联动</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => { setMode('single'); setCurrentStep(0); }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'single' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              趸交模式 (Single)
            </button>
            <button 
              onClick={() => { setMode('regular'); setCurrentStep(0); }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'regular' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              期交模式 (Regular)
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 左侧：时间轴 */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">保单生命周期 (Timeline)</h3>
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
              {activeData.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`relative pl-6 cursor-pointer group ${idx > currentStep ? 'opacity-40' : ''}`}
                  onClick={() => setCurrentStep(idx)}
                >
                  <div className={`absolute -left-[11px] top-0.5 bg-white p-0.5 rounded-full transition-colors ${idx === currentStep ? 'text-indigo-600' : idx < currentStep ? 'text-emerald-500' : 'text-slate-300'}`}>
                    {idx < currentStep ? <CheckCircle2 size={18} /> : <Circle size={18} fill={idx === currentStep ? 'currentColor' : 'none'} />}
                  </div>
                  <div className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{step.time}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{step.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 中间：业务场景与分录 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="text-indigo-500" size={20}/>
                  当前事件与会计分录
                </h2>
                <div className="flex gap-2">
                  <button 
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(s => s - 1)}
                    className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={20}/>
                  </button>
                  <button 
                    disabled={currentStep === activeData.length - 1}
                    onClick={() => setCurrentStep(s => s + 1)}
                    className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={20}/>
                  </button>
                </div>
              </div>

              {/* 业务描述 (新增分离) */}
              <div className="bg-emerald-50/50 text-emerald-900 text-sm p-4 rounded-xl mb-3 leading-relaxed border border-emerald-100/50">
                <div className="flex items-center gap-1.5 font-semibold mb-1 text-emerald-700">
                  <Target size={16} />
                  本期业务事件：
                </div>
                {currentEvent.business}
              </div>

              {/* 精算视角 */}
              <div className="bg-indigo-50/50 text-indigo-900 text-sm p-4 rounded-xl mb-6 leading-relaxed border border-indigo-100/50">
                <div className="flex items-center gap-1.5 font-semibold mb-1 text-indigo-700">
                  <Activity size={16} />
                  精算与财务处理：
                </div>
                {currentEvent.actuarial}
              </div>

              {/* 会计分录表 */}
              <div className="flex-1">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-left">
                      <th className="pb-3 font-medium">科目 (Account)</th>
                      <th className="pb-3 font-medium text-center">借方 (Dr)</th>
                      <th className="pb-3 font-medium text-center">贷方 (Cr)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEvent.entries.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center py-8 text-slate-400 italic">本期无财务动作</td>
                      </tr>
                    ) : currentEvent.entries.map(entry => (
                      <tr key={entry.id} className="border-b border-slate-50 last:border-0 group hover:bg-slate-50 transition-colors">
                        <td className="py-3">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${entry.group === 'asset' ? 'bg-emerald-400' : entry.group === 'liability' ? 'bg-purple-400' : 'bg-amber-400'}`}></span>
                          <span className={`${entry.type === '贷' ? 'ml-6' : ''} text-slate-700 font-medium`}>
                            {entry.acc}
                          </span>
                        </td>
                        <td className="py-3 text-center text-emerald-600 font-medium">
                          {entry.type === '借' ? entry.amount : ''}
                        </td>
                        <td className="py-3 text-center text-red-500 font-medium">
                          {entry.type === '贷' ? entry.amount : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 右侧：财务报表 (B/S & P&L) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 资产负债表 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Landmark className="text-purple-500" size={18}/>
                资产负债表 (B/S)
              </h2>
              
              <div className="space-y-4">
                {/* Assets */}
                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-800 font-medium">总资产 (Assets)</span>
                    <span className="text-emerald-700 font-bold">{balances.cash}</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-600/70">
                    <span>↳ 现金及等价物</span>
                    <span>{balances.cash}</span>
                  </div>
                </div>

                {/* Liabilities - IFRS 17 积木 */}
                <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100/50">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-800 font-medium">保险合同负债 (Liabilities)</span>
                    <span className="text-purple-700 font-bold">{totalLiability}</span>
                  </div>
                  
                  {/* IFRS 17 积木拆解可视化 */}
                  <div className="space-y-1.5 mt-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-purple-600/80 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-300"></div> BEL (履约现金流)</span>
                      <span className="font-medium text-purple-700">{balances.bel}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-purple-600/80 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div> RA (风险调整)</span>
                      <span className="font-medium text-purple-700">{balances.ra}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-purple-600/80 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> CSM (合同服务边际)</span>
                      <span className="font-medium text-purple-700">{balances.csm}</span>
                    </div>
                  </div>
                </div>

                {/* Equity */}
                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-800 font-medium">所有者权益 (Equity)</span>
                    <span className="text-blue-700 font-bold">{netProfit}</span>
                  </div>
                  <div className="flex justify-between text-xs text-blue-600/70">
                    <span>↳ 累计留存收益</span>
                    <span>{netProfit}</span>
                  </div>
                </div>

                {/* 试算平衡检查 */}
                <div className={`text-xs text-center py-1 rounded ${balances.cash === totalLiability + netProfit ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                  {balances.cash === totalLiability + netProfit ? "✓ 资产 = 负债 + 权益 (试算平衡)" : "✗ 试算不平衡"}
                </div>
              </div>
            </div>

            {/* 利润表 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                <PieChart className="text-amber-500" size={18}/>
                累计利润表 (Cumulative P&L)
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">保险服务收入 (Revenue)</span>
                  <span className="font-medium text-slate-800">{balances.revenue}</span>
                </div>
                <div className="flex justify-between text-sm p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">保险服务费用 (Expenses)</span>
                  <span className="font-medium text-slate-800">-{balances.expense}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-bold">
                  <span className="text-slate-800">保险服务利润 (Net Profit)</span>
                  <span className={netProfit >= 0 ? "text-emerald-600" : "text-red-500"}>
                    {netProfit}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
