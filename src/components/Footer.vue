<template>
  <div>
    <div id="legend">
      <h4>Leyenda</h4>
      <span class="title">Niveles de Alerta</span>
      <span><div class="overflow"></div>Desborde</span>
      <span><div class="secure"></div>Seguridad</span>
      <span><div class="observation"></div>Observación</span>
      <span><div class="adjustment"></div>Ajustes Operacionales</span>
      <span><div class="control"></div>Control</span>
      <span><div class="off"></div>Fuera de Servicio</span>
      <span><div class="none"></div>Desconocido</span>
      <span class="title">Indicadores de cambio <small>(basados en el nivel hace 8 horas atrás)</small></span>
      <span><div class="glyphicon glyphicon-circle-arrow-up"></div>Aumento de nivel</span>
      <span><div class="glyphicon glyphicon-circle-arrow-down"></div>Descenso de nivel</span>
      <span><div class="glyphicon glyphicon-record"></div>No hubo cambio de nivel</span>
    </div>
    <div class="footer">
      <div class="col-xs-6">
        © {{ new Date().getFullYear() }} <a href="http://www.jaimeolmo.com">Jaime Olmo</a> — Hecho en <a href="http://www.seepuertorico.com/">Puerto Rico</a>
      </div>
      <div class="col-xs-6 text-right">
        Fork me y colabora <a href="https://github.com/jamesxv7/embalses"><img alt="Fork me y colabora" src="GitHub-Mark.png" /></a>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
#legend {
  margin: 0 auto;
  padding: 0 15px 28px 15px;
  max-width: 1600px;
  width: 90%;
  color: #888;
}

#legend span {
  margin-right: 12px;
  display: block;
}

h4 + .title {
  margin-top: 0;
}

#legend div{
  margin-right: 2px;
  margin-bottom: 2px;
  display: inline-block;
  vertical-align: middle;
}

#legend .title {
  display: block;
  font-size: 1.1em;
  margin-bottom: 4px;
  margin-top:8px;
}

#legend .overflow,
#legend .secure,
#legend .observation,
#legend .adjustment,
#legend .control,
#legend .off,
#legend .none {
  border: 1px solid #ddd;
  height: 22px;
  width: 10px;
}

#legend .overflow { 
  background-color: #d9a5ef;
}

#legend .secure { 
  background-color: #b1d6b1;
}

#legend .observation { 
  background-color: #bbcaf4;
}

#legend .adjustment { 
  background-color: #ffffa5;
}

#legend .control { 
  background-color: #ffdfa5;
}

#legend .off { 
  background-color: #e8a5a5;
}

#legend .none { 
  background-color: #eee;
}

#legend .glyphicon {
  height: 16px;
  line-height: 8px;
}

.footer {
  max-width: 1600px;
  margin: 0 auto;
  padding-bottom: 28px;
  display: flex;
  width: 90%;
}

@media (min-width: 600px) {
  #legend span {
    display: inline-block;
  }
}

</style>
