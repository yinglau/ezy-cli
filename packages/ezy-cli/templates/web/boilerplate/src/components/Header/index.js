import React from 'react'
import styles from './style.css'

function Header (props) {
  return (
    <div className={styles.head}>
      <div className='container'>
        <span className={styles.logo}>logo</span>
        <span className={styles.title}>A react + redux + webpack + babel stacks</span>
      </div>
    </div>
  )
}

export default Header
