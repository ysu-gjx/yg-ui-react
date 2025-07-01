import { useMergeState } from './hooks/useMergeState'

interface CalendarProps {
	value?: Date
	defaultValue?: Date
	onChange?: (date: Date) => void
}

export default function Calendar(props: CalendarProps) {
	const { value: propsValue, defaultValue = new Date(), onChange } = props

	const [mergedValue, setStateValue] = useMergeState(new Date(), {
		value: propsValue,
		defaultValue,
		onChange,
	})

	const changeValue = (date: Date) => {
		setStateValue(date)
	}

	return (
		<div>
			{mergedValue.toLocaleDateString()}
			<div className="" onClick={() => changeValue(new Date('2023-5-1'))}>
				2023-5-1
			</div>
			<div className="" onClick={() => changeValue(new Date('2023-5-2'))}>
				2023-5-2
			</div>
			<div className="" onClick={() => changeValue(new Date('2023-5-3'))}>
				2023-5-3
			</div>
		</div>
	)
}
