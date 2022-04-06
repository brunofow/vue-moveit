<template>
  <div class="container">
    <ExperienceBar />

    <div class="columns">
      <div class="left-column">
        <UserInformation />
        <CompletedChallenges />
        <Countdown />
        <CountdownButton />
      </div>

      <div class="right-column">
        <ChallengeCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { $axios } from '@/utils/nuxt-instace'
import { users } from '@/store'
import { User } from '@/types/User'

export default Vue.extend({
  layout: 'moveit',
  async asyncData({ redirect, app }) {
    if (!app.$cookies.get('token')) {
      redirect('/login')
    }

    const user: User = await $axios.$get('/user', {
      headers: {
        Authorization: `token ${app.$cookies.get('token')}`,
      },
    })

    user.level = 1
    user.completedChallenges = 0
    user.currentExperience = 0
    await users.setUser(user)
    await users.createUser()
  },
  mounted() {
    Notification.requestPermission()
  },
})
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr;
  justify-items: center;

  .experience-bar {
    width: 85%;
    top: 2rem;
  }

  .columns {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }

  .left-column {
    display: grid;
    grid-gap: 2rem;
  }

  .right-column {
    grid-template-rows: 1fr;
  }
}
</style>
