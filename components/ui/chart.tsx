"use client";

import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ChartProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  height?: number;
}

export function ChartContainer({ title, description, children, height = 350 }: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
             {children as any}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export { 
  RechartsBarChart as BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  RechartsLineChart as LineChart, 
  Line, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
};
