<template>
  <div class="btn-group btn-group-justified" role="group">
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-default" v-on:click="sortBy('city')">Pueblo</button>
  </div>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-default" v-on:click="sortBy('currentLevel')">Nivel</button>
  </div>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-default" v-on:click="sortBy('status')">Status</button>
  </div>
</div>
</template>

<script>
</script>

<style>
</style>