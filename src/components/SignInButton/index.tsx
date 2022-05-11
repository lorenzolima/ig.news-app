// Later we can put the path of this component inside the Header Component Path
import { FaGithub, FaFacebook } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

import styles from './styles.module.scss'

export function SignInButton() {
    const { data: session } = useSession();

    // console.log(session);

    return session ? (
        <button className={styles.signInButton} type="button">
            <FaGithub color='#04d361' />
            {session.user.name}
            <FiX color='#737380' className={styles.closeIcon} onClick={() => signOut()}/>
        </button>
    ) : (
        <button className={styles.signInButton} type="button" onClick= {() => signIn('github')}>
            <FaGithub color='#eba417' />
            Sign in with GitHub
        </button>
    )
}