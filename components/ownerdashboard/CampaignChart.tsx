'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface SupplyChainChartProps {
  className?: string;
}

interface BarDataItem {
  date: string;
  shipments: number;
}

interface PieDataItem {
  name: string;
  value: number;
  color: string;
}

export function SupplyChainChart({ className }: SupplyChainChartProps) {
  const [chartData, setChartData] = useState<{
    barData: BarDataItem[];
    pieData: PieDataItem[];
  }>({
    barData: [],
    pieData: [],
  });

  useEffect(() => {
    // ✅ Hardcoded mock supply chain data
    const mockBarData: BarDataItem[] = [
      { date: 'Oct 1', shipments: 120 },
      { date: 'Oct 5', shipments: 150 },
      { date: 'Oct 10', shipments: 180 },
      { date: 'Oct 15', shipments: 90 },
      { date: 'Oct 20', shipments: 210 },
      { date: 'Oct 22', shipments: 175 },
    ];

    const mockPieData: PieDataItem[] = [
      { name: 'Delivered', value: 620, color: '#22c55e' },
      { name: 'In Transit', value: 280, color: '#3b82f6' },
      { name: 'Pending', value: 140, color: '#facc15' },
      { name: 'Delayed', value: 60, color: '#ef4444' },
    ];

    setChartData({
      barData: mockBarData,
      pieData: mockPieData,
    });
  }, []);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${className}`}>
      {/* 📦 Shipments Over Time */}
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Shipments Over Time</CardTitle>
            <CardDescription>Shipment trends (Last 30 days)</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.barData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis className="text-xs" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '6px',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar
                dataKey="shipments"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                name="Shipments"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🚚 Order Status Distribution */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Order Status Distribution</CardTitle>
          <CardDescription>Distribution of shipment statuses</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {chartData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '6px',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
