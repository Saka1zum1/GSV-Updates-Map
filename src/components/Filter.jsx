import { useState, useEffect, useMemo } from 'react';
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
    Search,
    Settings
} from 'lucide-react';
import { updateTypes, allowedTypesInSpot } from '../utils/constants.js';
import AccordionSection from './AccordionSection.jsx';
import AccordionContainer from './AccordionContainer.jsx';
import '../styles/collapsible.css';

const FilterPanel = ({
    filters,
    onUpdateFilters,
    isSpot,
    isPeak,
    countriesMap,
    regionsMap,
    authors = [],
    filteredData = [],
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
    const [expandedCountries, setExpandedCountries] = useState({});

    const toggleCountryExpansion = (countryCode) => {
        setExpandedCountries(prev => ({
            ...prev,
            [countryCode]: !prev[countryCode]
        }));
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getVisibleTypes = () => {
        const types = updateTypes.filter(type => !allowedTypesInSpot.includes(type) ||
            ['smallcam', 'badcam', 'gen4trekker'].includes(type));

        // item 数量降序排序
        return types.sort((a, b) => (typeItemCounts.typeCounts[b] || 0) - (typeItemCounts.typeCounts[a] || 0));
    };

    const handleTypeToggle = (type) => {
        const newTypes = filters.type.includes(type)
            ? filters.type.filter(t => t !== type)
            : [...filters.type, type];

        onUpdateFilters({ type: newTypes });
    };

    const handleAuthorToggle = (author) => {
        const currentAuthors = filters.author || [];
        const newAuthors = currentAuthors.includes(author)
            ? currentAuthors.filter(a => a !== author)
            : [...currentAuthors, author];

        onUpdateFilters({ author: newAuthors });
    };

    const getFlagEmoji = (countryCode) => {
        return countryCode ?
            countryCode.toUpperCase()
                .split('')
                .map(char => String.fromCodePoint(0x1F1E6 - 65 + char.charCodeAt(0)))
                .join('') : '❌';
    };

    const getCurrentMonthDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    }

    // 过滤功能 - 使用countriesMap进行搜索，利用regionsMap优化显示
    const filteredCountriesData = useMemo(() => {
        if (!countriesMap) return { filtered: {}, shouldExpand: {} };

        const query = searchQueries.country.toLowerCase();
        if (!query) return { filtered: countriesMap, shouldExpand: {} };

        const filtered = {};
        const shouldExpand = {};

        Object.entries(countriesMap).forEach(([countryCode, data]) => {
            const countryMatches = data.name.toLowerCase().includes(query) ||
                countryCode.toLowerCase().includes(query);

            const matchingRegions = data.regions.filter(region =>
                region.name.toLowerCase().includes(query) ||
                region.code.toLowerCase().includes(query)
            );

            if (countryMatches || matchingRegions.length > 0) {
                filtered[countryCode] = {
                    ...data,
                    regions: countryMatches ? data.regions : matchingRegions
                };

                // 如果只有地区匹配，标记该国家需要展开
                if (!countryMatches && matchingRegions.length > 0) {
                    shouldExpand[countryCode] = true;
                }
            }
        });

        return { filtered, shouldExpand };
    }, [countriesMap, searchQueries.country]);

    // 处理自动展开逻辑
    useEffect(() => {
        if (Object.keys(filteredCountriesData.shouldExpand).length > 0) {
            setExpandedCountries(prev => ({
                ...prev,
                ...filteredCountriesData.shouldExpand
            }));
        }
    }, [filteredCountriesData.shouldExpand]);

    // 利用regionsMap获取地区对应的国家信
    const getCountryForRegion = (regionCode) => {
        return regionsMap ? regionsMap[regionCode] : null;
    };

    // 计算每个国家和地区在筛选后数据中的item数量
    const locationItemCounts = useMemo(() => {
        const countryCounts = {};
        const regionCounts = {};

        filteredData.forEach(item => {
            if (item.country) {
                countryCounts[item.country] = (countryCounts[item.country] || 0) + 1;
            }
            if (item.region) {
                regionCounts[item.region] = (regionCounts[item.region] || 0) + 1;
            }
        });

        return { countryCounts, regionCounts };
    }, [filteredData]);

    // 创建平铺的国家和地区选项列表
    const getAllLocationOptions = () => {
        if (!countriesMap) return [];

        const filteredCountriesMap = filteredCountriesData.filtered;
        const options = [];

        Object.entries(filteredCountriesMap).forEach(([countryCode, countryData]) => {
            // 添加国家选项
            const selectedRegions = filters.countryandregion[countryCode] || [];
            const isCountrySelected = Object.keys(filters.countryandregion).includes(countryCode);

            options.push({
                type: 'country',
                code: countryCode,
                name: countryData.name,
                countryCode: countryCode,
                isSelected: isCountrySelected,
                itemCount: locationItemCounts.countryCounts[countryCode] || 0
            });

            // 添加该国家的地区选项
            countryData.regions.forEach(region => {
                options.push({
                    type: 'region',
                    code: region.code,
                    name: region.name,
                    countryCode: countryCode,
                    countryName: countryData.name,
                    isSelected: selectedRegions.includes(region.code),
                    itemCount: locationItemCounts.regionCounts[region.code] || 0
                });
            });
        });

        // 统一按item数量降序排序
        return options.sort((a, b) => b.itemCount - a.itemCount);
    };

    const locationOptions = getAllLocationOptions();

    // 计算每个作者在筛选后数据中的item数量
    const authorItemCounts = useMemo(() => {
        const counts = {};
        filteredData.forEach(item => {
            if (item.author) {
                counts[item.author] = (counts[item.author] || 0) + 1;
            }
        });
        return counts;
    }, [filteredData]);

    // 计算每个 update type camera type item 数量
    const typeItemCounts = useMemo(() => {
        const typeCounts = {};
        const cameraCounts = {};

        filteredData.forEach(item => {
            // 处理 types 字段
            if (item.types) {
                const types = JSON.parse(item.types);
                if (Array.isArray(types)) {
                    types.forEach(type => {
                        typeCounts[type] = (typeCounts[type] || 0) + 1;
                    });
                }
            }

            // 处理 camera 字段
            if (item.camera) {
                cameraCounts[item.camera.toLowerCase()] = (cameraCounts[item.camera.toLowerCase()] ?? 0) + 1;
            }
        });

        return { typeCounts, cameraCounts };
    }, [filteredData]);

    const filteredAuthors = authors
        .filter(author => author.toLowerCase().includes(searchQueries.author.toLowerCase()))
        .sort((a, b) => (authorItemCounts[b] || 0) - (authorItemCounts[a] || 0)); // 按item数量降序排列



    // Camera types
    const cameraTypes = [
        'gen1', 'gen2', 'gen3', 'gen4', 'gen4trekker', 'badcam', 'smallcam'
    ].sort((a, b) => (typeItemCounts.cameraCounts[b] || 0) - (typeItemCounts.cameraCounts[a] || 0));

    const handleCameraToggle = (camera) => {
        const currentCameras = filters.camera || [];
        const newCameras = currentCameras.includes(camera)
            ? currentCameras.filter(c => c !== camera)
            : [...currentCameras, camera];
        onUpdateFilters({ camera: newCameras });
    };

    return (
        <>

            {/* Filter Sidebar */}
            <div className={`
                fixed top-12 sm:top-16 left-0 h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] 
                w-80 sm:w-96 max-w-[calc(100vw-1rem)] bg-white dark:bg-gray-900 shadow-2xl z-[1000]
                transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700
                flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Fixed Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Filters</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-hidden">
                    <AccordionContainer className="p-3 sm:p-4">
                        {/* Update Types Filter */}
                        {!isSpot && (
                            <AccordionSection
                                title="Update Types"
                                icon={Filter}
                                badge={filters.type.length || null}
                                isExpanded={expandedSections.types}
                                onToggle={() => toggleSection('types')}
                            >
                                <div className="p-3 sm:p-4">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {getVisibleTypes().map(type => (
                                            <button
                                                key={type}
                                                onClick={() => handleTypeToggle(type)}
                                                className={`p-2 rounded-lg transition-colors border relative ${filters.type.includes(type)
                                                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700'
                                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                    }`}
                                                title={`${type} (${typeItemCounts.typeCounts[type] || 0} items)`}
                                            >
                                                <img
                                                    src={`/assets/${type}.webp`}
                                                    alt={type}
                                                    className="w-6 h-6 sm:w-8 sm:h-8 mx-auto"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                                <span className="absolute -top-1 -right-1 bg-yellow-400 dark:bg-orange-400 text-grey dark:text-white text-xxs rounded-full w-5 h-5 flex items-center justify-center">
                                                    {typeItemCounts.typeCounts[type] || 0}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </AccordionSection>
                        )}

                        {/* Camera Types Filter */}
                        {isSpot && (
                            <AccordionSection
                                title="Camera Types"
                                icon={Camera}
                                badge={filters.camera?.length || null}
                                isExpanded={expandedSections.camera}
                                onToggle={() => toggleSection('camera')}
                            >
                                <div className="p-3 sm:p-4">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {cameraTypes.map(camera => (
                                            <button
                                                key={camera}
                                                onClick={() => handleCameraToggle(camera)}
                                                className={`p-2 rounded-lg transition-colors border relative ${filters.camera?.includes(camera)
                                                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700'
                                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                    }`}
                                                title={`${camera} (${typeItemCounts.cameraCounts[camera] || 0} items)`}
                                            >
                                                <img
                                                    src={`/assets/${camera}.webp`}
                                                    alt={camera}
                                                    className="w-6 h-6 sm:w-8 sm:h-8 mx-auto"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                                <span className="absolute -top-1 -right-1 bg-yellow-400 dark:bg-orange-400 text-grey dark:text-white text-xxs rounded-full w-5 h-5 flex items-center justify-center">
                                                    {typeItemCounts.cameraCounts[camera] || 0}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </AccordionSection>
                        )}

                        {/* Coverage Date Filter */}
                        {!isSpot && (
                            <AccordionSection
                                title="Coverage Date"
                                icon={Calendar}
                                badge={filters.dateRange ? '1' : null}
                                isExpanded={expandedSections.date}
                                onToggle={() => toggleSection('date')}
                            >
                                <div className="p-4">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Year/Month</label>
                                            <input
                                                type="month"
                                                value={filters.dateRange ? `${filters.dateRange.fromYear}-${filters.dateRange.fromMonth.toString().padStart(2, '0')}` : '2007-01'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
                                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => {
                                                    if (!e.target.value) {
                                                        onUpdateFilters({ dateRange: null });
                                                        return;
                                                    }
                                                    const [year, month] = e.target.value.split('-');
                                                    const fromYear = parseInt(year);
                                                    const fromMonth = parseInt(month);
                                                    const toYear = filters.dateRange?.toYear || fromYear;
                                                    const toMonth = filters.dateRange?.toMonth || fromMonth;

                                                    onUpdateFilters({
                                                        dateRange: {
                                                            fromYear,
                                                            fromMonth,
                                                            toYear,
                                                            toMonth
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Year/Month</label>
                                            <input
                                                type="month"
                                                value={filters.dateRange ? `${filters.dateRange.toYear}-${filters.dateRange.toMonth.toString().padStart(2, '0')}` : getCurrentMonthDate()}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
                                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => {
                                                    if (!e.target.value) {
                                                        onUpdateFilters({ dateRange: null });
                                                        return;
                                                    }
                                                    const [year, month] = e.target.value.split('-');
                                                    const toYear = parseInt(year);
                                                    const toMonth = parseInt(month);
                                                    const fromYear = filters.dateRange?.fromYear || toYear;
                                                    const fromMonth = filters.dateRange?.fromMonth || toMonth;

                                                    onUpdateFilters({
                                                        dateRange: {
                                                            fromYear,
                                                            fromMonth,
                                                            toYear,
                                                            toMonth
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                        {filters.dateRange && (
                                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                                <div className="mb-2 px-3 py-2 bg-blue-50 dark:bg-blue-900 rounded text-xs">
                                                    <span className="text-blue-700 dark:text-blue-200">
                                                        Selected: {filters.dateRange.fromYear}/{filters.dateRange.fromMonth.toString().padStart(2, '0')} - {filters.dateRange.toYear}/{filters.dateRange.toMonth.toString().padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        onUpdateFilters({ dateRange: null });
                                                    }}
                                                    className="w-full px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg 
                                                               transition-colors text-sm font-medium"
                                                >
                                                    Clear Date Range
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </AccordionSection>
                        )}

                        {/* Location Filter */}
                        {countriesMap && Object.keys(countriesMap).length > 0 && (
                            <AccordionSection
                                title="Country & Region"
                                icon={Globe}
                                badge={Object.keys(filters.countryandregion || {}).length + Object.values(filters.countryandregion || {}).reduce((total, regions) => total + regions.length, 0) || null}
                                isExpanded={expandedSections.location}
                                onToggle={() => toggleSection('location')}
                            >
                                <div className="p-4">
                                    <div className="mb-3">
                                        <div className="relative">
                                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                            <input
                                                type="text"
                                                placeholder="Search countries and regions..."
                                                value={searchQueries.country}
                                                onChange={(e) => setSearchQueries(prev => ({ ...prev, country: e.target.value }))}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
                                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                           placeholder-gray-500 dark:placeholder-gray-400
                                                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="max-h-64 overflow-y-auto space-y-1">
                                        {locationOptions.map((option) => (
                                            <button
                                                key={`${option.type}-${option.countryCode}-${option.code}`}
                                                onClick={() => {
                                                    if (option.type === 'country') {
                                                        const newCountryAndRegion = { ...filters.countryandregion };
                                                        if (option.isSelected) {
                                                            // 移除整个国家及其地区
                                                            delete newCountryAndRegion[option.code];
                                                        } else {
                                                            // 添加国家，初始化为空地区数组
                                                            newCountryAndRegion[option.code] = [];
                                                        }
                                                        onUpdateFilters({ countryandregion: newCountryAndRegion });
                                                    } else {
                                                        const newCountryAndRegion = { ...filters.countryandregion };
                                                        const countryCode = option.countryCode;

                                                        // 确保国家存在
                                                        if (!newCountryAndRegion[countryCode]) {
                                                            newCountryAndRegion[countryCode] = [];
                                                        }

                                                        if (option.isSelected) {
                                                            // 移除地区
                                                            newCountryAndRegion[countryCode] = newCountryAndRegion[countryCode].filter(r => r !== option.code);
                                                            // 如果地区数组为空，保留国家（只选择国家，不选择地区）
                                                        } else {
                                                            // 添加地区
                                                            if (!newCountryAndRegion[countryCode].includes(option.code)) {
                                                                newCountryAndRegion[countryCode].push(option.code);
                                                            }
                                                        }
                                                        onUpdateFilters({ countryandregion: newCountryAndRegion });
                                                    }
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-600
                                                        flex items-center justify-between transition-colors text-sm
                                                ${option.isSelected ?
                                                        (option.type === 'country' ?
                                                            'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700' :
                                                            'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-700'
                                                        ) :
                                                        'text-gray-700 dark:text-gray-200'}`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-flags text-base">{getFlagEmoji(option.countryCode)}</span>
                                                    <div className="flex flex-col flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className={`truncate ${option.type === 'country' ? 'font-medium' : 'font-normal'}`}>
                                                                {option.name}
                                                            </span>
                                                            <span
                                                                className="ml-2 inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 px-2 py-1"
                                                                title={`${option.itemCount} items`}
                                                            >
                                                                {option.itemCount}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {option.isSelected && (
                                                    <Check size={14} className={`${option.type === 'country' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
                                                )}
                                            </button>
                                        ))}

                                        {locationOptions.length === 0 && searchQueries.country && (
                                            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                                                No countries or regions found matching "{searchQueries.country}"
                                            </div>
                                        )}
                                    </div>

                                    {Object.keys(filters.countryandregion || {}).length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                            <div className="mb-2 px-3 py-2 bg-blue-50 dark:bg-blue-900 rounded text-xs">
                                                <span className="text-blue-700 dark:text-blue-200">
                                                    Selected:
                                                    {Object.entries(filters.countryandregion).map(([countryCode, regions]) => {
                                                        const countryName = countriesMap[countryCode]?.name || countryCode;
                                                        if (regions.length === 0) {
                                                            return countryName;
                                                        } else {
                                                            return `${countryName} (${regions.join(', ')})`;
                                                        }
                                                    }).join('; ')}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    onUpdateFilters({ countryandregion: {} });
                                                }}
                                                className="w-full px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg 
                                                           transition-colors text-sm font-medium"
                                            >
                                                Clear Selection
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </AccordionSection>
                        )}

                        {/* Author Filter */}
                        <AccordionSection
                            title="Author"
                            icon={User}
                            badge={filters.author?.length || null}
                            isExpanded={expandedSections.author}
                            onToggle={() => toggleSection('author')}
                        >
                            <div className="p-4">
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
                                            <span className="truncate flex items-center gap-2">
                                                {author}
                                                <span
                                                    className="ml-1 inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 w-6 h-6"
                                                    title={`${authorItemCounts[author] || 0} items`}
                                                >
                                                    {authorItemCounts[author] || 0}
                                                </span>
                                            </span>
                                            {filters.author?.includes(author) && <Check size={14} className="text-blue-600 dark:text-blue-400" />}
                                        </button>
                                    ))}
                                </div>

                                {filters.author?.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={() => {
                                                onUpdateFilters({ author: [] });
                                            }}
                                            className="w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg 
                                                       transition-colors text-sm font-medium"
                                        >
                                            Clear Author
                                        </button>
                                    </div>
                                )}
                            </div>
                        </AccordionSection>
                    </AccordionContainer>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-[999] top-12 sm:top-16"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default FilterPanel;
