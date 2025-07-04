import {
	useRef,
	useState,
	useImperativeHandle,
	createContext,
	useContext,
} from 'react'
import type { CSSProperties, ChangeEvent, PropsWithChildren, Ref } from 'react'
import Calendar from './components/Calendar'
// import './App.css'
interface CalendarRef {
	getData: () => Date
	setData: (date: Date) => void
}
function App() {
	const calendarRef = useRef<CalendarRef>(null)

	return (
		<main>
			<button
				onClick={() => console.log(calendarRef.current?.getData())}
				color="red"
			>
				Click
			</button>
			<Calendar
				defaultValue={new Date('2023-01-01')}
				onChange={(date) => {
					console.log(date)
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
