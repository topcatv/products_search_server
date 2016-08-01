package com.isafeway.products.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

	/**
	 * 长时间格式字符串
	 */
	public final static String DATE_LONG_FORMAT = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 长时间格式字符串
	 */
	public final static String DATE_LONG_FORMAT1 = "yyyy-MM-dd HH:mm";

	/**
	 * 短时间格式字符串
	 */
	public final static String DATE_SHORT_FORMAT = "yyyy-MM-dd";

	/**
	 * 长时间格式
	 */
	public final static SimpleDateFormat SDF_LONG = new SimpleDateFormat(DATE_LONG_FORMAT);

	/**
	 * 长时间格式
	 */
	public final static SimpleDateFormat SDF_LONG1 = new SimpleDateFormat(DATE_LONG_FORMAT1);

	/**
	 * 短时间格式
	 */
	public final static SimpleDateFormat SDF_SHORT = new SimpleDateFormat(DATE_SHORT_FORMAT);

	/**
	 * 获取当前日期，精确到日
	 * @return 当前日期
	 */
	public static Date now() {
		try {
			return SDF_SHORT.parse(SDF_SHORT.format(new Date()));
		} catch (Exception ex) {
			return null;
		}
	}

	/**
	 * 获取昨天的日期，精确到日
	 * @return 昨天
	 */
	public static Date yesterday() {
		return dateAdd(now(), Calendar.DAY_OF_MONTH, -1);
	}

	/**
	 * 将日期字符串转换为日期，精确到秒
	 * @param str 日期字符串
	 * @return 日期，转换失败返回null
	 */
	public static Date toLongDate(String str) {
		try {
			return SDF_LONG.parse(str);
		} catch (Exception ex) {
			return null;
		}
	}

	/**
	 * 将日期字符串转换为日期，精确到日
	 * @param str 日期字符串
	 * @return 日期，转换失败返回null
	 */
	public static Date toShortDate(String str) {
		try {
			return SDF_SHORT.parse(str);
		} catch (Exception ex) {
			return null;
		}
	}

	/**
	 * 将日期字符串按指定的格式串转换为日期
	 * @param str 日期字符串
	 * @param format 格式串
	 * @return 日期，转换失败返回null
	 */
	public static Date toDate(String str, String format) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			return sdf.parse(str);
		} catch (Exception ex) {
			return null;
		}
	}

	/**
	 * 将日期转换为日期字符串，精确到秒
	 * @param str 日期
	 * @return 日期字符串，转换失败返回null
	 */
	public static String toLongDateString(Date date) {
		try {
			return SDF_LONG.format(date);
		} catch (Exception ex) {
			return null;
		}
	}

	/**
	 * 将日期转换为日期字符串，精确到秒
	 * @param str 日期
	 * @return 日期字符串，转换失败返回null
	 */
	public static String toLongDateString1(Date date) {
		try {
			return SDF_LONG1.format(date);
		} catch (Exception ex) {
			return null;
		}
	}

	/**
	 * 将日期转换为日期字符串，精确到日
	 * @param str 日期
	 * @return 日期字符串，转换失败返回null
	 */
	public static String toShortDateString(Date date) {
		try {
			return SDF_SHORT.format(date);
		} catch (Exception ex) {
			return null;
		}
	}
	/**
	 * 将日期转换为日期字符串，精确到日
	 * @param str 日期
	 * @return 日期字符串，转换失败返回null
	 */
	public static String toShortDateString(String date) {
		return date;
	}

	/**
	 * 将日期按指定的格式字符串转换为日期字符串
	 * @param date 日期
	 * @param format 格式字符串
	 * @return 日期，转换失败返回null
	 */
	public static String toDateString(Date date, String format) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			return sdf.format(date);
		} catch (Exception ex) {
			return null;
		}
	}

	/**
	 * 在指定的日期上增加或减少field指定单位的时间
	 * @param date 日期
	 * @param field 参照Calendar的field常量定义
	 * @param amount 增加或减少的单位
	 * @return 处理后的值
	 */
	public static Date dateAdd(Date date, int field, int amount) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(field, amount);
		return calendar.getTime();
	}

	/**
	 * 描述: 比较两个日期之间相差的天数
	 *
	 * @param d1
	 *            第一个日期
	 * @param d2
	 *            第二个日期限
	 * @return
	 */
	public static long dateDiffDay(Date d1, Date d2) {
		long daterange = d1.getTime() - d2.getTime();
		long time = 1000 * 3600 * 24; // A day in milliseconds
		return daterange / time;
	}
}
