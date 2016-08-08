// General Vue configuration for easy debuggin.
// Vue.config.debug = true

// General Firebase configuration
var baseURL = 'https://data-embalses-pr.firebaseio.com/v1/embalse/siteID/'

// Dam data
var dataSource = new Firebase(baseURL);
dataSource.orderByKey().on('value', function (snapshot) {
      var item = snapshot.val();

      for (var i in item) {
        // Level status
        if (item[i].hasOwnProperty('overflowLevel') ||
        item[i].hasOwnProperty('secureLevel') ||
        item[i].hasOwnProperty('observationLevel') ||
        item[i].hasOwnProperty('adjustmentLevel') ||
        item[i].hasOwnProperty('controlLevel'))
        {
          if (item[i].currentLevel >= item[i].overflowLevel)
            item[i].status = 'overflow';
          else if (item[i].currentLevel >= item[i].secureLevel)
            item[i].status = 'secure';
          else if (item[i].currentLevel >= item[i].observationLevel)
            item[i].status = 'observation';
          else if (item[i].currentLevel >= item[i].adjustmentLevel)
            item[i].status = 'adjustment';
          else if (item[i].currentLevel >= item[i].controlLevel)
            item[i].status = 'control';
          else
            item[i].status = 'off';
        } else {
            item[i].status = 'none';
        }
        
        // Indicator
        if (item[i].currentLevel > item[i].last8HoursLevel) {
          item[i].indicator = 'glyphicon-circle-arrow-up';
        } else if (item[i].currentLevel < item[i].last8HoursLevel) {
          item[i].indicator = 'glyphicon-circle-arrow-down';
        } else {
          item[i].indicator = 'glyphicon-record';
        }
      }

    vm.embalses.push(item);

    });

// Vuejs instance
var vm = new Vue({
  el: '#app',
  data: {
      embalses: [],
      order: 1,
      sortKey: 'city',
      filterKey: ''
  },
  methods: {
    sortBy: function(key){
      this.sortKey = key;
      this.order = this.order * -1;
    }
  },
  filters: {
    toDecimal: function(value) {
      return parseFloat(value).toFixed(2);
    },
    formatDate: function(value) {
      if (value != undefined) {                      
        var date = new Date((value || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

      if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
        return (
            year.toString() + '-'
            +((month<10) ? '0' + month.toString() : month.toString())+ '-'
            +((day<10) ? '0' + day.toString() : day.toString())
        );

      var r =
      ( 
          (
              day_diff == 0 && 
              (
                  (diff < 60 && "justo ahora")
                  || (diff < 120 && "Hace 1 minuto")
                  || (diff < 3600 && "Hace " + Math.floor(diff / 60) + " minutos")
                  || (diff < 7200 && "Hace 1 hora")
                  || (diff < 86400 && "Hace " + Math.floor(diff / 3600) + " horas")
              )
          )
          || (day_diff == 1 && "Ayer")
          || (day_diff < 7 && "Hace " + day_diff + " dias")
          || (day_diff < 31 && "Hace " + Math.ceil(day_diff / 7) + " semanas")
      );
        return r;

      } else {
        return "N/A";
      }
    }
  }
})

// Maybe some day...
// var elem = document.querySelector('.grid');
// var msnry = new Masonry( elem, {
// // options
// itemSelector: '.grid-item',
// columnWidth: 20,
// stamp: '.stamp'
// });
// msnry.layout();
