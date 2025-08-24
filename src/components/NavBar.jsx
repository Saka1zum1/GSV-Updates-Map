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
    Camera
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
    onToggleFilterSidebar
}) => {
    const [showExportMenu, setShowExportMenu] = useState(false);

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
        <div className="fixed top-0 left-0 right-0 z-[1100] bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Center Section - Title */}
                <div className="flex items-center">
                    <img className="px-1 py-1 h-10 w-10 mr-2" src="/assets/favicon.png"></img>

                    <h1 className="text-lg mr-2 font-semibold text-gray-800 dark:text-gray-100">VirtualStreets Updates Map</h1>

                    {/* Theme Toggle */}
                    <button
                        onClick={onToggleTheme}
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                 rounded-lg transition-colors text-sm font-medium"
                        title="Toggle Theme"
                    >
                        {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Left Section - View Controls */}
                <div className="flex items-center space-x-2">
                    <NavButton
                        icon={Filter}
                        label="Filter"
                        isActive={false}
                        onClick={onToggleFilterSidebar}
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
                <div className="flex items-center space-x-2">
                    {/* Export Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                     rounded-lg transition-colors text-sm font-medium border border-transparent"
                        >
                            <Download size={20} />
                            <span className="hidden md:inline">Export</span>
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
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                 rounded-lg transition-colors text-sm font-medium"
                        title="Color Scheme"
                    >
                        <Palette size={20} />
                        <div
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: colorOptions[colorPreference] }}
                        />
                    </button>
                    {/* GSV Opacity Slider */}
                    <div className="flex items-center space-x-2 px-2">
                        <Eye size={20} className="text-gray-700 dark:text-gray-200" />
                        <input
                            id="gsv-opacity"
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={gsvOpacity}
                            onChange={e => onOpacityChange(Number(e.target.value))}
                            className="w-24 h-2 accent-blue-500"
                        />
                        <span className="text-xs w-8 text-center text-gray-700 dark:text-gray-200">{Math.round(gsvOpacity * 100)}%</span>
                    </div>
                </div>
            </div>

            {/* Backdrop for export menu */}
            {showExportMenu && (
                <div
                    className="fixed inset-0 z-[1150]"
                    onClick={() => setShowExportMenu(false)}
                />
            )}
        </div>
    );
};

export default TopNavBar;
