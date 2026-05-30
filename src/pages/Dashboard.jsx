import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const lineData = {
  newVisitis: { expected: [100, 120, 161, 134, 105, 160, 165], actual: [120, 82, 91, 154, 162, 140, 145] },
  messages: { expected: [200, 192, 120, 144, 160, 130, 140], actual: [180, 160, 151, 106, 145, 150, 130] },
  purchases: { expected: [80, 100, 121, 104, 105, 90, 100], actual: [120, 90, 100, 138, 142, 130, 130] },
  shoppings: { expected: [130, 140, 141, 142, 145, 150, 160], actual: [120, 82, 91, 154, 162, 140, 130] },
};

const labels = { newVisitis: '访问量', messages: '消息', purchases: '交易', shoppings: '购物' };
const xLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const statCards = [
  { label: '访问量', value: '12,345', icon: <TrendingUpIcon />, color: '#58A6FF' },
  { label: '消息', value: '2,340', icon: <PeopleIcon />, color: '#3FB950' },
  { label: '订单', value: '856', icon: <ShoppingCartIcon />, color: '#D29922' },
  { label: '交易额', value: '¥56,789', icon: <AttachMoneyIcon />, color: '#F85149' },
];

export default function Dashboard() {
  const [chartType, setChartType] = useState('newVisitis');
  const d = lineData[chartType];

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '16px !important' }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: card.color + '20', color: card.color }}>
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">{card.label}</Typography>
                  <Typography variant="h6" fontWeight={700} color="text.primary">{card.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {Object.keys(lineData).map((k) => (
          <Box key={k} onClick={() => setChartType(k)}
            sx={{ px: 1.5, py: 0.5, fontSize: 12, borderRadius: 1, cursor: 'pointer',
              bgcolor: chartType === k ? 'rgba(88,166,255,0.16)' : 'transparent',
              color: chartType === k ? '#58A6FF' : '#8B949E',
              border: `1px solid ${chartType === k ? '#58A6FF' : '#30363D'}` }}>
            {labels[k]}
          </Box>
        ))}
      </Box>

      <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D', mb: 2 }}>
        <CardContent>
          <LineChart
            height={350}
            series={[
              { data: d.expected, label: '预期', color: '#58A6FF', curve: 'natural', showMark: false },
              { data: d.actual, label: '实际', color: '#3FB950', curve: 'natural', showMark: false },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'point' }]}
            slotProps={{ legend: { labelStyle: { fill: '#8B949E' } } }}
            sx={{ '& .MuiChartsAxis-tickLabel': { fill: '#8B949E' }, '& .MuiChartsAxis-line': { stroke: '#30363D' }, '& .MuiChartsAxis-tick': { stroke: '#30363D' } }}
          />
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>综合评分</Typography>
              <Gauge value={78} valueMin={0} valueMax={100} height={200}
                sx={{ '& .MuiGauge-valueText': { fill: '#E6EDF3', fontSize: 20, fontWeight: 700 }, '& .MuiGauge-valueArc': { fill: '#58A6FF' }, '& .MuiGauge-referenceArc': { fill: '#30363D' } }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>饼图</Typography>
              <PieChart
                height={250}
                series={[{
                  data: [
                    { id: 0, value: 335, label: '订单', color: '#58A6FF' },
                    { id: 1, value: 310, label: '用户', color: '#3FB950' },
                    { id: 2, value: 234, label: '商品', color: '#D29922' },
                    { id: 3, value: 135, label: '其他', color: '#F85149' },
                  ],
                  innerRadius: 40,
                  outerRadius: 100,
                  arcLabel: () => '',
                }]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>柱状图</Typography>
              <BarChart
                height={250}
                series={[{ data: [120, 200, 150, 80, 70], color: '#58A6FF' }]}
                xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], scaleType: 'band' }]}
                borderRadius={4}
                sx={{ '& .MuiChartsAxis-tickLabel': { fill: '#8B949E' }, '& .MuiChartsAxis-line': { stroke: '#30363D' }, '& .MuiChartsAxis-tick': { stroke: '#30363D' } }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
