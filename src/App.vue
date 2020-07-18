<template>
  <div id="app">
    <Comment
      :id="28"
      type="sheet"
      :configs="configs"
    />
  </div>
</template>

<script>
import Comment from "./components/Comment";

export default {
  name: "app",
  components: {
    Comment
  },
  data() {
    return {
      configs: {
        autoLoad: true,
        showUserAgent: true,
        gravatarSource: '//cdn.v2ex.com/gravatar',
        loadingStyle: 'default',
        darkMode: true
      }
    };
  }
};
</script>
