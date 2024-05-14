import React from 'react'

export default function Button({children, className, onClick}) {
  return (
    <button className={`Button ${className} bg-primary px-5 rounded border text-white fs-6`} onClick={onClick}>
      {children}
    </button>
  )
}
