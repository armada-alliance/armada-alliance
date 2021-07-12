import cx from 'classnames'
import { useEffect, useRef } from 'react';
import * as styles from './styles'

export default function TextField({
    className,
    value,
    field = {},
    autoFocus,
    onChange,
    onKeyDown,
}) {
    const { placeholder } = field.settings || {};

    const inputRef = useRef(null)

    useEffect(() => {

        if (autoFocus) {
            setTimeout(() => {
                inputRef.current.focus()
            }, 500)
        }

    }, [autoFocus])

    return (
        <input
            data-type="field"
            autoComplete="off"
            ref={inputRef}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange({ value: e.target.value })}
            onKeyDown={onKeyDown}
            css={styles.input}
            className={cx(
                "max-w-lg block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md",
                className
            )}
        />
    );
}
