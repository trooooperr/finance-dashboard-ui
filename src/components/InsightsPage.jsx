import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORY_COLORS } from '../data/mockData';
import { TrendingUp, TrendingDown, Zap, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

export default function InsightsPage() {
  const { transactions, summary, monthlyData, categoryBreakdown } = useApp();
  const [expandedMonths, setExpandedMonths] = useState({});

  const toggleMonth = (month) => setExpandedMonths(prev => ({ ...prev, [month]: !prev[month] }));
  const insights = useMemo(() => {
    const topCategory = categoryBreakdown[0] || null;
    const months = monthlyData.length || 1;
    const avgIncome = summary.income / months;
    const avgExpense = summary.expenses / months;
    const savingRate = summary.income > 0 ? ((summary.income - summary.expenses) / summary.income * 100) : 0;

    const last = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];
    const trend = last && prev ? ((last.expenses - prev.expenses) / prev.expenses * 100).toFixed(1) : 0;

    const freq = {};
    transactions.filter(t => t.type === 'expense').forEach(t => { freq[t.category] = (freq[t.category] || 0) + 1 });
    const freqCategory = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];

    return { topCategory, avgIncome, avgExpense, savingRate, trend, freqCategory };
  }, [transactions, summary, monthlyData, categoryBreakdown]);

  const CustomTooltip = ({ active, payload, label }) => {
if (!active || !payload || payload.length === 0) return null;
    return (
      <div style={{
        background: 'var(--bg2)',
        padding: 6,
        borderRadius: 6,
        boxShadow: 'var(--shadow)',
        fontSize: 12
      }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: 'var(--mono)' }}>₹{payload[0].value.toLocaleString('en-IN')}</div>
      </div>
    );
  };

  return (
    <div className="fade-in" style={{ padding: '16px 16px 10px 10px' }}>
      <div className="page-title">Insights</div>
      <div className="page-sub">Smart observations from your financial data</div>

      <div className="insight-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16}}>
        <div className="insight-card" style={{ flex: '1 1 200px' }}>
          <div className="insight-label"><Zap size={12} style={{ marginRight: 4 }} />Top Spending Category</div>
          <div className="insight-value" style={{ color: insights.topCategory ? CATEGORY_COLORS[insights.topCategory.name] : 'var(--text)' }}>
            {insights.topCategory?.name || '—'}
          </div>
          <div className="insight-sub" style={{ color: 'var(--red)' }}>
            ₹{insights.topCategory?.value?.toLocaleString('en-IN') || 0} spent
          </div>
          <div className="progress-bar" style={{ background: 'var(--border)', borderRadius: 6, height: 6, marginTop: 6 }}>
            <div style={{
              width: insights.topCategory && summary.expenses
                ? Math.min((insights.topCategory.value / summary.expenses * 100), 100) + '%'
                : '0%',
              background: insights.topCategory ? CATEGORY_COLORS[insights.topCategory.name] : 'var(--accent)',
              height: '100%',
              borderRadius: 6
            }} />
          </div>
        </div>

        <div className="insight-card" style={{ flex: '1 1 200px' }}>
          <div className="insight-label"><Target size={12} style={{ marginRight: 4 }} />Savings Rate</div>
          <div className="insight-value" style={{ color: insights.savingRate >= 20 ? 'var(--accent)' : insights.savingRate >= 0 ? 'var(--amber)' : 'var(--red)' }}>
            {insights.savingRate.toFixed(1)}%
          </div>
          <div className="insight-sub" style={{ color: insights.savingRate >= 20 ? 'var(--accent)' : insights.savingRate >= 0 ? 'var(--amber)' : 'var(--red)' }}>
            {insights.savingRate >= 20 ? '✓ Healthy savings rate' : insights.savingRate >= 0 ? '⚠ Consider saving more' : '⚠ Spending exceeds income'}
          </div>
          <div className="progress-bar" style={{ background: 'var(--border)', borderRadius: 6, height: 6, marginTop: 6 }}>
            <div style={{
              width: Math.max(0, Math.min(insights.savingRate, 100)) + '%',
              background: insights.savingRate >= 20 ? 'var(--accent)' : insights.savingRate >= 0 ? 'var(--amber)' : 'var(--red)',
              height: '100%',
              borderRadius: 6
            }} />
          </div>
        </div>

        <div className="insight-card" style={{ flex: '1 1 200px' }}>
          <div className="insight-label"><TrendingUp size={12} style={{ marginRight: 4 }} />Avg Monthly Income</div>
          <div className="insight-value" style={{ color: 'var(--accent)' }}>₹{Math.round(insights.avgIncome).toLocaleString('en-IN')}</div>
          <div className="insight-sub" style={{ color: 'var(--accent)' }}>{monthlyData.length} months tracked</div>
        </div>

        <div className="insight-card" style={{ flex: '1 1 200px' }}>
          <div className="insight-label"><TrendingDown size={12} style={{ marginRight: 4 }} />Expense Trend</div>
          <div className="insight-value" style={{ color: Number(insights.trend) > 0 ? 'var(--red)' : 'var(--accent)' }}>
            {Number(insights.trend) > 0 ? '+' : ''}{insights.trend}%
          </div>
          <div className="insight-sub" style={{ color: Number(insights.trend) > 0 ? 'var(--red)' : 'var(--accent)' }}>
            {Number(insights.trend) > 0 ? '↑ Expenses increased last month' : '↓ Expenses decreased last month'}
          </div>
        </div>
      </div>

<div
  className="card"
  style={{
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    background: 'var(--bg2)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  }}
>
  <div className="chart-title" style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
    Category Spending Analysis
  </div>
  <div className="chart-sub" style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>
    Breakdown of all expenses by category
  </div>

  <ResponsiveContainer
    width="100%"
    height={Math.min(Math.max(categoryBreakdown.length * 35, 220), 400)}
  >
    <BarChart
      data={categoryBreakdown}
      layout="vertical"
      margin={{
        top: 12,
        right: 50,
        left: window.innerWidth <= 767 ? 0 : 20,
        bottom: 12
      }}
      barGap={8}
      barSize={16}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
      <XAxis type="number" hide />
      {window.innerWidth > 767 && (
        <YAxis
          type="category"
          dataKey="name"
          tick={{
            fill: 'var(--text2)',
            fontSize: 12,
            fontWeight: 600
          }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
      )}

{window.innerWidth > 10 && (
  <Tooltip
    content={<CustomTooltip />}
    cursor={{ fill: 'transparent' }}
  />
)}

      <Bar
        dataKey="value"
        radius={[0, 12, 12, 0]}
        isAnimationActive
        animationDuration={1000}
        onClick={() => {}}
        activeBar={{
    fillOpacity: 0.8
  }}
      >
        
        {categoryBreakdown.map((entry, i) => (
          <Cell key={i} fill={entry.color || CATEGORY_COLORS[entry.name] || '#888'} />
        ))}

        {window.innerWidth <= 767 && (
<LabelList
  dataKey="name"
  content={(props) => {
    const { x, y, width, height, value, index } = props;
const amount = categoryBreakdown[index]?.value || 0;

    const screenWidth = window.innerWidth;
    const estimatedTextWidth = value.length * 7;

    const rawX = x + width + 6;
    const maxX = screenWidth - estimatedTextWidth - 20;

    const finalX = Math.min(rawX, maxX);
    const willOverflow = rawX > maxX;

    return (
    <g style={{ pointerEvents: 'none' }}>
      
        
        {willOverflow && (
          <rect
            x={finalX - 4}
            y={y + height / 2 - 10}
            width={estimatedTextWidth + 8}
            height={18}
            fill="var(--bg2)"
            rx={4}
            style={{ pointerEvents: 'none' }}  
          />
        )}

        <text
          x={willOverflow ? finalX + estimatedTextWidth : finalX}
          y={y + height / 2 + 4}
          textAnchor={willOverflow ? "end" : "start"}
          fill="var(--text)"
          fontSize={12}
          fontWeight={600}
          style={{ pointerEvents: 'none' }}  
        >
          {value}
        </text>

      </g>
    );
  }}
/>        )}
      </Bar>
    </BarChart>
  </ResponsiveContainer>


  <div
    style={{
      marginTop: 12,
      fontSize: 12,
      color: 'var(--text2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }}
  >
    <span>
      Total Expenses:{' '}
      <strong>
        ₹{categoryBreakdown.reduce((sum, c) => sum + c.value, 0).toLocaleString('en-IN')}
      </strong>
    </span>
    <span>
      Top Category:{' '}
      <strong style={{ color: categoryBreakdown[0]?.color }}>
        {categoryBreakdown[0]?.name || '—'}
      </strong>
    </span>
  </div>
</div>


      <div className="card" style={{ padding: '16px 16px 16px 16px', borderRadius: 16, background: 'var(--bg2)' }}>
        <div className="chart-title">Monthly Comparison</div>
        <div className="chart-sub">Income vs expenses month over month</div>

        <div className="desktop-only" style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: 400, width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Month</th>
                <th style={{ textAlign: 'right', color: 'var(--accent)' }}>Income</th>
                <th style={{ textAlign: 'right', color: 'var(--red)' }}>Expenses</th>
                <th style={{ textAlign: 'right' }}>Net</th>
                <th style={{ textAlign: 'right', color: 'var(--amber)' }}>Saving %</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m, i) => {
                const net = m.income - m.expenses;
                const rate = m.income > 0 ? (net / m.income * 100).toFixed(0) : 0;
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--accent)' }}>₹{m.income.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--red)' }}>₹{m.expenses.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--mono)', color: net >= 0 ? 'var(--accent)' : 'var(--red)', fontWeight: 700 }}>{net >= 0 ? '+' : ''}₹{net.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--mono)', color: Number(rate) >= 20 ? 'var(--accent)' : 'var(--amber)'} }>{rate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mobile-only" style={{ display: 'none' }}>
          {monthlyData.map((m, i) => {
            const net = m.income - m.expenses;
            const rate = m.income > 0 ? (net / m.income * 100).toFixed(0) : 0;
            const isExpanded = expandedMonths[m.name] || false;

            return (
              <div key={i} style={{ background: 'var(--bg3)', borderRadius: 12, marginBottom: 6, border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px ', cursor: 'pointer' }} onClick={() => toggleMonth(m.name)}>
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div>{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>
                {isExpanded && (
                  <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <div><strong style={{ color: 'var(--accent)' }}>Income:</strong> ₹{m.income.toLocaleString('en-IN')}</div>
                    <div><strong style={{ color: 'var(--red)' }}>Expenses:</strong> ₹{m.expenses.toLocaleString('en-IN')}</div>
                    <div><strong style={{ color: net >= 0 ? 'var(--accent)' : 'var(--red)' }}>Net:</strong> {net >= 0 ? '+' : ''}₹{net.toLocaleString('en-IN')}</div>
                    <div><strong style={{ color: Number(rate) >= 20 ? 'var(--accent)' : 'var(--amber)' }}>Saving %:</strong> {rate}%</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media(max-width: 750px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
        @media(min-width: 750px) {
          .desktop-only { display: block !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}