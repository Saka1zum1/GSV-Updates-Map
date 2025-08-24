import React, { useEffect, useRef } from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import '../styles/calendar-dark-mode.css';
import { specialDates, isDateInRange, getFlagEmoji } from '../utils/constants.js';

const CalendarWidget = ({
    isRangeMode,
    currentView,
    onDateSelect,
    onToggleMode,
    onToggleView
}) => {
    const calendarRef = useRef(null);
    const datepickerRef = useRef(null);

    useEffect(() => {
        if (!calendarRef.current) return;

        // Destroy existing datepicker
        if (datepickerRef.current) {
            datepickerRef.current.destroy();
        }

        // Create new datepicker
        datepickerRef.current = new AirDatepicker(calendarRef.current, {
            view: currentView,
            minView: currentView,
            range: isRangeMode,
            onSelect({ date }) {
                onDateSelect(date);
            },
            onRenderCell({ date, cellType }) {
                if (cellType === 'day') {
                    const startOfDay = new Date(date);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);

                    const matchingDates = [];

                    for (const [timestamp, countryCode] of Object.entries(specialDates)) {
                        const specialDate = new Date(timestamp);
                        if (isDateInRange(specialDate, startOfDay, endOfDay)) {
                            matchingDates.push({ timestamp, countryCode });
                        }
                    }

                    if (matchingDates.length > 0) {
                        const randomIndex = Math.floor(Math.random() * matchingDates.length);
                        const { countryCode } = matchingDates[randomIndex];

                        const cellStyle = 'display:flex;align-items:center;justify-content:center;width:24px;height:18px;';
                        if (countryCode.length !== 2) {
                            return {
                                html: `<div class="custom-cell" style="${cellStyle}"><img style="width:24px;height:18px;object-fit:contain;" src="/assets/${countryCode}.png" alt="${countryCode}"></div>`,
                                classes: 'custom-cell'
                            };
                        } else {
                            const flagEmoji = getFlagEmoji(countryCode);
                            return {
                                html: `<div class="custom-cell" style="${cellStyle}"><span class="font-flags text-lg" style="font-size:18px;line-height:18px;">${flagEmoji}</span></div>`
                            };
                        }
                    }
                }
            },
            autoClose: false,
            locale: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear",
                dateFormat: "MM/DD/YYYY",
                timeFormat: "HH:mm",
                firstDay: 0
            }
        });

        return () => {
            if (datepickerRef.current) {
                datepickerRef.current.destroy();
            }
        };
    }, [isRangeMode, currentView, onDateSelect]);

    const getViewButtonText = () => {
        switch (currentView) {
            case 'days': return 'Day';
            case 'months': return 'Month';
            case 'years': return 'Year';
            default: return 'Day';
        }
    };

    return (
        <div className="fixed top-20 right-4 z-[1000] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Calendar controls */}
            <div className="flex bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={onToggleMode}
                    className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                             transition-colors duration-200 border-r border-gray-200 dark:border-gray-700"
                >
                    {isRangeMode ? 'Range' : 'Single'}
                </button>
                <button
                    onClick={onToggleView}
                    className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                             transition-colors duration-200"
                >
                    {getViewButtonText()}
                </button>
            </div>

            {/* Calendar */}
            <div className="p-2">
                <div ref={calendarRef}></div>
            </div>
        </div>
    );
};

export default CalendarWidget;
