import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { updateDoc, doc } from 'firebase/firestore'
import { Challenge } from '@/types'
import challenges from '@/assets/challenges.json'
import { db } from '@/config/firebase-config'

interface FirebaseData {
  currentExperience: number
  completedChallenges: number
  level: number
}

@Module({ name: 'challenges', stateFactory: true, namespaced: true })
export default class Challenges extends VuexModule {
  private actualChallenge: Challenge | null = null
  private currentExperience = 0
  private level = 1
  private completedChallenges = 0
  private isLevelUpModalOpen = false

  private experienceToNextLevel = Math.pow((this.level + 1) * 4, 2)

  public get $actualChallenge() {
    return this.actualChallenge
  }

  public get $level() {
    return this.level
  }

  public get $isLevelUpModalOpen() {
    return this.isLevelUpModalOpen
  }

  public get $currentExperience() {
    return this.currentExperience
  }

  public get $experienceToNextLevel() {
    return this.experienceToNextLevel
  }

  public get $completedChallenges() {
    return this.completedChallenges
  }

  @Mutation
  private SET_ACTUAL_CHALLENGE(challenge: Challenge) {
    this.actualChallenge = challenge
  }

  @Mutation
  private SET_CURRENT_EXPERIENCE(experience: number) {
    this.currentExperience = experience
  }

  @Mutation
  private SET_LEVEL(level: number) {
    this.level = level
    this.experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  }

  @Mutation
  private SET_IS_LEVEL_UP_MODAL_OPEN(isLevelUpModalOpen: boolean) {
    this.isLevelUpModalOpen = isLevelUpModalOpen
  }

  @Mutation
  private SET_COMPLETED_CHALLENGES(completedChallenges: number) {
    this.completedChallenges = completedChallenges
  }

  @Action
  public startNewChallenge() {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
    this.context.commit('SET_ACTUAL_CHALLENGE', randomChallenge)

    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification('Novo desafio', {
        body: `Valendo ${randomChallenge.amount} xp`
      })
    }
  }

  @Action
  public async completeChallenge() {
    if (!this.actualChallenge) {
      return
    }
    const { amount } = this.actualChallenge

    let finalExperience = this.currentExperience + amount

    if (finalExperience >= this.experienceToNextLevel) {
      finalExperience = finalExperience - this.experienceToNextLevel
      this.levelUp()
    }

    this.context.commit('SET_CURRENT_EXPERIENCE', finalExperience)
    this.context.commit('SET_ACTUAL_CHALLENGE', null)
    this.context.commit('SET_COMPLETED_CHALLENGES', this.completedChallenges + 1)
    this.context.dispatch('countdown/resetCountdown', null, { root: true })

    const docRef = doc(db, 'users', this.context.rootState.users.firebaseDocId)

    await updateDoc(docRef, {
      completedChallenges: this.completedChallenges,
      currentExperience: this.currentExperience,
      level: this.level
    })

  }

  @Action
  public resetChallenge() {
    this.context.commit('SET_ACTUAL_CHALLENGE', null)
  }

  @Action
  public levelUp() {
    this.context.commit('SET_LEVEL', this.level + 1)
    this.context.commit('SET_IS_LEVEL_UP_MODAL_OPEN', true)
  }

  @Action
  public closeModal() {
    this.context.commit('SET_IS_LEVEL_UP_MODAL_OPEN', false)
  }

  @Action
  public challengeDataFromFirebase(data: FirebaseData) {
    this.context.commit('SET_CURRENT_EXPERIENCE', data.currentExperience)
    this.context.commit('SET_LEVEL', data.level)
    this.context.commit('SET_COMPLETED_CHALLENGES', data.completedChallenges)
  }
}