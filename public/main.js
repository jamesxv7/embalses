// General Vue configuration for easy debuggin.
// Vue.config.debug = true

// General Firebase configuration
var baseURL = 'https://data-embalses-pr.firebaseio.com/v1/embalse/siteID/'

// dam data
var dataSource = new Firebase(baseURL)

var vm = new Vue({
  el: '#app',
  data: {
      embalses: [],
      order: 1,
      sortKey: 'city',
      filterKey: ''
  },
  ready: function () {
    dataSource.orderByKey().on('value', function (snapshot) {
      var item = snapshot.val();

      for (var i in item) {
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
      }

    vm.embalses.push(item);

    });
  },
  methods: {
    sortBy: function(key){
      console.log('Sort by selected key! ' + key);
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
        var datePart = value.split(' ');
        var year = datePart[0].split('-');
        year = year[1]+ '/' +year[2]+ '/' +year[0]
        return datePart[1] + " " + year;
      }
      return "N/A";
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
