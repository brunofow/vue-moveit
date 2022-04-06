/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Users from '@/store/users'
import Countdown from '@/store/countdown'
import Challenges from '@/store/challenges'

let users: Users
let countdown: Countdown
let challenges: Challenges

function initializeStores(store: Store<any>): void {
  users = getModule(Users, store)
  countdown = getModule(Countdown, store)
  challenges = getModule(Challenges, store)
}

export { initializeStores, users, countdown, challenges }