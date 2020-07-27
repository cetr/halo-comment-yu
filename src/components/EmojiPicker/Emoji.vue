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
    .emoji.颜文字 {
        background: #fce4ec40 !important;
        border: 1px #fce4ec2e solid !important;
        border-radius: 5px !important;
        font-size: 12px !important;
        margin: 5px !important;
        padding: 0 !important;
    }
</style>
