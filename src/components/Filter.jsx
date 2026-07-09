import { useState, useEffect, useMemo } from 'react';
import {
    Filter,
    Calendar,
    Globe,
    User,
    Camera,
    X,
    Check,
    Search,
    PinIcon,
    PinOffIcon,
} from 'lucide-react';
import { updateTypes, allowedTypesInSpot } from '../utils/constants.js';
import AccordionSection from './AccordionSection.jsx';
import AccordionContainer from './AccordionContainer.jsx';

const CountryFlag = ({ countryCode }) => {
    if (!countryCode) {
        return <Globe size={16} className="filter-input-icon flex-shrink-0" />;
    }
    const flagEmoji = countryCode.toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(0x1F1E6 - 65 + char.charCodeAt(0)))
        .join('');
    return <span className="font-flags text-base flex-shrink-0">{flagEmoji}</span>;
};

const FilterPanel = ({
    filters,
    onUpdateFilters,
    isSpot,
    countriesMap,
    authors = [],
    filteredData = [],
    isOpen,
    setIsOpen
}) => {

    const [isPinned, setIsPinned] = useState(false);
    const [expandedCountries, setExpandedCountries] = useState({});

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
        const types = updateTypes.filter(type => !allowedTypesInSpot.includes(type) ||
            ['smallcam', 'badcam', 'gen4trekker'].includes(type));

        // item 数量降序排序
        return types.sort((a, b) => (typeItemCounts.typeCounts[b] || 0) - (typeItemCounts.typeCounts[a] || 0));
    };

    // Helper function to get button state: 'none', 'include', or 'exclude'
    const getTypeButtonState = (type) => {
        if (filters.type.includes(type)) return 'include';
        if (filters.typeExclude.includes(type)) return 'exclude';
        return 'none';
    };

    // Three-state toggle for types: none -> include -> exclude -> none
    const handleTypeToggle = (type, isExcludeClick = false) => {
        if (isExcludeClick) {
            // Direct exclude/include toggle via right area click
            const isCurrentlyExcluded = filters.typeExclude.includes(type);
            const newTypeExclude = isCurrentlyExcluded
                ? filters.typeExclude.filter(t => t !== type)
                : filters.typeExclude.includes(type)
                    ? filters.typeExclude
                    : [...filters.typeExclude, type];
            
            // Remove from include if we're adding to exclude
            const newType = !isCurrentlyExcluded && !filters.type.includes(type)
                ? filters.type
                : filters.type.filter(t => t !== type);
            
            onUpdateFilters({ type: newType, typeExclude: newTypeExclude });
        } else {
            // Normal cycle: none -> include -> exclude -> none
            const currentState = getTypeButtonState(type);
            
            if (currentState === 'none') {
                // Add to include
                onUpdateFilters({
                    type: [...filters.type, type],
                    typeExclude: filters.typeExclude.filter(t => t !== type)
                });
            } else if (currentState === 'include') {
                // Move to exclude
                onUpdateFilters({
                    type: filters.type.filter(t => t !== type),
                    typeExclude: [...filters.typeExclude, type]
                });
            } else {
                // Remove from exclude (back to none)
                onUpdateFilters({
                    typeExclude: filters.typeExclude.filter(t => t !== type)
                });
            }
        }
    };

    const handleAuthorToggle = (author) => {
        const currentAuthors = filters.author || [];
        const newAuthors = currentAuthors.includes(author)
            ? currentAuthors.filter(a => a !== author)
            : [...currentAuthors, author];

        onUpdateFilters({ author: newAuthors });
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

    const handleCameraToggle = (camera, isExcludeClick = false) => {
        if (isExcludeClick) {
            // Direct exclude/include toggle via right area click
            const currentCameras = filters.camera || [];
            const currentExcluded = filters.cameraExclude || [];
            const isCurrentlyExcluded = currentExcluded.includes(camera);
            
            const newCameraExclude = isCurrentlyExcluded
                ? currentExcluded.filter(c => c !== camera)
                : [...currentExcluded, camera];
            
            const newCamera = currentCameras.filter(c => c !== camera);
            
            onUpdateFilters({ camera: newCamera, cameraExclude: newCameraExclude });
        } else {
            // Normal cycle: none -> include -> exclude -> none
            const currentCameras = filters.camera || [];
            const currentExcluded = filters.cameraExclude || [];
            const isIncluded = currentCameras.includes(camera);
            const isExcluded = currentExcluded.includes(camera);
            
            if (!isIncluded && !isExcluded) {
                // Add to include
                onUpdateFilters({ camera: [...currentCameras, camera], cameraExclude: currentExcluded });
            } else if (isIncluded) {
                // Move to exclude
                onUpdateFilters({
                    camera: currentCameras.filter(c => c !== camera),
                    cameraExclude: [...currentExcluded, camera]
                });
            } else {
                // Remove from exclude (back to none)
                onUpdateFilters({ cameraExclude: currentExcluded.filter(c => c !== camera) });
            }
        }
    };

    return (
        <>

            {/* Filter Sidebar */}
            <div className={`filter-sidebar ${(!isOpen && !isPinned) ? 'filter-sidebar--closed' : 'filter-sidebar--open'}`}>
                {/* Header */}
                <div className="filter-sidebar-header">
                    <h2 className="filter-sidebar-title">Filters</h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsPinned(!isPinned)}
                            className="btn-icon"
                            title={isPinned ? "Unpin filter panel" : "Pin filter panel"}
                        >
                            {isPinned ?
                                <PinIcon size={20} className="text-green-500 dark:text-blue-400" /> :
                                <PinOffIcon size={20} />
                            }
                        </button>
                        <button
                            onClick={() => { setIsOpen(false); setIsPinned(false); }}
                            className="btn-dismiss btn-dismiss--icon"
                            title="Close filters"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Filter sections — each expanded section gets at most one scrollbar */}
                <div className="filter-sidebar-body">
                    <AccordionContainer className="p-3 sm:p-4">
                        {/* Update Types Filter */}
                        {!isSpot && (
                            <AccordionSection
                                title="Update Types"
                                icon={Filter}
                                badge={(filters.type.length || 0) + (filters.typeExclude.length || 0) || null}
                                isExpanded={expandedSections.types}
                                onToggle={() => toggleSection('types')}
                                canReset={(filters.type.length > 0) || (filters.typeExclude.length > 0)}
                                onReset={() => onUpdateFilters({ type: [], typeExclude: [] })}
                            >
                                <div className="p-3 sm:p-4">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {getVisibleTypes().map(type => {
                                            const state = getTypeButtonState(type);
                                            const isIncluded = state === 'include';
                                            const isExcluded = state === 'exclude';
                                            return (
                                                <div key={type} className="relative group">
                                                    <button
                                                        onClick={() => handleTypeToggle(type, false)}
                                                        className={`filter-chip-btn ${
                                                            isIncluded ? 'filter-chip-btn--include' :
                                                            isExcluded ? 'filter-chip-btn--exclude' : ''
                                                        }`}
                                                        title={`${type} (${typeItemCounts.typeCounts[type] || 0} items) - Click to toggle include/exclude`}
                                                    >
                                                        <img
                                                            src={`/assets/${type}.webp`}
                                                            alt={type}
                                                            className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto ${isExcluded ? 'opacity-50' : ''}`}
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                        <span className={`filter-count-badge${!(typeItemCounts.typeCounts[type]) ? ' filter-count-badge--empty' : ''}`}>
                                                            {typeItemCounts.typeCounts[type] || 0}
                                                        </span>
                                                        {isExcluded && (
                                                            <span className="absolute inset-0 flex items-center justify-center">
                                                                <X size={14} className="text-red-600 dark:text-red-400 font-bold" />
                                                            </span>
                                                        )}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </AccordionSection>
                        )}

                        {/* Camera Types Filter */}
                        {isSpot && (
                            <AccordionSection
                                title="Camera Types"
                                icon={Camera}
                                badge={(filters.camera?.length || 0) + (filters.cameraExclude?.length || 0) || null}
                                isExpanded={expandedSections.camera}
                                onToggle={() => toggleSection('camera')}
                                canReset={(filters.camera?.length > 0) || (filters.cameraExclude?.length > 0)}
                                onReset={() => onUpdateFilters({ camera: [], cameraExclude: [] })}
                            >
                                <div className="p-3 sm:p-4">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {cameraTypes.map(camera => {
                                            const currentCameras = filters.camera || [];
                                            const currentExcluded = filters.cameraExclude || [];
                                            const isIncluded = currentCameras.includes(camera);
                                            const isExcluded = currentExcluded.includes(camera);
                                            return (
                                                <div key={camera} className="relative group">
                                                    <button
                                                        onClick={() => handleCameraToggle(camera, false)}
                                                        className={`filter-chip-btn ${
                                                            isIncluded ? 'filter-chip-btn--include' :
                                                            isExcluded ? 'filter-chip-btn--exclude' : ''
                                                        }`}
                                                        title={`${camera} (${typeItemCounts.cameraCounts[camera] || 0} items) - Click to toggle include/exclude`}
                                                    >
                                                        <img
                                                            src={`/assets/${camera}.webp`}
                                                            alt={camera}
                                                            className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto ${isExcluded ? 'opacity-50' : ''}`}
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                        <span className={`filter-count-badge${!(typeItemCounts.cameraCounts[camera]) ? ' filter-count-badge--empty' : ''}`}>
                                                            {typeItemCounts.cameraCounts[camera] || 0}
                                                        </span>
                                                        {isExcluded && (
                                                            <span className="absolute inset-0 flex items-center justify-center">
                                                                <X size={14} className="text-red-600 dark:text-red-400 font-bold" />
                                                            </span>
                                                        )}
                                                    </button>
                                                </div>
                                            );
                                        })}
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
                                canReset={!!filters.dateRange}
                                onReset={() => onUpdateFilters({ dateRange: null })}
                            >
                                <div className="p-4">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="filter-label">From Year/Month</label>
                                            <input
                                                type="month"
                                                value={filters.dateRange ? filters.dateRange.fromDate : '2023-01'}
                                                className="filter-input"
                                                onChange={(e) => {
                                                    if (!e.target.value) {
                                                        onUpdateFilters({ dateRange: null });
                                                        return;
                                                    }
                                                    const fromDate = e.target.value;
                                                    const toDate = filters.dateRange?.toDate || getCurrentMonthDate();
                                                    onUpdateFilters({
                                                        dateRange: {
                                                            fromDate,
                                                            toDate
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="filter-label">To Year/Month</label>
                                            <input
                                                type="month"
                                                value={filters.dateRange ? filters.dateRange.toDate : getCurrentMonthDate()}
                                                className="filter-input"
                                                onChange={(e) => {
                                                    if (!e.target.value) {
                                                        onUpdateFilters({ dateRange: null });
                                                        return;
                                                    }
                                                    const toDate = e.target.value;
                                                    const fromDate = filters.dateRange?.fromDate || '2007-01';
                                                    onUpdateFilters({
                                                        dateRange: {
                                                            fromDate,
                                                            toDate
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                        {filters.dateRange && (
                                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                                <div className="filter-selection-summary">
                                                    Selected: {filters.dateRange.fromDate} to {filters.dateRange.toDate}
                                                </div>
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
                                canReset={Object.keys(filters.countryandregion || {}).length > 0}
                                onReset={() => onUpdateFilters({ countryandregion: {} })}
                            >
                                <div className="filter-section-body">
                                    <div className="filter-section-search-sticky">
                                        <div className="relative">
                                            <Search size={16} className="filter-input-icon absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            <input
                                                type="text"
                                                placeholder="Search countries and regions..."
                                                value={searchQueries.country}
                                                onChange={(e) => setSearchQueries(prev => ({ ...prev, country: e.target.value }))}
                                                className="filter-input filter-input--search"
                                            />
                                        </div>
                                    </div>

                                    <div className="filter-section-list">
                                        {locationOptions.map((option) => (
                                            <button
                                                key={`${option.type}-${option.countryCode}-${option.code}`}
                                                onClick={() => {
                                                    if (option.type === 'country') {
                                                        const newCountryAndRegion = { ...filters.countryandregion };
                                                        if (option.isSelected) {
                                                            delete newCountryAndRegion[option.code];
                                                        } else {
                                                            newCountryAndRegion[option.code] = [];
                                                        }
                                                        onUpdateFilters({ countryandregion: newCountryAndRegion });
                                                    } else {
                                                        const newCountryAndRegion = { ...filters.countryandregion };
                                                        const countryCode = option.countryCode;

                                                        if (!newCountryAndRegion[countryCode]) {
                                                            newCountryAndRegion[countryCode] = [];
                                                        }

                                                        if (option.isSelected) {
                                                            newCountryAndRegion[countryCode] = newCountryAndRegion[countryCode].filter(r => r !== option.code);
                                                        } else {
                                                            if (!newCountryAndRegion[countryCode].includes(option.code)) {
                                                                newCountryAndRegion[countryCode].push(option.code);
                                                            }
                                                        }
                                                        onUpdateFilters({ countryandregion: newCountryAndRegion });
                                                    }
                                                }}
                                                className={`filter-list-item ${
                                                    option.isSelected ?
                                                        (option.type === 'country' ? 'filter-list-item--country-selected' : 'filter-list-item--region-selected') :
                                                        ''
                                                }`}
                                            >
                                                <div className="flex items-center space-x-2 min-w-0">
                                                    <CountryFlag countryCode={option.countryCode} />
                                                    <div className="flex flex-col flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className={`truncate ${option.type === 'country' ? 'font-medium' : 'font-normal'}`}>
                                                                {option.name}
                                                            </span>
                                                            <span
                                                                className="filter-item-count"
                                                                title={`${option.itemCount} items`}
                                                            >
                                                                {option.itemCount}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {option.isSelected && (
                                                    <Check size={14} className={`flex-shrink-0 ${option.type === 'country' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
                                                )}
                                            </button>
                                        ))}

                                        {locationOptions.length === 0 && searchQueries.country && (
                                            <div className="text-center py-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                                No countries or regions found matching "{searchQueries.country}"
                                            </div>
                                        )}
                                    </div>

                                    {Object.keys(filters.countryandregion || {}).length > 0 && (
                                        <div className="filter-section-footer">
                                            <div className="filter-selection-summary">
                                                Selected:
                                                {Object.entries(filters.countryandregion).map(([countryCode, regions]) => {
                                                        const countryName = countriesMap[countryCode]?.name || countryCode;
                                                        if (regions.length === 0) {
                                                            return countryName;
                                                        } else {
                                                            return `${countryName} (${regions.join(', ')})`;
                                                        }
                                                    }).join('; ')}
                                            </div>
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
                            canReset={filters.author?.length > 0}
                            onReset={() => onUpdateFilters({ author: [] })}
                        >
                            <div className="filter-section-body">
                                <div className="filter-section-search-sticky">
                                    <div className="relative">
                                        <Search size={16} className="filter-input-icon absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Search authors..."
                                            value={searchQueries.author}
                                            onChange={(e) => setSearchQueries(prev => ({ ...prev, author: e.target.value }))}
                                            className="filter-input filter-input--search"
                                        />
                                    </div>
                                </div>

                                <div className="filter-section-list">
                                    {filteredAuthors.slice(0, 10).map(author => (
                                        <button
                                            key={author}
                                            onClick={() => handleAuthorToggle(author)}
                                            className={`filter-list-item ${
                                                filters.author?.includes(author) ? 'filter-list-item--country-selected' : ''
                                            }`}
                                        >
                                            <span className="truncate flex items-center gap-2">
                                                {author}
                                                <span
                                                    className="filter-item-count w-6 h-6"
                                                    title={`${authorItemCounts[author] || 0} items`}
                                                >
                                                    {authorItemCounts[author] || 0}
                                                </span>
                                            </span>
                                            {filters.author?.includes(author) && <Check size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </AccordionSection>
                    </AccordionContainer>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="filter-backdrop animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default FilterPanel;
