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

function App() {
	const [value, setValue] = useState(new Date())

	return (
		<main>
			<Calendar value={value} onChange={setValue} />
		</main>
	)
}

export default App

type Props = PropsWithChildren<{
	ref: Ref<HTMLDivElement>
	color: CSSProperties['color']
}>
function Button({ children, ref, color }: Props) {
	return (
		<div ref={ref} style={{ color }}>
			{children}
		</div>
	)
}
