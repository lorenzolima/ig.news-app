// Later we can put the path of this component inside the Header Component Path
import { FaGithub, FaFacebook } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {
    const isUserLoggedIn = false;

    return isUserLoggedIn ? (
        <button className={styles.signInButton} type="button">
            <FaGithub color='#04d361' />
            Lorenzo Lima
            <FiX color='#737380' className={styles.closeIcon}/>
        </button>
    ) : (
        <button className={styles.signInButton} type="button">
            <FaGithub color='#eba417' />
            Sign in with GitHub
            <FiX color='#737380' className={styles.closeIcon}/>
        </button>
    )
}