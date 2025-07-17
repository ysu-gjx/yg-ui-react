import {
	useRef,
	useState,
	useImperativeHandle,
	createContext,
	useContext,
} from 'react'
import type { CSSProperties, ChangeEvent, PropsWithChildren, Ref } from 'react'
import Calendar from './components/Calendar/index'

import dayjs from 'dayjs'

// import './App.css'
interface CalendarRef {
	getData: () => Date
	setData: (date: Date) => void
}
function App() {
	const calendarRef = useRef<CalendarRef>(null)

	console.log(dayjs().daysInMonth())
	console.log(dayjs().startOf('month').day())
	console.log(dayjs().endOf('month').format('YYYY-MM-DD'))

	return (
		<main>
			<button
				onClick={() => console.log(calendarRef.current?.getData())}
				color="red"
			>
				Click
			</button>
			<Calendar
				style={{ width: '80%' }}
				locale='en-US'
				onChange={(date) => {
					console.log(date.format('YYYY-MM-DD'))
				}}
				ref={calendarRef}
			/>
		</main>
	)
}

export default App

type Props = PropsWithChildren<{
	ref: Ref<HTMLDivElement>
	color: CSSProperties['color']
}>
function Button({ children, ref, color, ...props }: Props) {
	return (
		<div ref={ref} style={{ color }} {...props}>
			{children}
		</div>
	)
}
