import React, { useCallback, type ReactElement, type FC } from 'react'
import copy from 'copy-to-clipboard'

// 复制组件：把复制行为附加到其子元素上。
// 特性：
// - 保留子元素原有的 onClick / onKeyDown 处理器（如果存在）
// - 支持通过键盘 Enter / Space 触发复制（当子元素本身不是交互元素时）
// - 自动为非交互元素添加 role="button" 和 tabIndex=0 以增强可访问性
interface CopyToClipboardOptions {
  debug?: boolean
  message?: string
  format?: string
}

interface CopyToClipboardProps {
  text: string
  onCopy?: (text: string, result: boolean) => void
  children: ReactElement
  options?: CopyToClipboardOptions
}

const interactiveTagSet = new Set(['button', 'a', 'input', 'select', 'textarea'])

const CopyToClipboard: FC<CopyToClipboardProps> = ({ text, onCopy, children, options }) => {
  const child = React.Children.only(children) as ReactElement

  // 执行复制并调用外部回调
  const doCopy = useCallback(() => {
    try {
      const result = copy(text, options)
      onCopy?.(text, result)
      return result
    } catch {
      onCopy?.(text, false)
      return false
    }
  }, [text, options, onCopy])

  // 点击处理器：先执行复制，再调用子元素原有的 onClick
  const handleClick = (event: React.MouseEvent) => {
    doCopy()
    const childProps = child.props as Record<string, unknown>
    const fn = childProps.onClick as
      | ((e: React.MouseEvent) => void)
      | undefined
    if (typeof fn === 'function') fn(event)
  }

  // 键盘处理：当按下 Enter 或 Space 时触发复制，并转发给子 onKeyDown
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key
    if (key === 'Enter' || key === ' ') {
      // 阻止默认（例如在非交互元素上空格会滚动页面）
      event.preventDefault()
      doCopy()
    }

    const childProps = child.props as Record<string, unknown>
    const fn = childProps.onKeyDown as
      | ((e: React.KeyboardEvent) => void)
      | undefined
    if (typeof fn === 'function') fn(event)
  }

  // 如果子元素是原生的非交互标签，则自动添加 role 和 tabIndex 以支持键盘焦点和屏读器交互。
  const childType = typeof child.type === 'string' ? child.type : null
  const shouldAddAccessibility = childType && !interactiveTagSet.has(childType)

  const extraProps: Record<string, unknown> = {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  }

  if (shouldAddAccessibility) {
    const childProps = child.props as Record<string, unknown>
    extraProps.role = (childProps.role as string) ?? 'button'
    extraProps.tabIndex = (childProps.tabIndex as number) ?? 0
  }

  return React.cloneElement(child, extraProps)
}

export default CopyToClipboard
