'use client';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';

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
  const [currentStatus, setCurrentStatus] = useState<'NORMAL' | 'HIGH' | null>(
    null
  );
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'disconnected'
  >('disconnected');
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [recentReadings, setRecentReadings] = useState<Reading[]>([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);

    socket.on('connect', () => {
      setConnectionStatus('connected');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });

    socket.on('temperature_reading', (data: Reading) => {
      setCurrentTemperature(data.temperature);
      setCurrentStatus(data.status || 'NORMAL');
      setLastUpdate(new Date(data.timestamp).toLocaleTimeString());
      setRecentReadings((prev) => [data, ...prev.slice(0, 4)]);
    });

    socket.on('processed_reading', (data: Reading) => {
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
    <motion.div
      className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-700 text-white flex flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-center"
        animate={{ y: [20, 0], opacity: [0, 1] }}
        transition={{ duration: 0.7 }}
      >
        Temperature Dashboard
      </motion.h1>

      <motion.div
        className="mb-6 text-center"
        animate={{ y: [20, 0], opacity: [0, 1] }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-6xl font-semibold">
          {currentTemperature !== null ? `${currentTemperature}°C` : 'N/A'}
        </div>
        <div className="text-lg mt-2">
          <span
            className={`px-2 py-1 rounded text-sm ${
              currentStatus === 'NORMAL' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {currentStatus || 'N/A'}
          </span>
        </div>
        <div className="text-sm text-gray-300 mt-2">
          Last updated: {lastUpdate || 'N/A'}
        </div>
      </motion.div>

      <motion.div
        className="mb-6 flex items-center gap-4"
        animate={{ opacity: [0, 1], x: [-50, 0] }}
        transition={{ duration: 0.7 }}
      >
        <span
          className={`h-4 w-4 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span>
          {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
        </span>
      </motion.div>

      <motion.div
        className="w-full max-w-2xl"
        animate={{ y: [20, 0], opacity: [0, 1] }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Recent Readings</h2>
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left py-2 px-4">Temperature</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentReadings.map((reading) => (
                <motion.tr
                  key={reading.id}
                  className="border-t border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <td className="py-2 px-4">{reading.temperature}°C</td>
                  <td className="py-2 px-4">
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
                  <td className="py-2 px-4 text-gray-400">
                    {new Date(reading.timestamp).toLocaleTimeString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
