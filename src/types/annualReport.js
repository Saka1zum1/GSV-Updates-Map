/**
 * Annual Report Type Definitions
 * Matches the backend data structure from VirtualStreets/virtualstreets-update-bot
 * app/models/annual_report.py
 */

/**
 * @typedef {Object} TimeStats
 * @property {Object<string, number>} by_month - Monthly distribution {month: count}
 * @property {Object<string, number>} by_weekday - Weekday distribution {0-6: count}, 0=Monday
 * @property {Object<string, number>} by_hour - Hourly distribution {0-23: count}
 * @property {number} peak_month - Peak month number
 * @property {number} peak_weekday - Peak weekday (0-6)
 * @property {number} peak_hour - Peak hour (0-23)
 */

/**
 * @typedef {Object} GeoStats
 * @property {number} countries_count - Total number of countries
 * @property {number} regions_count - Total number of regions
 * @property {Object<string, number>} top_countries - Top countries {country: count}
 * @property {Object<string, number>} top_regions - Top regions {region: count}
 * @property {Array<{region: string, country: string, count: number}>} top_regions_with_country - Top regions with country info
 * @property {Array<string>} new_countries - New countries this year
 */

/**
 * @typedef {Object} ContentStats
 * @property {Object<string, number>} types_distribution - Distribution of update types
 * @property {Array<string>} top_types - Top update types
 * @property {number} new_type_count - Count of new types
 * @property {number} update_type_count - Total update type count
 */

/**
 * @typedef {Object} SpotContentStats
 * @property {Object<string, number>} camera_distribution - Camera type distribution
 * @property {Object<string, number>} source_distribution - Source distribution
 * @property {Array<string>} top_cameras - Top cameras
 * @property {Array<string>} top_sources - Top sources
 * @property {number} pinpoint_count - Number of pinpoints
 * @property {number} pinpoint_rate - Pinpoint rate percentage
 * @property {number} pinpoints_provided_count - Number of pinpoints provided
 */

/**
 * @typedef {Object} StreakStats
 * @property {number} longest_streak_days - Longest consecutive days streak
 * @property {number} current_streak_days - Current active streak
 * @property {number} active_days - Total active days
 * @property {number} active_weeks - Total active weeks
 * @property {number} active_months - Total active months
 * @property {string} first_activity_date - ISO timestamp of first activity
 * @property {string} last_activity_date - ISO timestamp of last activity
 */

/**
 * @typedef {Object} RankingStats
 * @property {number} total_rank - Overall ranking
 * @property {number} total_rank_percentile - Ranking percentile
 * @property {Object<string, number>} country_ranks - Rankings by country
 * @property {Object<string, number>} monthly_ranks - Rankings by month
 * @property {number} best_month_rank - Best monthly rank
 * @property {number} best_month - Month number of best rank
 */

/**
 * @typedef {Object} InteractionStats
 * @property {string} most_reacted_msg_id - Most reacted message ID
 * @property {string} most_reacted_msg_channel_id - Channel ID of most reacted message
 * @property {number} most_reacted_msg_count - Reaction count
 * @property {number} fastest_reaction_time - Fastest reaction time in seconds
 * @property {number} avg_reaction_time - Average reaction time in seconds
 * @property {number} diamond_count - Diamond reaction count
 * @property {number} gold_count - Gold reaction count
 */

/**
 * @typedef {Object} Milestones
 * @property {Array<string>} achievements - List of achievement IDs
 * @property {Array<Object>} special_moments - Special moment records
 */

/**
 * @typedef {Object} AnnualReport
 * @property {string} author_id - Discord user ID
 * @property {string} author_name - Username
 * @property {number} report_year - Report year
 * @property {string} report_type - "update" or "spot"
 * @property {string} generated_at - ISO timestamp
 * @property {number} total_count - Total count for the year
 * @property {number} daily_average - Daily average
 * @property {TimeStats} time_stats - Time statistics
 * @property {GeoStats} geo_stats - Geographic statistics
 * @property {ContentStats} [content_stats] - Content statistics (updates only)
 * @property {SpotContentStats} [spot_content_stats] - Spot content statistics (spots only)
 * @property {StreakStats} streak_stats - Streak statistics
 * @property {RankingStats} ranking_stats - Ranking statistics
 * @property {InteractionStats} interaction_stats - Interaction statistics
 * @property {Milestones} milestones - Milestones and achievements
 * @property {Object} custom_data - Custom additional data
 * @property {string} version - Report version number
 */

export const REPORT_TYPES = {
    UPDATE: 'update',
    SPOT: 'spot'
};

export const MIN_DATA_THRESHOLD = 10; // Minimum records to show full report

export default {};
