import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  Date: string;
  Close: number;
}

const Chart: React.FC = () => {
  const [data, setData] = useState<ChartData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Using 'SPY' as a default symbol for portfolio performance proxy
        const response = await fetch('/api/trading/historic-data/SPY');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.data) {
          const formattedData = result.data.map((item: any) => ({
            Date: new Date(item.Date).toLocaleDateString(),
            Close: item.Close,
          }));
          setData(formattedData);
        } else {
          setError("No data received from server.");
        }
      } catch (e: any) {
        setError(`Failed to fetch chart data: ${e.message}`);
        console.error("Error fetching chart data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="Date" stroke="#A0A0A0" interval={"preserveStart"} />
        <YAxis stroke="#A0A0A0" domain={[(dataMin: number) => Math.round(dataMin - 50), (dataMax: number) => Math.round(dataMax + 50)]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Close" name="SPY Close" stroke="#2E8B57" dot={false} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
