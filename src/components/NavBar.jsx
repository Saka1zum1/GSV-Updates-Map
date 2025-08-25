import { useState } from 'react';
import {
    Layers,
    Flame,
    Filter,
    Mountain,
    Download,
    Copy,
    Palette,
    Sun,
    Moon,
    ChevronDown,
    FileText,
    Database,
    Eye,
    Camera,
    Menu,
    X,
    Calendar
} from 'lucide-react';
const TopNavBar = ({
    isHeatmap,
    isCluster,
    isPeak,
    isSpot,
    onToggleHeatmap,
    onToggleCluster,
    onTogglePeak,
    onToggleSpot,
    onCopyJSON,
    onDownloadJSON,
    onDownloadCSV,
    onToggleTheme,
    onToggleColor,
    colorPreference,
    isDarkTheme,
    gsvOpacity,
    onOpacityChange,
    onToggleFilterSidebar,
    calendarVisible,
    onToggleCalendar
}) => {
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const NavButton = ({ icon: Icon, label, isActive, onClick, className = "" }) => (
        <button
            onClick={onClick}
            className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                ${isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent'
                }
                ${className}
            `}
            title={label}
        >
            <Icon size={20} />
            <span className="hidden md:inline">{label}</span>
        </button>
    );

    const colorOptions = [
        '#1098ad', '#f03e3e', '#d6336c', '#ae3ec9', '#7048e8',
        '#4263eb', '#1c7ed6', '#0ca678', '#37b24d', '#74b816',
        '#f59f00', '#f76707', '#bd5f1b'
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-[1100] bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 max-w-full">
                {/* Left Section - Logo & Title */}
                <div className="flex items-center min-w-0 flex-shrink-0">
                    <img className="h-8 w-8 sm:h-10 sm:w-10 mr-2 flex-shrink-0" src="/assets/favicon.png" alt="Logo" />
                    <h1 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                        <span className="sm:inline">VirtualStreets Updates Map</span>
                    </h1>
                </div>

                {/* Mobile Menu Button */}
                <div className="sm:hidden flex items-center space-x-2">
                    {/* Calendar Toggle - Mobile only */}
                    <button
                        onClick={onToggleCalendar}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${calendarVisible
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        title="Toggle Calendar"
                    >
                        <Calendar size={18} />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={onToggleTheme}
                        className="flex items-center justify-center w-8 h-8 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                 rounded-lg transition-colors"
                        title="Toggle Theme"
                    >
                        {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="flex items-center justify-center w-8 h-8 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                 rounded-lg transition-colors"
                    >
                        {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center flex-1 justify-between min-w-0">
                    {/* Theme Toggle - Desktop */}
                    <div className="flex-shrink-0 ml-2 md:ml-4">
                        <button
                            onClick={onToggleTheme}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                     rounded-lg transition-colors text-sm font-medium"
                            title="Toggle Theme"
                        >
                            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Center Section - View Controls */}
                    <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
                        <NavButton
                            icon={Filter}
                            label="Filter"
                            isActive={false}
                            onClick={onToggleFilterSidebar}
                        />
                        <NavButton
                            icon={Calendar}
                            label="Calendar"
                            isActive={calendarVisible}
                            onClick={onToggleCalendar}
                        />
                        <NavButton
                            icon={Camera}
                            label="Spottings"
                            isActive={isSpot}
                            onClick={onToggleSpot}
                        />
                        <NavButton
                            icon={Mountain}
                            label="Peaks"
                            isActive={isPeak}
                            onClick={onTogglePeak}
                        />
                        <NavButton
                            icon={Flame}
                            label={"Heatmap"}
                            isActive={isHeatmap}
                            onClick={onToggleHeatmap}
                        />
                        <NavButton
                            icon={Layers}
                            label="Cluster"
                            isActive={isCluster}
                            onClick={onToggleCluster}
                        />
                    </div>

                    {/* Right Section - Export & Settings */}
                    <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
                        {/* Export Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowExportMenu(!showExportMenu)}
                                className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                         rounded-lg transition-colors text-sm font-medium border border-transparent"
                            >
                                <Download size={20} />
                                <span className="hidden lg:inline">Export</span>
                                <ChevronDown size={16} />
                            </button>

                            {showExportMenu && (
                                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
                                              min-w-48 z-[1200]">
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                onCopyJSON();
                                                setShowExportMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center space-x-3 text-gray-700 dark:text-gray-200"
                                        >
                                            <Copy size={18} />
                                            <span>Copy JSON to Clipboard</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                onDownloadJSON();
                                                setShowExportMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center space-x-3 text-gray-700 dark:text-gray-200"
                                        >
                                            <Database size={18} />
                                            <span>Download JSON File</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                onDownloadCSV();
                                                setShowExportMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center space-x-3 text-gray-700 dark:text-gray-200"
                                        >
                                            <FileText size={18} />
                                            <span>Download CSV File</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Color Scheme */}
                        <button
                            onClick={onToggleColor}
                            className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                     rounded-lg transition-colors text-sm font-medium"
                            title="Color Scheme"
                        >
                            <Palette size={20} />
                            <div
                                className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0"
                                style={{ backgroundColor: colorOptions[colorPreference] }}
                            />
                        </button>

                        {/* GSV Opacity Slider - Now visible on medium+ screens */}
                        <div className="hidden md:flex items-center space-x-2 px-2">
                            <Eye size={20} className="text-gray-700 dark:text-gray-200 flex-shrink-0" />
                            <input
                                id="gsv-opacity"
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={gsvOpacity}
                                onChange={e => onOpacityChange(Number(e.target.value))}
                                className="w-16 lg:w-20 h-2 accent-blue-500"
                            />
                            <span className="text-xs w-8 text-center text-gray-700 dark:text-gray-200 flex-shrink-0">{Math.round(gsvOpacity * 100)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 relative z-[1100]">
                    <div className="px-3 py-4 space-y-3">
                        {/* View Controls */}
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    onToggleFilterSidebar();
                                    setShowMobileMenu(false);
                                }}
                                className="flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-colors text-sm font-medium
                                           text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                            >
                                <Filter size={18} />
                                <span>Filter</span>
                            </button>

                            <button
                                onClick={() => {
                                    onToggleSpot();
                                    setShowMobileMenu(false);
                                }}
                                className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-colors text-sm font-medium border ${isSpot
                                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                <Camera size={18} />
                                <span>Spottings</span>
                            </button>

                            <button
                                onClick={() => {
                                    onTogglePeak();
                                    setShowMobileMenu(false);
                                }}
                                className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-colors text-sm font-medium border ${isPeak
                                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                <Mountain size={18} />
                                <span>Peaks</span>
                            </button>

                            <button
                                onClick={() => {
                                    onToggleHeatmap();
                                    setShowMobileMenu(false);
                                }}
                                className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-colors text-sm font-medium border ${isHeatmap
                                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                <Flame size={18} />
                                <span>Heatmap</span>
                            </button>

                            <button
                                onClick={() => {
                                    onToggleCluster();
                                    setShowMobileMenu(false);
                                }}
                                className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-colors text-sm font-medium border ${isCluster
                                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                <Layers size={18} />
                                <span>Cluster</span>
                            </button>

                            <button
                                onClick={() => {
                                    onToggleColor();
                                    setShowMobileMenu(false);
                                }}
                                className="flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-colors text-sm font-medium
                                           text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                            >
                                <div
                                    className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                                    style={{ backgroundColor: colorOptions[colorPreference] }}
                                />
                                <span>Color Scheme</span>
                            </button>
                        </div>

                        {/* Export Options */}
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        onCopyJSON();
                                        setShowMobileMenu(false);
                                    }}
                                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                                >
                                    <Copy size={18} />
                                    <span>Copy JSON to Clipboard</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDownloadJSON();
                                        setShowMobileMenu(false);
                                    }}
                                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                                >
                                    <Database size={18} />
                                    <span>Download JSON File</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDownloadCSV();
                                        setShowMobileMenu(false);
                                    }}
                                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                                >
                                    <FileText size={18} />
                                    <span>Download CSV File</span>
                                </button>
                            </div>
                        </div>

                        {/* Opacity Controls */}
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-3">
                            {/* GSV Opacity Slider - Mobile */}
                            <div className="flex items-center space-x-3 px-3 py-2">
                                <Eye size={18} className="text-gray-700 dark:text-gray-200" />
                                <span className="text-sm text-gray-700 dark:text-gray-200">Opacity</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={gsvOpacity}
                                    onChange={e => onOpacityChange(Number(e.target.value))}
                                    className="flex-1 h-2 accent-blue-500"
                                />
                                <span className="text-xs w-10 text-center text-gray-700 dark:text-gray-200">{Math.round(gsvOpacity * 100)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop for export menu */}
            {showExportMenu && (
                <div
                    className="fixed inset-0 z-[1150]"
                    onClick={() => setShowExportMenu(false)}
                />
            )}

            {/* Backdrop for mobile menu */}
            {showMobileMenu && (
                <div
                    className="fixed inset-0 z-[1050] bg-black bg-opacity-25 sm:hidden"
                    onClick={() => setShowMobileMenu(false)}
                />
            )}
        </div>
    );
};

export default TopNavBar;
