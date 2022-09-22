<template>
  <div class="home">
    <div class="editor" ref="editor"></div>

    <button v-on:click="log">
      LOG
    </button>
  </div>
</template>

<script>
// @ is an alias to /srcw
import Editor from '@/editor/Editor'

export default {
  data() {
    return {
      editor: null
    }
  },
  name: 'HomeView',
  mounted() {
    this.editor = new Editor('.editor')
    console.log("editor", this.editor)
  },
  methods: {
    log() {
      console.log(this.editor)
      console.log(this.editor.blocks.map(({contentEditableEl})=> contentEditableEl))
    }
  },
  components: {
  }
}
</script>
