import { Store } from 'vuex'
// import { Context } from '@nuxt/types'
import { initializeStores } from '@/utils/store-acessor'

export const actions = {
  // async nuxtServerInit(store: Store<any>, context: Context) {
  //   const username = context.$cookies.get('username')
  //   if (username) {
  //     await store.dispatch('users/setUser', username)
  //   }
  // }
}

const initializer = (store: Store<any>) => initializeStores(store)


export const plugins = [initializer]
export * from '@/utils/store-acessor'