import Link from 'next/link'
import css from './Button.module.css'

type ButtonProps = {
  children: React.ReactNode | string
  isDisabled?: boolean
  type?: 'submit' | 'reset' | 'button'
  href?: string
  onClick?: (args?: any) => void
}

export const Button = ({
  children,
  isDisabled,
  type,
  href,
  onClick,
}: ButtonProps) => {
  if (href) {
    return (
      <Link href={href} className={css.Button}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={css.Button}
      disabled={isDisabled}
      onClick={onClick}>
      {children}
    </button>
  )
}
