import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '../../lib/classNames'
import styles from './Button.module.css'

type ButtonProps = PropsWithChildren<{
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}>

export function Button({
  children,
  href,
  variant = 'primary',
}: ButtonProps) {
  const className = classNames(styles.button, styles[variant])

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link className={className} to={href}>
          {children}
        </Link>
      )
    }

    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }

  return <button className={className}>{children}</button>
}
