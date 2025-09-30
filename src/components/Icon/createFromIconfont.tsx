import { Icon, type IconProps } from './index'

const loadedSet = new Set<string>()

export function createFromIconfont(scriptUrl: string) {
	if (
		typeof scriptUrl === 'string' &&
		scriptUrl.length &&
		!loadedSet.has(scriptUrl)
	) {
		const script = document.createElement('script')
		script.setAttribute('src', scriptUrl)
		script.setAttribute('data-namespace', scriptUrl)
		document.body.appendChild(script)

		loadedSet.add(scriptUrl)
	}

	const Iconfont = ({ ref, ...restProps }: IconProps) => {
		const { type, ...rest } = restProps

		return (
			<Icon ref={ref} {...rest}>
				{type ? <use xlinkHref={`#${type}`} /> : null}
			</Icon>
		)
	}

	return Iconfont
}
