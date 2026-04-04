import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Sector, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

function formatCurrency(v) {
  if (v >= 100000) return '₹' + (v / 100000).toFixed(1) + 'L';
  if (v >= 1000) return '₹' + (v / 1000).toFixed(0) + 'K';
  return '₹' + v;
}

export function SpendingBreakdownChart() {
  const { categoryBreakdown = [] } = useApp();
  const top5 = categoryBreakdown.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 700;
  const isTablet = windowWidth >= 700 && windowWidth < 1024;
  const isTabletLand = windowWidth >= 1024 && windowWidth < 1400;

  // Standardized sizes
  const pieOuterRadius = isMobile ? 95 : isTablet ? 110 : isTabletLand ? 85 : 95;
  const pieInnerRadius = pieOuterRadius * 0.6; 
  const pieHeight = isMobile ? 240 : isTablet ? 270 : isTabletLand ? 230 : 245;
  const categoryWidth = isMobile ? '100%' : isTablet ? '100%' : isTabletLand ? 190 : 240;

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, midAngle, percent, name, value, index } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 6) * cos;
    const sy = cy + (outerRadius + 6) * sin;
    const ex = cx + (outerRadius + 18) * cos;
    const ey = cy + (outerRadius + 18) * sin;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text 
          x={ex + (cos >= 0 ? 1 : -1) * 12} 
          y={ey} 
          textAnchor={textAnchor} 
          dominantBaseline="central" 
          fontSize={isMobile ? 12 : 12} 
          fontWeight={600} 
          fill="var(--text)"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        {(
          <text 
            x={ex + (cos >= 0 ? 1 : -1) * 12} 
            y={ey + 15} 
            textAnchor={textAnchor} 
            dominantBaseline="central" 
            fontSize={10} 
            fill="var(--text2)"
          >
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden', }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 10% -20%, rgba(0,229,160,0.08), transparent 40%), radial-gradient(circle at 90% 120%, rgba(255,77,106,0.08), transparent 40%)', pointerEvents: 'none',  }} />
      <div className="chart-title">Spending Breakdown</div>
      <div className="chart-sub">Top categories by expense</div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10,}}>
        <div style={{ flex: 1, minHeight: pieHeight, width: isMobile ? '100%' : 'auto' }}>
          <ResponsiveContainer width="100%" height={pieHeight}>
            <PieChart>
              <Pie
                data={top5}
                cx={isMobile ? '50%' : isTablet ? '48%' : isTabletLand ? '43%' : '50%'}
                cy={isMobile ? '48%' : isTablet ? '48%' : isTabletLand ? '52%' : '50%'}
                innerRadius={pieInnerRadius}
                outerRadius={pieOuterRadius}
                paddingAngle={3}
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, i) => !isMobile && setActiveIndex(i)}
                onMouseLeave={() => !isMobile && setActiveIndex(null)}
                onClick={(_, i) => {
                  if (isMobile) { setActiveIndex(activeIndex === i ? null : i); }
                }}
                stroke="none">
                {top5.map((entry, i) => (
                  <Cell 
                    key={entry.name} 
                    fill={entry.color} 
                    cursor="pointer" 
                    style={{ 
                      transition: 'all 0.3s ease', 
                      opacity: activeIndex === null ? 1 : activeIndex === i ? 1 : 0.35, 
                      filter: activeIndex === i ? 'brightness(1.1)' : 'brightness(1)' 
                    }} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, maxWidth: categoryWidth, display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          {top5.map((item, i) => {
            const isActive = activeIndex === i; 
            return (
              <div 
                key={item.name} 
                onMouseEnter={() => !isMobile && setActiveIndex(i)} 
                onMouseLeave={() => !isMobile && setActiveIndex(null)}
                onClick={() => isMobile && setActiveIndex(isActive ? null : i)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '10px 14px', 
                  borderRadius: 10, 
                  cursor: 'pointer', 
                  background: isActive ? `${item.color}33` : 'transparent', 
                  border: `1px solid ${isActive ? item.color + '44' : 'var(--border)'}`, 
                  transition: 'all 0.2s ease' 
                }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, marginRight: 10 }} />
                <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: isActive ? 'var(--text)' : 'var(--text2)' }}>{item.name}</div>
                <div style={{ fontSize: 13, fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--text)', opacity: isActive ? 1 : 0.7 }}>₹{item.value.toLocaleString('en-IN')}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function BalanceTrendChart() {
  const { monthlyData = [] } = useApp();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 750;

  const BalanceTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px', boxShadow: 'var(--shadow)', fontSize: 12, minWidth: 140,}}>
        <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 6 }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ color: p.color, fontWeight: 500 }}>{p.name}</span>
            <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--text)' }}>{formatCurrency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    
    <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', overflow: 'hidden', paddingBottom: 20,}}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 10% -20%, rgba(0,229,160,0.08), transparent 40%), radial-gradient(circle at 90% 120%, rgba(255,77,106,0.08), transparent 40%)', pointerEvents: 'none' }} />
      <div className="chart-title">Balance Trend</div>
      <div className="chart-sub">Monthly income vs Expenses</div>

      <ResponsiveContainer width="100%" height={260} margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
        <AreaChart data={monthlyData} margin={{ top: 20, right: 0, left: -12, bottom: windowWidth < 750 ? 2 : 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E5A0" stopOpacity={0.5}/>
              <stop offset="100%" stopColor="#00E5A0" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4D6A" stopOpacity={1}/>
              <stop offset="100%" stopColor="#FF4D6A" stopOpacity={0.1}/>
            </linearGradient>
          </defs>

          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
  dataKey="name"
  interval={0}
  tick={({ x, y, payload }) => {
    const [month, year] = payload.value.split(' ');

    if (windowWidth < 700) {
      return (
        <text
          x={x}
          y={y}  
          transform={`rotate(-45, ${x}, ${y})`}
          textAnchor="end"
          dominantBaseline="middle" 
          fontSize={10}
          fill="var(--text2)"
        >
          {month} {year.slice(-2)}
        </text>
      );
    } else if (windowWidth < 1024) {
      return (
        <text
          x={x}
          y={y}
          transform={`rotate(-30, ${x}, ${y})`}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={11}
          fill="var(--text2)"
        >
          {month} {year.slice(-2)}
        </text>
      );
    } else {
      return (
        <text
          x={x}
          y={y}
          transform={`rotate(-20, ${x}, ${y})`}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={11}
          fill="var(--text2)"
        >
          <tspan x={x} dy="0">{month}</tspan>
          <tspan x={x} dy="1em">{year}</tspan>
        </text>
      );
    }
  }}/>

<YAxis
  tickFormatter={formatCurrency}
  axisLine={false}
  tickLine={false}
  tick={({ x, y, payload }) => {
    if (payload.value === 0) return null;

    return (
      <text
        x={x - 8}               
        y={y + 4}             
        fontSize={11}
        fill="var(--text2)"
        fontFamily="var(--mono)"
        textAnchor="end">
        {formatCurrency(payload.value)}
      </text>
    );
  }}
/>
          <Tooltip content={<BalanceTooltip />} trigger="click" isAnimationActive={false} wrapperStyle={{ pointerEvents: 'none', zIndex: 9999 }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />

          <Area type="monotone" dataKey="income" stroke="var(--accent)" strokeWidth={2.2} fill="url(#incomeGrad)" dot={false} activeDot={{ r: 6, stroke: 'var(--accent)', strokeWidth: 2, fill: 'var(--bg2)' }} name="Income" />
          <Area type="monotone" dataKey="expenses" stroke="var(--red)" strokeWidth={2.2} fill="url(#expenseGrad)" dot={false} activeDot={{ r: 6, stroke: 'var(--red)', strokeWidth: 2, fill: 'var(--bg2)' }} name="Expenses" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
export function MonthlyBarChart() {
  const { monthlyData = [] } = useApp();
  const [activeIndex, setActiveIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 700;
  const barsToShow = isMobile ? 8 : 12;
  
  const monthsToShow = React.useMemo(() => {
    const monthsOrder = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const sorted = [...monthlyData].sort((a, b) => {
      const [monthA, yearA] = a.name.split(' ');
      const [monthB, yearB] = b.name.split(' ');
      return new Date(yearA, monthsOrder.indexOf(monthA)) - new Date(yearB, monthsOrder.indexOf(monthB));
    });
    return sorted.slice(-barsToShow);
  }, [monthlyData, barsToShow]);

  const BalanceTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '12px 16px',
        fontSize: 12,
        boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',}}>
        {payload.map(p => (
          <div key={p.name} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
            <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--text)' }}>
              ₹{p.value.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ position: 'relative', overflow: 'hidden', }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 15% -30%, rgba(0,229,160,0.06), transparent 40%), radial-gradient(circle at 85% 130%, rgba(255,77,106,0.06), transparent 40%)',
        pointerEvents: 'none',
      }} />

      <div className="chart-title" style={{ fontSize: isMobile ? 14 : 18 }}>Monthly Net Balance</div>
      <div className="chart-sub" style={{ fontSize: isMobile ? 10 : 13 }}>Income minus expenses per month</div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={monthsToShow}
          syncId="monthlyCharts"
          barCategoryGap={isMobile ? '10%' : '15%'}
          margin={{ top: 10, right: 10, left: -10, bottom: 15 }}>
          <defs>
            <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E5A0" stopOpacity={1} />
              <stop offset="100%" stopColor="#00E5A0" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4D6A" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF4D6A" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={({ x, y, payload }) => {
          const [month, year] = payload.value.split(' ');
          if (windowWidth < 700) {
          return (
            <text
              x={x}
              y={y + 10}
              transform={`rotate(-45, ${x}, ${y + 10})`}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={10}
              fill="var(--text2)">
            {month} {year.slice(-2)}
          </text>);   
    } 
    else if (windowWidth < 1024) {
      return (
        <text
          x={x}
          y={y + 10}
          transform={`rotate(-30, ${x}, ${y + 10})`}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={11}
          fill="var(--text2)">
          {month} {year.slice(-2)}
        </text>
      );
    } 
    else {
      return (
        <text
          x={x}
          y={y + 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fill="var(--text2)"
        >
          {month} {year}
        </text>
      );
    }}}/>
    
          <YAxis tickFormatter={(v) => `₹${v.toLocaleString('en-IN')}`} axisLine={false} tickLine={false} tick={{ fontSize: isMobile ? 10 : 12, fill: 'var(--text2)', fontFamily: 'var(--mono)' }} />
          <Tooltip content={<BalanceTooltip />} cursor={{ fill: 'transparent' }} />

          <Bar dataKey="balance" radius={[12, 12, 6, 6]} onMouseLeave={() => setActiveIndex(null)}>
            {monthsToShow.map((entry, i) => {
              const isProfit = entry.balance >= 0;
              const barColor = isProfit ? 'url(#profitGrad)' : 'url(#lossGrad)';
              const isActive = i === activeIndex;

              return (
                <Cell
                  key={i}
                  fill={barColor}
                  cursor="pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{
                    transition: 'all 0.4s ease',
                    opacity: activeIndex === null ? 1 : isActive ? 1 : 0.3,
                    transformOrigin: 'center bottom',
                    filter: isActive ? 'drop-shadow(0px 15px 20px rgba(0,0,0,0.12))' : 'none'
                  }}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}