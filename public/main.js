var baseURL = 'https://data-embalses-pr.firebaseio.com/v0/embalse/siteID/'

// Lago Guajataca
var dataFrom50010800 = new Firebase(baseURL + '50010800')

dataFrom50010800.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50010800.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
     var item = snapshot.val();
    mv50010800.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;

    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'

    mv50010800.appData.push(item);
});

var mv50010800 = new Vue({
    el: '#siteID-50010800',
    data: {
        appData: []
    }
})

// Lago regulador de Isabela
var dataFrom50011088 = new Firebase(baseURL + '50011088')

dataFrom50011088.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50011088.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    mv50011088.appData.$remove(0);
    item.level = levelData.level;
    item.time = levelData.time;
    mv50011088.appData.push(item);
});

var mv50011088 = new Vue({
    el: '#siteID-50011088',
    data: {
        appData: []
    }
})

// Lago Garzas
var dataFrom50020100 = new Firebase(baseURL + '50020100')

dataFrom50020100.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50020100.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50020100.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50020100.appData.push(item);
});

var vm50020100 = new Vue({
    el: '#siteID-50020100',
    data: {
        appData: []
    }
})

// Lago Adjuntas
var dataFrom50020550 = new Firebase(baseURL + '50020550')

dataFrom50020550.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50020550.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50020550.appData.$remove(0);
    item.level = levelData.level;
    item.time = levelData.time;
    vm50020550.appData.push(item);
});

var vm50020550 = new Vue({
    el: '#siteID-50020550',
    data: {
        appData: []
    }
})

// Lago Vivi
var dataFrom50023110 = new Firebase(baseURL + '50023110')

dataFrom50023110.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50023110.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50023110.appData.$remove(0);
    item.level = levelData.level;
    item.time = levelData.time;
    vm50023110.appData.push(item);
});

var vm50023110 = new Vue({
    el: '#siteID-50023110',
    data: {
        appData: []
    }
})

// Lago Caonillas
var dataFrom50026140 = new Firebase(baseURL + '50026140')

dataFrom50026140.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50026140.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50026140.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50026140.appData.push(item);
});

var vm50026140 = new Vue({
    el: '#siteID-50026140',
    data: {
        appData: []
    }
})

// Lago Dos Bocas
var dataFrom50027100 = new Firebase(baseURL + '50027100')

dataFrom50027100.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50027100.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50027100.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50027100.appData.push(item);
});

var vm50027100 = new Vue({
    el: '#siteID-50027100',
    data: {
        appData: []
    }
})

// Lago El Guineo
var dataFrom50032290 = new Firebase(baseURL + '50032290')

dataFrom50032290.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50032290.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50032290.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50032290.appData.push(item);
});

var vm50032290 = new Vue({
    el: '#siteID-50032290',
    data: {
        appData: []
    }
})

// Lago de Matrullas
var dataFrom50032590 = new Firebase(baseURL + '50032590')

dataFrom50032590.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50032590.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50032590.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50032590.appData.push(item);
});

var vm50032590 = new Vue({
    el: '#siteID-50032590',
    data: {
        appData: []
    }
})

// Lago Carite
var dataFrom50039995 = new Firebase(baseURL + '50039995')

dataFrom50039995.on('value', function (snapshot) { 
    var levelData = {};
    dataFrom50039995.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50039995.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50039995.appData.push(item);
});

var vm50039995 = new Vue({
    el: '#siteID-50039995',
    data: {
        appData: []
    }
})

// Lago La Plata
var dataFrom50045000 = new Firebase(baseURL + '50045000')

dataFrom50045000.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50045000.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50045000.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'

    vm50045000.appData.push(item);
});

var vm50045000 = new Vue({
    el: '#siteID-50045000',
    data: {
        appData: []
    }
})

// Lago de Cidra
var dataFrom50047550 = new Firebase(baseURL + '50047550')

dataFrom50047550.on('value', function (snapshot) {  
    var levelData = {};
    dataFrom50047550.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50047550.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50047550.appData.push(item);
});

var vm50047550 = new Vue({
    el: '#siteID-50047550',
    data: {
        appData: []
    }
})

// Lago Las Curias
var dataFrom50048680 = new Firebase(baseURL + '50048680')

dataFrom50048680.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50048680.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50048680.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50048680.appData.push(item);
});

var vm50048680 = new Vue({
    el: '#siteID-50048680',
    data: {
        appData: []
    }
})

// Lago Loiza (Carraizo)
var dataFrom50059000 = new Firebase(baseURL + '50059000')

dataFrom50059000.on('value', function (snapshot) {    
    var levelData = {};
    dataFrom50059000.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50059000.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50059000.appData.push(item);
});

var vm50059000 = new Vue({
    el: '#siteID-50059000',
    data: {
        appData: []
    }
})

// Lago Fajardo
var dataFrom50071225 = new Firebase(baseURL + '50071225')

dataFrom50071225.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50071225.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50071225.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50071225.appData.push(item);
});

var vm50071225 = new Vue({
    el: '#siteID-50071225',
    data: {
        appData: []
    }
})

// Lago Icacos
var dataFrom50075550 = new Firebase(baseURL + '50075550')

dataFrom50075550.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50075550.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50075550.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50075550.appData.push(item);
});

var vm50075550 = new Vue({
    el: '#siteID-50075550',
    data: {
        appData: []
    }
})

// Lago Blanco
var dataFrom50076800 = new Firebase(baseURL + '50076800')

dataFrom50076800.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50076800.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50076800.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50076800.appData.push(item);
});

var vm50076800 = new Vue({
    el: '#siteID-50076800',
    data: {
        appData: []
    }
})

// Lago Patillas
var dataFrom50093045 = new Firebase(baseURL + '50093045')

dataFrom50093045.on('value', function (snapshot) {
    var levelData = {};
    dataFrom50093045.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50093045.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50093045.appData.push(item);
});

var vm50093045 = new Vue({
    el: '#siteID-50093045',
    data: {
        appData: []
    }
})

// Lago Melania

var dataFrom50095800 = new Firebase(baseURL + '50095800')

dataFrom50095800.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50095800.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50095800.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50095800.appData.push(item);
});

var vm50095800 = new Vue({
    el: '#siteID-50095800',
    data: {
        appData: []
    }
})

// Lago Coamo

var dataFrom50106850 = new Firebase(baseURL + '50106850')

dataFrom50106850.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50106850.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50106850.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50106850.appData.push(item);
});

var vm50106850 = new Vue({
    el: '#siteID-50106850',
    data: {
        appData: []
    }
})

// Lago Toa Vaca

var dataFrom50111210 = new Firebase(baseURL + '50111210')

dataFrom50111210.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50111210.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50111210.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50111210.appData.push(item);
});

var vm50111210 = new Vue({
    el: '#siteID-50111210',
    data: {
        appData: []
    }
})

// Lago Guayabal

var dataFrom50111300 = new Firebase(baseURL + '50111300')

dataFrom50111300.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50111300.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50111300.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50111300.appData.push(item);
});

var vm50111300 = new Vue({
    el: '#siteID-50111300',
    data: {
        appData: []
    }
})

// Lago Cerrillos

var dataFrom50113950 = new Firebase(baseURL + '50113950')

dataFrom50113950.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50113950.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50113950.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    
    if (levelData.level >= item.overflowLevel)
        item.status = 'overflow'
    else if (levelData.level >= item.secureLevel)
        item.status = 'secure'
    else if (levelData.level >= item.observationLevel)
        item.status = 'observation'
    else if (levelData.level >= item.adjustmentLevel)
        item.status = 'adjustment'
    else if (levelData.level >= item.controlLevel)
        item.status = 'control'
    else
        item.status = 'off'
    
    vm50113950.appData.push(item);
});

var vm50113950 = new Vue({
    el: '#siteID-50113950',
    data: {
        appData: []
    }
})

// Lago Lucchetti

var dataFrom50125780 = new Firebase(baseURL + '50125780')

dataFrom50125780.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50125780.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50125780.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50125780.appData.push(item);
});

var vm50125780 = new Vue({
    el: '#siteID-50125780',
    data: {
        appData: []
    }
})

// Lago Loco

var dataFrom50128900 = new Firebase(baseURL + '50128900')

dataFrom50128900.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50128900.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50128900.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50128900.appData.push(item);
});

var vm50128900 = new Vue({
    el: '#siteID-50128900',
    data: {
        appData: []
    }
})

// Lago Yahuecas

var dataFrom50141100 = new Firebase(baseURL + '50141100')

dataFrom50141100.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50141100.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50141100.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50141100.appData.push(item);
});

var vm50141100 = new Vue({
    el: '#siteID-50141100',
    data: {
        appData: []
    }
})

// Lago Guayo

var dataFrom50141500 = new Firebase(baseURL + '50141500')

dataFrom50141500.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50141500.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50141500.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50141500.appData.push(item);
});

var vm50141500 = new Vue({
    el: '#siteID-50141500',
    data: {
        appData: []
    }
})

// Lago Daguey

var dataFrom50146073 = new Firebase(baseURL + '50146073')

dataFrom50146073.on('value', function (snapshot) {
    
    var levelData = {};
    dataFrom50146073.ref().child('level').limitToLast(1).on('child_added', function (level) {
        levelData.level = (level.val());
        levelData.time = (level.key());
    });
    
    var item = snapshot.val();
    vm50146073.appData.$remove(0);
    item.level = levelData.level.toFixed(2);
    item.time = levelData.time;
    vm50146073.appData.push(item);
});

var vm50146073 = new Vue({
    el: '#siteID-50146073',
    data: {
        appData: []
    }
})
