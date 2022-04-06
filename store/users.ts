import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { User as AuthUser } from 'firebase/auth'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { SuccessLogin, FailedLogin, User } from '@/types'
import { db } from '@/config/firebase-config'


@Module({ name: 'users', stateFactory: true, namespaced: true })
export default class Users extends VuexModule {
  private user = {} as User
  private token = ''
  private userErrorMessage = ''
  private userExists = false
  private firebaseDocId = ''

  public get $one() {
    return this.user
  }

  public get $firebaseDocId() {
    return this.firebaseDocId
  }

  @Mutation
  private SET_USER(user: AuthUser | User) {
    function isUser(value: User | AuthUser): value is User {
      // eslint-disable-next-line no-prototype-builtins
      return value.hasOwnProperty('avatar_url');
    }

    if (isUser(user)) {
      this.user = user
    } else {
      const { displayName, photoURL } = user

      if (displayName && photoURL) {
        this.user = {
          name: displayName,
          avatar_url: photoURL,
          login: '',
          completedChallenges: 0,
          currentExperience: 0,
          level: 1
        }
      }
    }
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_ERROR_MESSAGE(message: string) {
    this.userErrorMessage = message
  }

  @Mutation
  private SET_USER_EXISTS(exists: boolean) {
    this.userExists = exists
  }

  @Mutation
  private SET_FIREBASE_DOC_ID(id: string) {
    this.firebaseDocId = id
  }

  @Action({ rawError: true })
  public async setUser(userData: SuccessLogin | User) {
    function isSuccessLogin(value: SuccessLogin | User): value is SuccessLogin {
      // eslint-disable-next-line no-prototype-builtins
      return value.hasOwnProperty('itemName');
    }

    if (isSuccessLogin(userData)) {
      this.context.commit('SET_TOKEN', userData.token)
      this.context.commit('SET_USER', userData.user)
    } else {
      const userQuery = query(collection(db, 'users'), where('login', '==', userData.login))

      const querySnap = await getDocs(userQuery)

      if (querySnap.size > 0) {
        this.context.commit('SET_USER_EXISTS', true)

        querySnap.forEach(doc => {
          if (doc) {
            this.context.commit('SET_USER', doc.data())
            this.context.commit('SET_FIREBASE_DOC_ID', doc.id)

            this.context.dispatch('challenges/challengeDataFromFirebase', doc.data(), { root: true })
          }
        })
      } else {
        this.context.commit('SET_USER', userData)
      }

    }
  }

  @Action
  public setUserError(errorData: FailedLogin) {
    this.context.commit('SET_ERROR_MESSAGE', errorData.errorMessage)
  }

  @Action({ rawError: true })
  public async createUser() {
    if (this.userExists) {
      return
    }
    try {
      const docRef = await addDoc(collection(db, 'users'), this.user)
      this.context.commit('SET_FIREBASE_DOC_ID', docRef.id)
    } catch (e) {
      console.log("Error adding document: ", e)
    }
  }
}