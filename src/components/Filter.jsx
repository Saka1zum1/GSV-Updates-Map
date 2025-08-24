import { useState } from 'react';
import { 
    Filter, 
    Calendar,
    Globe,
    User,
    Camera,
    X,
    Check,
    ChevronDown,
    ChevronRight,
    Search
} from 'lucide-react';
import { updateTypes, allowedTypesInSpot } from '../utils/constants.js';

const FilterPanel = ({
    filters,
    onUpdateFilters,
    isSpot,
    countries,
    authors = [],
    onApplyFilters,
    isOpen,
    setIsOpen
}) => {
    const [expandedSections, setExpandedSections] = useState({
        types: true,
        camera: false,
        date: false,
        location: false,
        author: false
    });
    const [searchQueries, setSearchQueries] = useState({
        country: '',
        author: ''
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getVisibleTypes = () => {
        return isSpot ? 
            updateTypes.filter(type => allowedTypesInSpot.includes(type)) :
            updateTypes.filter(type => !allowedTypesInSpot.includes(type) || 
                                       ['smallcam', 'badcam'].includes(type));
    };

    const handleTypeToggle = (type) => {
        const newTypes = filters.type.includes(type)
            ? filters.type.filter(t => t !== type)
            : [...filters.type, type];
        
        onUpdateFilters({ type: newTypes });
        onApplyFilters();
    };

    const handleAuthorToggle = (author) => {
        const currentAuthors = filters.author || [];
        const newAuthors = currentAuthors.includes(author)
            ? currentAuthors.filter(a => a !== author)
            : [...currentAuthors, author];
        
        onUpdateFilters({ author: newAuthors });
        onApplyFilters();
    };

    const getFlagEmoji = (countryCode) => {
        return countryCode
            .toUpperCase()
            .split('')
            .map(char => String.fromCodePoint(0x1F1E6 - 65 + char.charCodeAt(0)))
            .join('');
    };

    const filteredCountries = Object.entries(countries).filter(([code, name]) =>
        name.toLowerCase().includes(searchQueries.country.toLowerCase()) ||
        code.toLowerCase().includes(searchQueries.country.toLowerCase())
    );

    const filteredAuthors = authors.filter(author =>
        author.toLowerCase().includes(searchQueries.author.toLowerCase())
    );

    // Camera types选项
    const cameraTypes = [
        'gen1', 'gen2', 'gen3', 'gen4', 'gen4trekker', 'badcam', 'smallcam'
    ];

    const handleCameraToggle = (camera) => {
        const currentCameras = filters.camera || [];
        const newCameras = currentCameras.includes(camera)
            ? currentCameras.filter(c => c !== camera)
            : [...currentCameras, camera];
        onUpdateFilters({ camera: newCameras });
        onApplyFilters();
    };

    const SectionHeader = ({ title, icon: Icon, isExpanded, onToggle, badge }) => (
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800
                       transition-colors rounded-lg"
        >
            <div className="flex items-center space-x-3">
                <Icon size={18} className="text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{title}</span>
                {badge && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                        {badge}
                    </span>
                )}
            </div>
            {isExpanded ? <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" /> : <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />}
        </button>
    );

    return (
    <>

            {/* Filter Sidebar */}
            <div className={`
                fixed top-16 left-0 h-[calc(100vh-4rem)] w-90 overflow-y-auto bg-white dark:bg-gray-900 shadow-2xl z-[1000]
                transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Filters</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Filter Content */}
                <div className="flex-1 min-w-80 overflow-y-auto p-4 space-y-2">
                    {/* Update Types Filter */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <SectionHeader
                            title="Update Types"
                            icon={Filter}
                            isExpanded={expandedSections.types}
                            onToggle={() => toggleSection('types')}
                            badge={filters.type.length || null}
                        />
                        
                        {expandedSections.types && (
                            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                <div className="grid grid-cols-4 gap-2">
                                    {getVisibleTypes().map(type => (
                                        <button
                                            key={type}
                                            onClick={() => handleTypeToggle(type)}
                                            className={`p-2 rounded-lg transition-colors border ${
                                                filters.type.includes(type)
                                                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700'
                                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                            }`}
                                            title={type}
                                        >
                                            <img 
                                                src={`/assets/${type}.webp`} 
                                                alt={type}
                                                className="w-8 h-8 mx-auto"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Camera Types Filter */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('camera')}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                        >
                            <div className="flex items-center space-x-3">
                                <Camera size={18} className="text-gray-600 dark:text-gray-400" />
                                <span className="font-medium text-gray-800 dark:text-gray-200">Camera Types</span>
                                {filters.camera && filters.camera.length > 0 && (
                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                                        {filters.camera.length}
                                    </span>
                                )}
                            </div>
                            {expandedSections.camera ? <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" /> : <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />}
                        </button>
                        {expandedSections.camera && (
                            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                <div className="grid grid-cols-4 gap-2">
                                    {cameraTypes.map(camera => (
                                        <button
                                            key={camera}
                                            onClick={() => handleCameraToggle(camera)}
                                            className={`p-2 rounded-lg transition-colors border ${
                                                filters.camera?.includes(camera)
                                                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700'
                                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                            }`}
                                            title={camera}
                                        >
                                            <img 
                                                src={`/assets/${camera}.webp`} 
                                                alt={camera}
                                                className="w-8 h-8 mx-auto"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Date Range Filter */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <SectionHeader
                            title="Date Range"
                            icon={Calendar}
                            isExpanded={expandedSections.date}
                            onToggle={() => toggleSection('date')}
                        />
                        
                        {expandedSections.date && (
                            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
                                                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={(e) => {
                                                const fromDate = new Date(e.target.value);
                                                const toDate = filters.report_date?.[1] ? new Date(filters.report_date[1] * 1000) : fromDate;
                                                onUpdateFilters({
                                                    report_date: [
                                                        Math.floor(fromDate.getTime() / 1000),
                                                        Math.floor(toDate.getTime() / 1000)
                                                    ]
                                                });
                                                onApplyFilters();
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
                                                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={(e) => {
                                                const toDate = new Date(e.target.value);
                                                const fromDate = filters.report_date?.[0] ? new Date(filters.report_date[0] * 1000) : toDate;
                                                onUpdateFilters({
                                                    report_date: [
                                                        Math.floor(fromDate.getTime() / 1000),
                                                        Math.floor(toDate.getTime() / 1000)
                                                    ]
                                                });
                                                onApplyFilters();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Location Filter */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <SectionHeader
                            title="Country & Region"
                            icon={Globe}
                            isExpanded={expandedSections.location}
                            onToggle={() => toggleSection('location')}
                            badge={filters.country ? '1' : null}
                        />
                        
                        {expandedSections.location && (
                            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                <div className="mb-3">
                                    <div className="relative">
                                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Search countries..."
                                            value={searchQueries.country}
                                            onChange={(e) => setSearchQueries(prev => ({ ...prev, country: e.target.value }))}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
                                                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                       placeholder-gray-500 dark:placeholder-gray-400
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                
                                <div className="max-h-48 overflow-y-auto space-y-1">
                                    {filteredCountries.slice(0, 8).map(([code, name]) => (
                                        <button
                                            key={code}
                                            onClick={() => {
                                                onUpdateFilters({ 
                                                    country: filters.country === code ? null : code,
                                                    region: null 
                                                });
                                                onApplyFilters();
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-600
                                                        flex items-center justify-between transition-colors text-sm text-gray-700 dark:text-gray-200
                                                ${filters.country === code ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700' : ''}`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span className="font-flags text-base">{getFlagEmoji(code)}</span>
                                                <span className="truncate">{name}</span>
                                            </div>
                                            {filters.country === code && <Check size={14} className="text-blue-600 dark:text-blue-400" />}
                                        </button>
                                    ))}
                                </div>
                                
                                {filters.country && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <button
                                            onClick={() => {
                                                onUpdateFilters({ country: null, region: null });
                                                onApplyFilters();
                                            }}
                                            className="w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg 
                                                       transition-colors text-sm font-medium"
                                        >
                                            Clear Selection
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Author Filter */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <SectionHeader
                            title="Authors"
                            icon={User}
                            isExpanded={expandedSections.author}
                            onToggle={() => toggleSection('author')}
                            badge={filters.author?.length || null}
                        />
                        
                        {expandedSections.author && (
                            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                <div className="mb-3">
                                    <div className="relative">
                                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Search authors..."
                                            value={searchQueries.author}
                                            onChange={(e) => setSearchQueries(prev => ({ ...prev, author: e.target.value }))}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
                                                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                       placeholder-gray-500 dark:placeholder-gray-400
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                
                                <div className="max-h-48 overflow-y-auto space-y-1">
                                    {filteredAuthors.slice(0, 10).map(author => (
                                        <button
                                            key={author}
                                            onClick={() => handleAuthorToggle(author)}
                                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-600
                                                        flex items-center justify-between transition-colors text-sm text-gray-700 dark:text-gray-200
                                                ${filters.author?.includes(author) ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700' : ''}`}
                                        >
                                            <span className="truncate">{author}</span>
                                            {filters.author?.includes(author) && <Check size={14} className="text-blue-600 dark:text-blue-400" />}
                                        </button>
                                    ))}
                                </div>
                                
                                {filters.author?.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={() => {
                                                onUpdateFilters({ author: [] });
                                                onApplyFilters();
                                            }}
                                            className="w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg 
                                                       transition-colors text-sm font-medium"
                                        >
                                            Clear All Authors
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-30 z-[999] top-16"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default FilterPanel;
