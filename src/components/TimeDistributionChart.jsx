import React, { useState, useCallback, useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import Draggable from 'react-draggable';
import { ChevronDown, X } from 'lucide-react';
import { RiDraggable } from 'react-icons/ri';

const timeRanges = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' }
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const TimeDistributionChart = ({ data, onClose }) => {
    const [selectedRange, setSelectedRange] = useState('day');
    const [isRangeMenuOpen, setIsRangeMenuOpen] = useState(false);

    const processData = useCallback((data, range) => {
        if (!data || data.length === 0) return [];

        const timeData = new Map();

        // Initialize bins based on range
        switch (range) {
            case 'day':
                for (let i = 0; i < 24; i++) {
                    timeData.set(i, 0);
                }
                break;
            case 'week':
                for (let i = 0; i < 7; i++) {
                    timeData.set(i, 0);
                }
                break;
            case 'month':
                for (let i = 1; i <= 31; i++) {
                    timeData.set(i, 0);
                }
                break;
            case 'year':
                for (let i = 0; i < 12; i++) {
                    timeData.set(i, 0);
                }
                break;
        }

        // Process data
        data.forEach(item => {
            const date = new Date(parseInt(item.report_time) * 1000);
            let key;

            switch (range) {
                case 'day':
                    key = date.getHours();
                    break;
                case 'week':
                    key = date.getDay(); // 0-6, where 0 is Sunday
                    break;
                case 'month':
                    key = date.getDate(); // 1-31
                    break;
                case 'year':
                    key = date.getMonth(); // 0-11
                    break;
            }

            timeData.set(key, (timeData.get(key) || 0) + 1);
        });

        // Sort and format the data
        let entries = Array.from(timeData.entries());

        // Sort entries based on the key
        entries.sort((a, b) => {
            const keyA = parseInt(a[0]);
            const keyB = parseInt(b[0]);
            return keyA - keyB;
        });

        return entries.map(([time, count]) => ({
            time: String(time),
            count,
            // For tooltip display
            label: selectedRange === 'week' ? weekDays[parseInt(time)] :
                selectedRange === 'year' ? months[parseInt(time)] :
                    selectedRange === 'day' ? `${time}:00` : `Day ${time}`
        }));
    }, [selectedRange]);

    const chartData = useMemo(() => processData(data, selectedRange), [data, selectedRange, processData]);

    const getXAxisTickFormatter = useCallback((value) => {

        switch (selectedRange) {
            case 'day':
                return `${value}:00`;
            case 'week':
                return weekDays[parseInt(value)];
            case 'month':
                return value; // Day of month (1-31)
            case 'year':
                return months[parseInt(value)];
            default:
                return value;
        }
    }, [selectedRange]);

    return (
        <Draggable handle=".drag-handle">
            <div className="fixed transform -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-5rem)] sm:w-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    {/* Left section with range selector */}
                    <div className="flex-1 min-w-0">
                        <div className="relative inline-block" style={{ zIndex: 1000 }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent drag from interfering
                                    setIsRangeMenuOpen(!isRangeMenuOpen);
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors touch-manipulation"
                            >
                                {timeRanges.find(r => r.id === selectedRange)?.label}
                                <ChevronDown size={16} className={`transition-transform ${isRangeMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isRangeMenuOpen && (
                                <>
                                    {/* Backdrop for mobile */}
                                    <div
                                        className="fixed inset-0 bg-transparent"
                                        style={{ zIndex: 998 }}
                                        onClick={() => setIsRangeMenuOpen(false)}
                                    />
                                    {/* Dropdown menu */}
                                    <div
                                        className="absolute top-full left-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                                        style={{ zIndex: 999 }}
                                    >
                                        {timeRanges.map((range) => (
                                            <button
                                                key={range.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedRange(range.id);
                                                    setIsRangeMenuOpen(false);
                                                }}
                                                className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation
                                                    ${selectedRange === range.id ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-200'}`}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right section with drag handle and close button */}
                    <div className="flex items-center gap-2">
                        <div
                            className="drag-handle p-2 cursor-move hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Drag to move"
                        >
                            <RiDraggable size={20} className="text-gray-500 hover:text-green-500 dark:text-gray-200 dark:hover:text-blue-500" />
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent drag from interfering
                                onClose();
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation"
                        >
                            <X size={20} className="text-gray-500 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-500" />
                        </button>
                    </div>
                </div>

                {/* Chart */}
                <div className="p-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="rgba(107, 114, 128, 0.2)"
                            />
                            <XAxis
                                dataKey="time"
                                tickFormatter={getXAxisTickFormatter}
                                tick={{ fill: 'currentColor', fontSize: 12 }}
                                tickLine={{ stroke: 'currentColor' }}
                                axisLine={{ stroke: 'currentColor' }}
                                className="text-gray-600 dark:text-gray-300"
                            />
                            <YAxis
                                tick={{ fill: 'currentColor', fontSize: 12 }}
                                tickLine={{ stroke: 'currentColor' }}
                                axisLine={{ stroke: 'currentColor' }}
                                className="text-gray-600 dark:text-gray-300"
                            />
                            <Tooltip
                                formatter={(value, name) => [`${value} items`, 'Count']}
                                labelFormatter={(value, array) => array[0].payload.label}
                                contentStyle={{
                                    backgroundColor: 'var(--tw-bg-opacity, 1)',
                                    borderColor: 'var(--tw-border-opacity, 1)',
                                    color: '#3B82F6',
                                    borderRadius: '0.375rem',
                                    padding: '8px 12px',
                                }}
                                itemStyle={{
                                    color: '#3B82F6',
                                    fontSize: '0.875rem',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#3B82F6"
                                fill="url(#colorCount)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Draggable>
    );
};

export default TimeDistributionChart;