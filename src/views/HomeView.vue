<template>
  <div class="home">
    <div class="editor" ref="editor"></div>
  </div>
</template>

<script>
// @ is an alias to /srcw
import Editor from '@/editor/Editor'

export default {
  name: 'HomeView',
  mounted() {
    const editor = new Editor('.editor')
    console.log("editor", editor)
  },
  components: {
  }
}
</script>
