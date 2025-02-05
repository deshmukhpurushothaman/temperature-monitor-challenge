'use client';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface Reading {
  id: string;
  temperature: number;
  timestamp: string;
  status?: 'NORMAL' | 'HIGH';
  processedAt?: string;
}

const Dashboard: React.FC = () => {
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(
    null
  );
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'disconnected'
  >('disconnected');
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [recentReadings, setRecentReadings] = useState<Reading[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:8000');

    socket.on('connect', () => {
      setConnectionStatus('connected');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });

    socket.on('temperature_reading', (data: Reading) => {
      console.log('temperature_reading ', data);
      setCurrentTemperature(data.temperature);
      setLastUpdate(new Date(data.timestamp).toLocaleTimeString());
      setRecentReadings((prev) => [data, ...prev.slice(0, 4)]);
    });

    socket.on('processed_reading', (data: Reading) => {
      console.log('processed_reading ', data);
      setRecentReadings((prev) =>
        prev.map((reading) =>
          reading.id === data.id ? { ...reading, ...data } : reading
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Temperature Dashboard</h1>

      <div className="mb-6 text-center">
        <div className="text-6xl font-bold">
          {currentTemperature !== null ? `${currentTemperature}°C` : 'N/A'}
        </div>
        <div className="text-sm text-gray-400">
          Last updated: {lastUpdate || 'N/A'}
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <span
          className={`h-4 w-4 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
        <span>
          {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Recent Readings</h2>
        <div className="bg-gray-800 rounded-lg shadow p-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left py-2">Temperature</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentReadings.map((reading) => (
                <tr key={reading.id} className="border-t border-gray-700">
                  <td className="py-2">{reading.temperature}°C</td>
                  <td className="py-2">
                    {reading.status ? (
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          reading.status === 'NORMAL'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {reading.status}
                      </span>
                    ) : (
                      'Processing'
                    )}
                  </td>
                  <td className="py-2 text-gray-400">
                    {new Date(reading.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
