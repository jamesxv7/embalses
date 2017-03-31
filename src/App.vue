<template>
  <div id="app">
    <div class="main-content">
      <Embalse :data="embalses"></Embalse>
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import Embalse from './components/Embalse'
import CustomFooter from './components/Footer'
import Firebase from 'firebase'

const config = {
  databaseURL: 'https://data-embalses-pr.firebaseio.com'
}
Firebase.initializeApp(config)
const db = Firebase.database()
const path = '/v1/embalse/siteID/'

export default {
  name: 'app',
  props: {
    data: []
  },
  components: {
    Embalse,
    CustomFooter
  },
  firebase: {
    embalses: db.ref(path)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main-content {
  margin: 0 auto;
  width: 90%;
  max-width: 1600px;
}
</style>
