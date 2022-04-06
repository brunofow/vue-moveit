<template>
  <div class="input-wrap">
    <input v-model="username" type="text" :placeholder="placeholder" />
    <button>
      <unicon name="arrow-right" fill="#FFF" width="20" height="20" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      username: '',
    }
  },
})
</script>

<style lang="scss" scoped>
.input-wrap {
  display: flex;

  input {
    background: linear-gradient(
      90deg,
      $blue-02 0%,
      rgba(73, 83, 184, 0.2) 100%
    );
    border: 1.5px solid transparent;
    border-radius: 5px 0 0 5px;
    padding: 1.5rem;
    color: $text-blue;
    transition: border 0.3s;

    &::placeholder {
      color: $text-blue;
    }

    &:hover,
    &:focus {
      border: 1.5px solid #414aa3;
    }

    &:not(:placeholder-shown) + button {
      background: $green;
      cursor: pointer;
    }
  }

  button {
    background: $blue-02;
    padding: 0 1.5rem;
    border-radius: 0 5px 5px 0;
    transition: background 0.3s;
  }
}
</style>
