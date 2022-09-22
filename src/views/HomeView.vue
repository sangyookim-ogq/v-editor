<template>
  <div class="home">
    <div class="editor-wrap">
      <div class="editor" ref="editor"></div>
    </div>

    <button v-on:click="log">
      LOG
    </button>
  </div>
</template>

<script>
// @ is an alias to /srcw
import Editor from '@/editor/Editor'
import '@/editor/editor.scss'

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
      console.log(this.editor.blocks.map(({editableEl})=> editableEl))
    }
  },
  components: {
  }
}
</script>


<style lang="scss" scoped>

.editor {
  max-width: 768px;
  width: 100%;
  margin: 72px auto;
  border: 1px solid #DEDEDE;
  min-height: 300px;
  padding: 8px;
}

</style>