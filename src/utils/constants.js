// Color options for the map coverage display
export const colorOptions = {
    Default: ['1098ad', '99e9f2'],
    Crimson: ['f03e3e', 'ffc9c9'],
    Deep_Pink: ['d6336c', 'fcc2d7'],
    Blue_Violet: ['ae3ec9', 'eebefa'],
    Slate_Blue: ['7048e8', 'd0bfff'],
    Royal_Blue: ['4263eb', 'bac8ff'],
    Dodger_Blue: ['1c7ed6', 'a5d8ff'],
    Sea_Green: ['0ca678', '96f2d7'],
    Lime_Green: ['37b24d', 'b2f2bb'],
    OliveDrab: ['74b816', 'd8f5a2'],
    Orange: ['f59f00', 'ffec99'],
    Dark_Orange: ['f76707', 'ffd8a8'],
    Brown: ['bd5f1b', 'f7ca9e'],
};

// Special dates with country codes or special markers
export const specialDates = {
    '2025-08-25T17:06:00Z': 'cr',
    '2025-08-13T18:28:00Z': 'np',
    '2025-08-06T22:42:00Z': 'badcam',
    '2025-06-28T11:21:00Z': 'vn',
    '2025-06-03T01:14:00Z': 'na',
    '2025-03-31T19:36:00Z': 'smallcam',
    '2025-02-08T11:49:00Z': 'labuan',
    '2025-02-08T10:31:00Z': 'sabah',
    '2024-12-21T22:39:00Z': 'pr',
    '2024-12-16T03:39:00Z': 'sarawak',
    '2024-10-28T22:38:00Z': 'om',
    '2024-10-14T20:00:00Z': 'fo',
    '2024-10-01T02:59:00Z': 'li',
    '2024-09-08T03:50:00Z': 'ec',
    '2024-09-05T22:33:00Z': 'is',
    '2024-07-17T14:41:00Z': 'sm',
    '2024-05-08T20:49:00Z': 'mn',
    '2024-04-25T16:08:00Z': 'mt',
    '2024-04-19T01:04:00Z': 'lb',
    '2024-03-22T14:54:00Z': 'kz',
    '2024-03-28T23:57:00Z': 'st',
    '2023-09-29T00:04:00Z': 'kh',
    '2023-09-29T00:05:00Z': 'pa',
    '2023-09-29T03:53:00Z': 'mc',
    '2023-08-01T03:10:00Z': 'il',
    '2023-07-24T20:03:00Z': 'de',
    '2022-11-18T23:12:00Z': 'qa',
};

// Update types that are allowed in spot mode
export const allowedTypesInSpot = [
    'gen1', 'gen2', 'gen3', 'gen4',
    'smallcam', 'badcam', 'gen4trekker'
];

// All available update types
export const updateTypes = [
    'newcountry', 'newregion', 'newarea', 'newtown', 'newstreet',
    'newroad', 'newisland', 'newyear', 'gen1update', 'gen2update',
    'gen3update', 'ariupdate', 'newsmallcam', 'newtrekker',
    'newtripod', 'newsquare', 'newbadcam', 'smallcam',
    'gen4trekker', 'gen4', 'gen3', 'gen2', 'gen1', 'badcam'
];

// Get icon type based on update types
export const getIconType = (types) => {
    if (types.some(t => t.includes('gen1'))) return 'gen1';
    if (types.some(t => t.includes('gen2') || t.includes('gen3'))) return 'gen2or3';
    if (types.some(t => t.includes('newroad'))) return 'newroad';
    if (types.some(t => t.includes('noblueline'))) return 'noblueline';
    return 'gen4';
};

// Convert country code to flag emoji
export const getFlagEmoji = (countryCode) => {
    return countryCode
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(0x1F1E6 - 65 + char.charCodeAt(0)))
        .join('');
};

// Get current timestamp
export const getTimestamp = (dateString) => {
    if (!dateString) {
        const now = new Date();
        return Math.floor(now.getTime() / 1000);
    }
    const date = new Date(dateString);
    return Math.floor(date.getTime() / 1000);
};

// Get timestamp for the first day of current month
export const getMonthTimestamp = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    return Math.floor(firstDay.getTime() / 1000);
};

// Get timestamp for one month ago from today
export const getOneMonthAgoTimestamp = () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return Math.floor(oneMonthAgo.getTime() / 1000);
};

// Check if date is in range
export const isDateInRange = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
};

// Check if arrays intersect
export const intersect = (array1, array2) => {
    const lowerArray2 = array2.map(e => e.toLowerCase());
    return array1.some(element => lowerArray2.includes(element.toLowerCase()));
};

// Check if month is in range
export const monthInRange = (pano_date, monthRange) => {
    const [startMonth, startYear] = monthRange[0].split(' ');
    const [endMonth, endYear] = monthRange[1].split(' ');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const startIndex = months.indexOf(startMonth);
    const endIndex = months.indexOf(endMonth);
    const panoIndex = (pano_date.month) - 1;
    const panoYear = pano_date.year;

    if (startYear === endYear) {
        return panoYear === Number(startYear) && panoIndex >= startIndex && panoIndex <= endIndex;
    } else {
        return (panoYear === Number(startYear) && panoIndex >= startIndex) ||
            (panoYear === Number(endYear) && panoIndex <= endIndex) ||
            (panoYear >= Number(startYear) && panoYear <= Number(endYear));
    }
};

// Debounce function
export const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

export function copyCoords(e) {
    const text = e.latlng.lat.toFixed(7) + ', ' + e.latlng.lng.toFixed(7);
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
}

export function openNearestPano(e) {
    const latlng = e.latlng;
    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latlng.lat},${latlng.lng}`;
    window.open(url, '_blank');
}
