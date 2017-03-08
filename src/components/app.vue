<template>
  <div class="message">Value iiiiiis: {{ count }}</div>
  <a href="#" @click.prevent="increment">Increment</a>
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      increment () {
        this.count ++;
      }
    }
  }
</script>

<style>
.message {
  color: blue;
}
</style>