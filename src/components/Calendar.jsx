import React, { useEffect, useRef, useState } from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import '../styles/calendar-dark-mode.css';
import { specialDates, isDateInRange, getFlagEmoji } from '../utils/constants.js';

const CalendarWidget = ({
    isRangeMode,
    currentView,
    selectedDates = [],
    onDateSelect,
    onToggleMode,
    onToggleView
}) => {
    const calendarRef = useRef(null);
    const datepickerRef = useRef(null);
    const [internalSelectedDates, setInternalSelectedDates] = useState(selectedDates);

    // Sync external selectedDates with internal state
    useEffect(() => {
        if (JSON.stringify(selectedDates) !== JSON.stringify(internalSelectedDates)) {
            setInternalSelectedDates(selectedDates);
        }
    }, [selectedDates]);

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
            selectedDates: selectedDates,
            multipleDates: false, // Prevent multiple date selection when not in range mode
            onSelect({ date, formattedDate, datepicker }) {
                // Prevent infinite loops by checking if dates actually changed
                const currentSelectedDates = datepicker.selectedDates || [];
                
                if (JSON.stringify(currentSelectedDates) !== JSON.stringify(internalSelectedDates)) {
                    // Update internal state
                    setInternalSelectedDates(currentSelectedDates);
                    
                    // In range mode, only update when we have a complete range or starting new selection
                    if (isRangeMode) {
                        if (currentSelectedDates.length === 1 || currentSelectedDates.length === 2) {
                            onDateSelect(currentSelectedDates);
                        }
                    } else {
                        // Single date mode - always update
                        if (currentSelectedDates.length > 0) {
                            onDateSelect(currentSelectedDates);
                        }
                    }
                }
            },
            onRenderCell({ date, cellType }) {
                if (cellType === 'day') {
                    const startOfDay = new Date(date);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);

                    // Check if this is today
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const isToday = startOfDay.getTime() === today.getTime();

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
                        const todayStyle = isToday ? 'background-color:#fef3c7;border-radius:4px;' : '';
                        
                        if (countryCode.length !== 2) {
                            return {
                                html: `<div class="custom-cell" style="${cellStyle}${todayStyle}"><img style="width:24px;height:18px;object-fit:contain;" src="/assets/${countryCode}.png" alt="${countryCode}"></div>`,
                                classes: isToday ? 'custom-cell today-cell' : 'custom-cell'
                            };
                        } else {
                            const flagEmoji = getFlagEmoji(countryCode);
                            return {
                                html: `<div class="custom-cell" style="${cellStyle}${todayStyle}"><span class="font-flags text-lg" style="font-size:18px;line-height:18px;">${flagEmoji}</span></div>`,
                                classes: isToday ? 'custom-cell today-cell' : 'custom-cell'
                            };
                        }
                    } else if (isToday) {
                        // Today cell without special date
                        return {
                            classes: 'today-cell',
                            attrs: {
                                style: 'background-color:#fef3c7;border-radius:4px;'
                            }
                        };
                    }
                }
            },
            autoClose: isRangeMode ? false : true, // Auto close for single date mode
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
    }, [isRangeMode, currentView, onDateSelect, specialDates]);

    const getViewButtonText = () => {
        switch (currentView) {
            case 'days': return 'Day';
            case 'months': return 'Month';
            case 'years': return 'Year';
            default: return 'Day';
        }
    };

    return (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-[1000] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-80 sm:w-auto max-w-[calc(100vw-1rem)] overflow-hidden">
            {/* Calendar controls */}
            <div className="flex bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={onToggleMode}
                    className="flex-1 px-2 sm:px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                             transition-colors duration-200 border-r border-gray-200 dark:border-gray-700"
                >
                    {isRangeMode ? 'Range' : 'Single'}
                </button>
                <button
                    onClick={onToggleView}
                    className="flex-1 px-2 sm:px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                             transition-colors duration-200"
                >
                    {getViewButtonText()}
                </button>
            </div>

            {/* Calendar */}
            <div className="calendar-container">
                <div ref={calendarRef}></div>
            </div>
        </div>
    );
};

export default CalendarWidget;
