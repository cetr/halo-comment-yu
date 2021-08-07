<template>
  <span
      class="emoji"
      :class="data['category']"
      v-html="data['emoji']"
  />
</template>

<script>
export default {
  name: 'Emoji',
  props: {
    data: {type: String}
  }
}
</script>

<style>
</style>
