import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

const TIME_IN_SECONDS = 25 * 60
let countdownTimeout: NodeJS.Timeout


@Module({ name: 'countdown', stateFactory: true, namespaced: true })
export default class Countdown extends VuexModule {
  private time = TIME_IN_SECONDS
  private minutes = Math.floor(this.time / 60)
  private seconds = this.time % 60
  private hasFinished = false
  private isActive = false


  public get $time() {
    return {
      time: this.time,
      minutes: this.minutes,
      seconds: this.seconds
    }
  }

  public get $status() {
    return {
      hasFinished: this.hasFinished,
      isActive: this.isActive
    }
  }

  @Mutation
  private SET_TIME(time: number) {
    this.time = time
    this.minutes = Math.floor(time / 60)
    this.seconds = time % 60
  }

  @Mutation
  private SET_HAS_FINISHED(hasFinished: boolean) {
    this.hasFinished = hasFinished
  }

  @Mutation
  private SET_IS_ACTIVE(isActive: boolean) {
    this.isActive = isActive
  }

  @Action({ rawError: true })
  public start() {
    this.context.commit('SET_IS_ACTIVE', true)
    this.decrementTime()
  }

  @Action
  public stop() {
    this.context.commit('SET_IS_ACTIVE', false)
    this.resetCountdown()
  }

  @Action
  public decrementTime() {
    if (this.isActive && this.time > 0) {
      countdownTimeout = setTimeout(() => {
        this.context.commit('SET_TIME', this.time - 1)
      }, 1000)
    } else if (this.isActive && this.time === 0) {
      this.context.commit('SET_HAS_FINISHED', true)
      this.context.commit('SET_IS_ACTIVE', false)
    }
  }

  @Action
  public resetCountdown() {
    clearTimeout(countdownTimeout)
    this.context.commit('SET_TIME', TIME_IN_SECONDS)
    this.context.commit('SET_HAS_FINISHED', false)
    this.context.commit('SET_IS_ACTIVE', false)
  }
}