<template>
  <div id="InputSearch">
    <div class="container-search">
      <input
        type="text"
        :value="value"
        @keyup="onKeyUp($event)"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputSearch',
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, required: true }
  },
  methods: {
    // Emit value of v-model
    onKeyUp(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style>
</style>
