<template>
  <div class="user-information">
    <img :src="user.avatar_url" alt="Avatar do usuário" />
    <div class="details">
      <h1>{{ user.name }}</h1>
      <span>
        <img src="@/assets/icons/level.svg" />
        Level {{ level }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { users, challenges } from '@/store'

export default Vue.extend({
  data() {
    return {
      user: users.$one,
    }
  },
  computed: {
    level() {
      return challenges.$level
    },
  },
})
</script>

<style lang="scss" scoped>
.user-information {
  display: flex;
  align-items: center;

  > img {
    width: 88px;
    border-radius: 50%;
    margin-right: 1rem;
  }

  h1 {
    margin: 0;
  }
}
</style>
