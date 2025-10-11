import {
	useRef,
	useState,
	useImperativeHandle,
	createContext,
	useContext,
	useEffect,
} from 'react'
import type { CSSProperties, ChangeEvent, PropsWithChildren, Ref } from 'react'
import { Space } from '@/components/Space'
import { ConfigContext } from './components/Space/ConfigProvider'

function App() {
	const addRef = useRef(null)

	useEffect(() => {
		console.log(addRef.current)
	}, [])

	return (
		<main>
			<ConfigContext value={{ size: 'large' }}>
				<Space
					direction="horizontal"
					align="end"
					wrap
					split={
						<div
							style={{ width: '100px', height: '100px', background: 'blue' }}
						>
							22
						</div>
					}
				>
					<div
						className="box"
						style={{ width: '100px', height: '100px', background: 'red' }}
					>
						1
					</div>
					<div
						className="box"
						style={{ width: '100px', height: '100px', background: 'red' }}
					>
						1
					</div>
					<div
						className="box"
						style={{ width: '100px', height: '100px', background: 'red' }}
					>
						1
					</div>
					<div
						className="box"
						style={{ width: '100px', height: '100px', background: 'red' }}
					>
						1
					</div>
					<div
						className="box"
						style={{ width: '100px', height: '100px', background: 'red' }}
					>
						1
					</div>
				</Space>
			</ConfigContext>
		</main>
	)
}

export default App

type Props = PropsWithChildren<{
	ref?: Ref<HTMLDivElement>
	color: CSSProperties['color']
}>
function Button({ children, ref, color, ...props }: Props) {
	return (
		<div ref={ref} style={{ color }} {...props}>
			{children}
		</div>
	)
}
