<template>
  <div>
    <form id="search">
      <input class="form-control" placeholder="Filtrar información..." name="q" v-model="filterString">
    </form>
    <div id="sort">
      <div class="btn-group btn-group-justified" role="group">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default" 
          @click="sortBy('city')">Pueblo<span class="glyphicon" 
          :class="{ active: sortKey == 'city', 
          'glyphicon-triangle-bottom': sortOrders['city'] < 0, 
          'glyphicon-triangle-top': sortOrders['city'] > 0  }" />
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default" 
          @click="sortBy('currentLevel')">Nivel<span class="glyphicon" 
          :class="{ active: sortKey == 'currentLevel', 
          'glyphicon-triangle-bottom': sortOrders['currentLevel'] < 0, 
          'glyphicon-triangle-top': sortOrders['currentLevel'] > 0 }" />
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default" 
          @click="sortBy('status')">Status<span class="glyphicon" 
          :class="{ active: sortKey == 'status', 
          'glyphicon-triangle-bottom': sortOrders['status'] < 0, 
          'glyphicon-triangle-top': sortOrders['status'] > 0 }" />
          </button>
        </div>
      </div>
    </div>
    <div class="list-group">
      <div class="list-group-item" v-for="(item, key) in filteredItems">
          <div :id="item['.key']" class="row">
            <div :class="item.status"></div>
            <div class="col-xs-6" v-cloak>
              <p class="list-group-item-text">{{ item.city }}</p>
              <h4 class="list-group-item-heading">{{ item.name }}</h4>
            </div>
            <div class="col-xs-6 text-right" v-cloak>
            <p class="list-group-item-text">{{ formatDate(item.currentLevelTime) }}</p>
            <div class="indicator-and-level">
              <span :class="'glyphicon ' + indicator(item.currentLevel, item.last8HoursLevel )"></span>
              <h2 class="list-group-item-heading">{{ item.currentLevel | toDecimal }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data () {
    let sortOrders = {
      'city': 1,
      'currentLevel': 1,
      'status': 1
    }
    return {
      embalses: this.data,
      sortKey: 'city',
      filterString: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredItems: function () {
      let embalse = this.embalses
      let key = this.sortKey
      let order = this.sortOrders[key] || 1
      let filterString = this.filterString && this.filterString.toLowerCase()
      // Filter by user input
      if (filterString) {
        embalse = embalse.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterString) > -1
          })
        })
      }
      // Default sort by city
      embalse = embalse.slice().sort(function (a, b) {
        a = a[key]
        b = b[key]
        return (a === b ? 0 : a > b ? 1 : -1) * order
      })
      // TODO Remove this function from this location
      embalse.forEach(function (item) {
        if (item.hasOwnProperty('overflowLevel') ||
          item.hasOwnProperty('secureLevel') ||
          item.hasOwnProperty('observationLevel') ||
          item.hasOwnProperty('adjustmentLevel') ||
          item.hasOwnProperty('controlLevel')) {
          if (item.currentLevel >= item.overflowLevel) {
            item.status = 'a_overflow'
          } else if (item.currentLevel >= item.secureLevel) {
            item.status = 'b_secure'
          } else if (item.currentLevel >= item.observationLevel) {
            item.status = 'c_observation'
          } else if (item.currentLevel >= item.adjustmentLevel) {
            item.status = 'd_adjustment'
          } else if (item.currentLevel >= item.controlLevel) {
            item.status = 'e_control'
          } else {
            item.status = 'f_off'
          }
        } else {
          item.status = 'g_none'
        }
      })
      return embalse
    }
  },
  methods: {
    sortBy (key) {
      if (this.sortKey !== key) this.sortOrders[key] = -1
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    formatDate (value) {
      // TODO Improve this functionality
      if (value !== undefined) {
        let date = new Date((value || '').replace(/-/g, '/').replace(/[TZ]/g, ' '))
        let diff = (((new Date()).getTime() - date.getTime()) / 1000)
        let dayDiff = Math.floor(diff / 86400)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        if (isNaN(dayDiff) || dayDiff < 0) {
          return (
            ((month < 10) ? '0' + month.toString() : month.toString()) + '/' +
            ((day < 10) ? '0' + day.toString() : day.toString()) + '/' + year.toString()
          )
        }
        let since = 'Hace '
        let r =
          (
            (
              dayDiff === 0 &&
              (
                (diff < 60 && 'justo ahora') ||
                (diff < 120 && since + '1 minuto') ||
                (diff < 3600 && since + Math.floor(diff / 60) + ' minutos') ||
                (diff < 7200 && since + '1 hora') ||
                (diff < 86400 && since + Math.floor(diff / 3600) + ' horas')
              )
            ) || (dayDiff === 1 && 'Ayer') ||
            (dayDiff < 7 && since + dayDiff + ' dias') ||
            (dayDiff < 31 && since + Math.ceil(dayDiff / 7) + ' semanas') ||
            (dayDiff >= 31 && since + Math.ceil(dayDiff / 31) + ' meses')
          )
        return r
      } else {
        return 'N/A'
      }
    },
    indicator (cur, last8h) {
      if (cur > last8h) {
        return 'glyphicon-circle-arrow-up'
      } else if (cur < last8h) {
        return 'glyphicon-circle-arrow-down'
      } else {
        return 'glyphicon-record'
      }
    }
  },
  filters: {
    toDecimal: function (value) {
      return parseFloat(value).toFixed(2)
    }
  }
}
</script>

<style>
.indicator-and-level{
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

#sort, #search {
  margin-bottom: 10px;
}

.list-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.list-group-item {
  flex: 1 0 100%;
  border-radius: 5px;
  height:80px;
  overflow: hidden;
  margin: 4px;
}

.glyphicon {
  font-size:1.15em;
  color: gray;
  opacity: 0.25;
  margin-right:4px;
  margin-top:.5em;
}

.glyphicon-circle-arrow-up {
  color: green;
  opacity: 0.5;
}

.glyphicon-circle-arrow-down {
  color: red;
  opacity: 0.5;
}

.glyphicon-record {
  color: yellowgreen;
  opacity: 0.5;
}

#sort .glyphicon {
  margin-left: 4px;
  font-size: .8em;
}

#sort .active {
  opacity: 1;
}

.a_overflow,
.b_secure,
.c_observation,
.d_adjustment,
.e_control,
.f_off,
.g_none { 
  height: 100%;
  top: 0; 
  width: 12px; 
  display: inline; 
  margin-right: 6px;
  position: absolute;
  border-radius: 4px 0 0 4px;
}

.a_overflow { 
  background-color: #d9a5ef; 
}

.b_secure { 
  background-color: #b1d6b1; 
}

.c_observation { 
  background-color: #bbcaf4; 
}

.d_adjustment { 
  background-color: #ffffa5; 
}

.e_control { 
  background-color: #ffdfa5;
}

.f_off { 
  background-color: #e8a5a5; 
}

.g_none { 
  background-color: #eee; 
}

@media (min-width: 600px) {
  .list-group-item {
    flex: 1 0 48.25%;
    max-width: 48.25%;
  }
}

@media (min-width: 1200px) {
  .list-group-item {
    flex: 1 0 32.5%;
    max-width: 32.5%;
  }
}
</style>
