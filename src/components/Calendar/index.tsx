import './index.scss'
import MonthCalendar from './MonthCalendar'
import CalendarHeader from './Header'
import { type Ref, type CSSProperties, type ReactNode, useState } from 'react'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import cs from 'classnames'
import LocaleContext from './LocaleContext'
import { useControllableValue } from 'ahooks'

export interface CalendarProps {
	value?: Dayjs
	defaultValue?: Dayjs
	style?: CSSProperties
	className?: string | string[]
	// 定制日期显示，会完全覆盖日期单元格
	dateRender?: (currentDate: Dayjs) => ReactNode
	// 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效
	dateInnerContent?: (currentDate: Dayjs) => ReactNode
	// 国际化相关
	locale?: string
	onChange?: (date: Dayjs) => void
	ref: Ref<CalendarRef>
}
export interface CalendarRef {
	getData: () => Date
	setData: (date: Date) => void
}

function Calendar(props: CalendarProps) {
	const { value, style, className, locale, onChange } = props

	const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
		defaultValue: dayjs(),
	})

	const [curMonth, setCurMonth] = useState<Dayjs>(curValue)

	const classNames = cs('calendar', className)

	function changeDate(date: Dayjs) {
		setCurValue(date)
		setCurMonth(date)
		// onChange?.(date)  // 使用了ahooks的useControllableValue，不需要onChange， 否则会触发两次
	}

	function selectHandler(date: Dayjs) {
		changeDate(date)
	}

	function handlePrevMonth() {
		setCurMonth(curMonth.subtract(1, 'month'))
	}

	function handleNextMonth() {
		setCurMonth(curMonth.add(1, 'month'))
	}

	function todayHandler() {
		const date = dayjs()

		changeDate(date)
	}
	return (
		<LocaleContext value={{ locale: locale || navigator.language }}>
			<div className={classNames} style={style}>
				<CalendarHeader
					curMonth={curMonth}
					prevMonthHandler={handlePrevMonth}
					nextMonthHandler={handleNextMonth}
					todayHandler={todayHandler}
				/>
				<MonthCalendar
					{...props}
					value={curValue}
					curMonth={curMonth}
					selectHandler={selectHandler}
				/>
			</div>
		</LocaleContext>
	)
}

export default Calendar
