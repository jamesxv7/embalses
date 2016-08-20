<template>
  <div class="list-group" v-for="val in embalses" track-by="$key">
    <div class="list-group-item" v-for="item in val | filterBy filterKey | orderBy sortKey order">
      <div id="{{ $key }}" class="row">
        <div class="{{ item.status }}"></div>
        <div class="col-xs-6" v-cloak>
          <p class="list-group-item-text">{{ item.city }}</p>
          <h3 class="list-group-item-heading">{{ item.name }}</h3>
        </div>
        <div class="col-xs-6 text-right" v-cloak>
          <h2 class="list-group-item-heading"><span class="glyphicon {{ item.indicator }}" aria-hidden="true"></span>{{ item.currentLevel | toDecimal }}</h2>
          <p class="list-group-item-text">{{ item.currentLevelTime | formatDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import
</script>

<style>
  .message {
    border: 1px solid red;
  }
</style>