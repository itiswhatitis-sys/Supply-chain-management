'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Factory,
} from 'lucide-react';

interface StatsCardsProps {
  className?: string;
}

interface KPI {
  value: number;
  trend: number | null;
  label: string;
}

interface KPIData {
  totalShipments: KPI;
  inTransitOrders: KPI;
  deliveredOrders: KPI;
  pendingOrders: KPI;
  totalWarehouses: KPI;
  supplierCount: KPI;
}

export function StatsCards({ className }: StatsCardsProps) {
  const [kpis, setKpis] = useState<KPIData | null>(null);

  useEffect(() => {
    // ✅ Hardcoded mock Supply Chain data
    const mockData: KPIData = {
      totalShipments: { value: 1240, trend: 8.4, label: 'Total Shipments' },
      inTransitOrders: { value: 342, trend: 2.5, label: 'In-Transit Orders' },
      deliveredOrders: { value: 815, trend: 5.8, label: 'Delivered Orders' },
      pendingOrders: { value: 83, trend: -3.2, label: 'Pending Orders' },
      totalWarehouses: { value: 12, trend: 0.0, label: 'Total Warehouses' },
      supplierCount: { value: 48, trend: 4.1, label: 'Suppliers' },
    };

    setKpis(mockData);
  }, []);

  const renderTrendIndicator = (trend: number | null) => {
    if (trend === null || trend === 0) return null;

    const isPositive = trend > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-green-600' : 'text-red-600';

    return (
      <div className={`flex items-center gap-1 ${colorClass}`}>
        <TrendIcon className="h-3 w-3" />
        <span className="text-xs font-medium">{Math.abs(trend).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {/* Total Shipments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{kpis?.totalShipments.value}</div>
            {renderTrendIndicator(kpis?.totalShipments.trend ?? null)}
          </div>
          <p className="text-xs text-muted-foreground">
            {kpis?.totalShipments.value
              ? `${kpis.totalShipments.value} shipments processed`
              : 'No shipments yet'}
          </p>
        </CardContent>
      </Card>

      {/* In-Transit Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">In-Transit Orders</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{kpis?.inTransitOrders.value}</div>
            {renderTrendIndicator(kpis?.inTransitOrders.trend ?? null)}
          </div>
          <p className="text-xs text-muted-foreground">
            {kpis?.inTransitOrders.value
              ? `${kpis.inTransitOrders.value} orders currently moving`
              : 'No orders in transit'}
          </p>
        </CardContent>
      </Card>

      {/* Delivered Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{kpis?.deliveredOrders.value}</div>
            {renderTrendIndicator(kpis?.deliveredOrders.trend ?? null)}
          </div>
          <p className="text-xs text-muted-foreground">
            {kpis?.deliveredOrders.value
              ? `${kpis.deliveredOrders.value} orders successfully delivered`
              : 'No deliveries yet'}
          </p>
        </CardContent>
      </Card>

      {/* Pending Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{kpis?.pendingOrders.value}</div>
            {renderTrendIndicator(kpis?.pendingOrders.trend ?? null)}
          </div>
          <p className="text-xs text-muted-foreground">
            {kpis?.pendingOrders.value
              ? `${kpis.pendingOrders.value} orders awaiting dispatch`
              : 'No pending orders'}
          </p>
        </CardContent>
      </Card>

      {/* Total Warehouses */}
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
          <Factory className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{kpis?.totalWarehouses.value}</div>
            {renderTrendIndicator(kpis?.totalWarehouses.trend ?? null)}
          </div>
          <p className="text-xs text-muted-foreground">
            {kpis?.totalWarehouses.value
              ? `${kpis.totalWarehouses.value} active warehouses`
              : 'No warehouses added'}
          </p>
        </CardContent>
      </Card> */}

      {/* Suppliers */}
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground rotate-180" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{kpis?.supplierCount.value}</div>
            {renderTrendIndicator(kpis?.supplierCount.trend ?? null)}
          </div>
          <p className="text-xs text-muted-foreground">
            {kpis?.supplierCount.value
              ? `${kpis.supplierCount.value} registered suppliers`
              : 'No suppliers yet'}
          </p>
        </CardContent>
      </Card> */}
    </div>
  );
}
