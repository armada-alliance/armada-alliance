import { useRef, useEffect } from 'react'
import cx from 'classnames'
import * as styles from "./styles"

export default function NumberField({
    variant = "default",
    size = "base",
    className,
    field = {},
    autoFocus,
    value,
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
            type="text"
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                let nextValue = `${e.target.value}` || "";

                if (nextValue.length) {
                    nextValue = nextValue
                        .split("")
                        .filter((char) => /\d+/.test(char))
                        .join("");
                }
                nextValue = nextValue.length ? parseInt(nextValue, 10) : nextValue;
                onChange({ value: nextValue });
            }}
            onKeyDown={onKeyDown}
            css={styles.input}
            className={cx(
                "max-w-lg block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md",
                className,
                size === "xl" ? "text-3xl" : null
            )}
        />
    );
}