import { useMergeState } from '@/hooks/useMergeState'
import './calendar.css'
import { useImperativeHandle, type Ref } from 'react'

interface CalendarProps {
	value?: Date
	defaultValue?: Date
	onChange?: (date: Date) => void
	ref: Ref<CalendarRef>
}
interface CalendarRef {
	getData: () => Date
	setData: (date: Date) => void
}

export default function Calendar({ ref, ...props }: CalendarProps) {
	const { value, defaultValue, onChange } = props

	const [date, setDate] = useMergeState(new Date(), {
		value,
		defaultValue,
		onChange,
	})

	const handlePrevMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
	}

	const handleNextMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
	}

	const monthNames = [
		'一月',
		'二月',
		'三月',
		'四月',
		'五月',
		'六月',
		'七月',
		'八月',
		'九月',
		'十月',
		'十一月',
		'十二月',
	]

	// 获取当前展示月份的第一天
	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)

	// 获取当前展示月份的有几天
	const daysInMonth = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate()

	// 获取当前展示月份的第一天是星期几
	const dayOfWeek = firstDayOfMonth.getDay()

	const days = Array.from(
		{ length: daysInMonth },
		(_, index) => new Date(date.getFullYear(), date.getMonth(), index + 1)
	)

	// 填充上月的天数
	const prevMonthDays = Array.from({ length: dayOfWeek })
		.map((_, index) => new Date(date.getFullYear(), date.getMonth(), -index))
		.reverse()

	// 填充下月的天数
	const nextMonthDays = Array.from({
		length: 42 - dayOfWeek - daysInMonth,
	}).map(
		(_, index) => new Date(date.getFullYear(), date.getMonth() + 1, index + 1)
	)

	useImperativeHandle(ref, () => ({
		getData: () => date,
		setData: (date: Date) => {
			setDate(date)
		},
	}))

	return (
		<div className="calendar">
			<div className="header">
				<button onClick={handlePrevMonth}>&lt;</button>
				<div>
					{date.getFullYear()} 年 {monthNames[date.getMonth()]}
				</div>
				<button onClick={handleNextMonth}>&gt;</button>
			</div>
			<div className="days">
				<div className="day">日</div>
				<div className="day">一</div>
				<div className="day">二</div>
				<div className="day">三</div>
				<div className="day">四</div>
				<div className="day">五</div>
				<div className="day">六</div>
				{prevMonthDays.map((day, index) => (
					<div key={index} className="daynotthismonth">
						{day.getDate()}
					</div>
				))}

				{days.map((day, index) => {
					if (index === date.getDate() - 1) {
						return (
							<div
								key={index}
								className="day selected"
								onClick={() => setDate(day)}
							>
								{index + 1}
							</div>
						)
					} else {
						return (
							<div key={index} className="day" onClick={() => setDate(day)}>
								{index + 1}
							</div>
						)
					}
				})}

				{nextMonthDays.map((day, index) => (
					<div key={index} className="daynotthismonth">
						{day.getDate()}
					</div>
				))}
			</div>
		</div>
	)
}
