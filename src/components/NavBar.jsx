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
    Calendar,
    Search,
    Info,
    Award,
    Loader2
} from 'lucide-react';
import SearchModal from './SearchModal.jsx';
import CreditModal from './CreditModal.jsx';
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
    onToggleCalendar,
    onLocationSearch,
    onOpenYearInReview,
    yearInReviewLoading
}) => {
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);

    const NavButton = ({ icon: Icon, label, isActive, onClick, className = "" }) => (
        <button
            onClick={onClick}
            className={`nav-btn ${isActive ? 'nav-btn--active' : ''} ${className}`}
            title={label}
        >
            <Icon size={20} />
            <span className="hidden lg:inline">{label}</span>
        </button>
    );

    const colorOptions = [
        '#1098ad', '#f03e3e', '#d6336c', '#ae3ec9', '#7048e8',
        '#4263eb', '#1c7ed6', '#0ca678', '#37b24d', '#74b816',
        '#f59f00', '#f76707', '#bd5f1b'
    ];

    return (
        <div className="nav-bar">
            <div className="nav-bar-inner">
                {/* Left Section - Logo & Title */}
                <div className="flex items-center min-w-0 flex-shrink-0">
                    <img className="h-8 w-8 sm:h-10 sm:w-10 mr-2 flex-shrink-0" src="/assets/favicon.png" alt="Logo" />
                    <h1 className="nav-title">
                        <span className="sm:inline">VirtualStreets Updates Map</span>
                    </h1>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center space-x-2 sm:hidden lg:hidden xl:hidden">
                    {/* Calendar Toggle - Mobile only */}
                    <button
                        onClick={onToggleCalendar}
                        className={`nav-icon-btn ${calendarVisible ? 'nav-icon-btn--active' : ''}`}
                        title="Toggle Calendar"
                    >
                        <Calendar size={18} />
                    </button>

                    {/* Annual Report Button - Mobile */}
                    {/* <button
                        onClick={onOpenYearInReview}
                        disabled={yearInReviewLoading}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                            bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                            text-white shadow-md hover:shadow-lg border border-transparent
                            ${yearInReviewLoading ? 'opacity-50 cursor-wait' : ''}`}
                        title="2025 Wrapped"
                    >
                        {yearInReviewLoading ? <Loader2 size={18} className="animate-spin" /> : <Award size={18} />}
                    </button>*/}

                    <button
                        onClick={() => {
                            onToggleFilterSidebar();
                        }}
                        className="nav-icon-btn"
                        title="Open Filter"
                    >
                        <Filter size={18} />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={onToggleTheme}
                        className="nav-icon-btn"
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

                {/* Compact Mobile Menu Button for landscape mode */}
                <div className="hidden sm:flex lg:hidden xl:hidden items-center space-x-2">
                    {/* Calendar Toggle */}
                    <button
                        onClick={onToggleCalendar}
                        className={`nav-icon-btn ${calendarVisible ? 'nav-icon-btn--active' : ''}`}
                        title="Toggle Calendar"
                    >
                        <Calendar size={18} />
                    </button>

                    <button
                        onClick={() => {
                            onToggleFilterSidebar();
                        }}
                        className="nav-icon-btn"
                        title="Open Filter"
                    >
                        <Filter size={18} />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={onToggleTheme}
                        className="nav-icon-btn"
                        title="Toggle Theme"
                    >
                        {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Annual Report Button - Tablet */}
                    <button
                        onClick={onOpenYearInReview}
                        disabled={yearInReviewLoading}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                            bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                            text-white shadow-md hover:shadow-lg border border-transparent
                            ${yearInReviewLoading ? 'opacity-50 cursor-wait' : ''}`}
                        title="Year in Review"
                    >
                        {yearInReviewLoading ? <Loader2 size={18} className="animate-spin" /> : <Award size={18} />}
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
                <div className="hidden xl:flex items-center flex-1 justify-between min-w-0">
                    {/* Theme Toggle - Desktop */}
                    <div className="flex items-center ml-2 md:ml-4 space-x-2">
                        <button
                            onClick={onToggleTheme}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                     rounded-lg transition-colors text-sm font-medium"
                            title="Toggle Theme"
                        >
                            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        {/* Credits Button */}
                        <button
                            onClick={() => setShowCreditModal(true)}
                            className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                     rounded-lg transition-colors text-sm font-medium border border-transparent"
                            title="Credits"
                        >
                            <Info size={20} />
                        </button>
                        {/* Annual Report Button */}
                        <div className="flex items-center ml-2 md:ml-4 space-x-2">
                            <button
                                onClick={onOpenYearInReview}
                                disabled={yearInReviewLoading}
                                className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                     rounded-lg transition-colors text-sm font-medium border border-transparent
                                    ${yearInReviewLoading ? 'opacity-50 cursor-wait' : ''}`}
                                title={`View Your 2025 Wrapped`}
                            >
                                {yearInReviewLoading ? <Loader2 size={20} className="animate-spin" /> : <Award size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Center Section - View Controls */}
                    <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
                        <NavButton
                            icon={Search}
                            label="Search"
                            isActive={false}
                            onClick={() => setShowSearchModal(true)}
                        />
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowExportMenu(!showExportMenu);
                                }}
                                className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                                         rounded-lg transition-colors text-sm font-medium border border-transparent"
                            >
                                <Download size={20} />
                                <ChevronDown size={16} className="hidden xl:inline" />
                            </button>
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

                        {/* GSV Opacity Slider - Now visible on large+ screens */}
                        <div className="hidden lg:flex items-center space-x-2 px-2">
                            <Eye size={20} className="text-gray-700 dark:text-gray-200 flex-shrink-0" />
                            <input
                                id="gsv-opacity"
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={gsvOpacity}
                                onChange={e => onOpacityChange(Number(e.target.value))}
                                className="w-16 xl:w-20 range-slider"
                            />
                            <span className="text-xs w-8 text-center text-gray-700 dark:text-gray-200 flex-shrink-0">{Math.round(gsvOpacity * 100)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="nav-mobile-menu">
                    <div className="px-3 py-4 space-y-3">
                        {/* View Controls */}
                        <div className="mobile-menu-grid">
                            <button
                                onClick={() => {
                                    setShowSearchModal(true);
                                    setShowMobileMenu(false);
                                }}
                                className="mobile-menu-btn"
                            >
                                <Search size={18} />
                                <span>Search</span>
                            </button>

                            <button
                                onClick={() => {
                                    onToggleFilterSidebar();
                                    setShowMobileMenu(false);
                                }}
                                className="mobile-menu-btn"
                            >
                                <Filter size={18} />
                                <span>Filter</span>
                            </button>

                            <button
                                onClick={() => {
                                    onToggleSpot();
                                    setShowMobileMenu(false);
                                }}
                                className={`mobile-menu-btn ${isSpot
                                    ? 'mobile-menu-btn--active'
                                    : ''
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
                                className={`mobile-menu-btn ${isPeak
                                    ? 'mobile-menu-btn--active'
                                    : ''
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
                                className={`mobile-menu-btn ${isHeatmap
                                    ? 'mobile-menu-btn--active'
                                    : ''
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
                                className={`mobile-menu-btn ${isCluster
                                    ? 'mobile-menu-btn--active'
                                    : ''
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
                                className="mobile-menu-btn"
                            >
                                <div
                                    className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                                    style={{ backgroundColor: colorOptions[colorPreference] }}
                                />
                                <span>Color Scheme</span>
                            </button>

                            <button
                                onClick={() => {
                                    setShowCreditModal(true);
                                    setShowMobileMenu(false);
                                }}
                                className="mobile-menu-btn"
                            >
                                <Info size={18} />
                                <span>Credits</span>
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
                                    className="flex-1 range-slider"
                                />
                                <span className="text-xs w-10 text-center text-gray-700 dark:text-gray-200">{Math.round(gsvOpacity * 100)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Dropdown Menu - Rendered as sibling to backdrop for proper z-index layering */}
            {showExportMenu && (
                <div className="fixed top-[calc(3rem+1rem)] right-4 z-[1200] hidden xl:block">
                    <div
                        className="nav-dropdown mr-[5.5rem]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    onCopyJSON();
                                    setShowExportMenu(false);
                                }}
                                className="nav-dropdown-item"
                            >
                                <Copy size={18} />
                                <span>Copy JSON to Clipboard</span>
                            </button>
                            <button
                                onClick={() => {
                                    onDownloadJSON();
                                    setShowExportMenu(false);
                                }}
                                className="nav-dropdown-item"
                            >
                                <Database size={18} />
                                <span>Download JSON File</span>
                            </button>
                            <button
                                onClick={() => {
                                    onDownloadCSV();
                                    setShowExportMenu(false);
                                }}
                                className="nav-dropdown-item"
                            >
                                <FileText size={18} />
                                <span>Download CSV File</span>
                            </button>
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
                    className="fixed inset-0 z-[1050] bg-black bg-opacity-25 xl:hidden"
                    onClick={() => setShowMobileMenu(false)}
                />
            )}

            {/* Search Modal */}
            {showSearchModal && (
                <SearchModal
                    isOpen={showSearchModal}
                    onClose={() => setShowSearchModal(false)}
                    onLocationSelect={onLocationSearch}
                />
            )}

            {/* Credit Modal */}
            {showCreditModal && (
                <CreditModal
                    isOpen={showCreditModal}
                    onClose={() => setShowCreditModal(false)}
                />
            )}
        </div>
    );
};

export default TopNavBar;
