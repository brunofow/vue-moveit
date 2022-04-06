import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { CombinedVueInstance } from 'vue/types/vue'
import { app } from '@/config/firebase-config'
import { FailedLogin, SuccessLogin } from '@/types'
import { users } from '@/store'

const auth = getAuth(app)
const provider = new GithubAuthProvider()

export default function authenticate(vueInstance: CombinedVueInstance<Vue, unknown, {
  auth(): void;
}, unknown, Readonly<Record<never, any>>>) {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken

      const user = result.user
      const success: SuccessLogin = {
        token,
        user
      }

      users.setUser(success)
      vueInstance.$router.push('/')
      vueInstance.$cookies.set('token', token)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);

      const failed: FailedLogin = {
        errorCode,
        errorMessage,
        email,
        credential
      }

      users.setUserError(failed)
    })
}