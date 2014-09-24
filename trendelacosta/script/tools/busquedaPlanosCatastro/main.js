Ext.namespace("gxp.plugins");

var ClickControlHP = OpenLayers.Class(OpenLayers.Control, {
  defaultHandlerOptions: {
    'single': true,
    'double': false,
    'pixelTolerance': 0,
    'stopSingle': false,
    'stopDouble': false
  },

  initialize: function(options) {
    this.handlerOptions = OpenLayers.Util.extend(
      {}, this.defaultHandlerOptions
    );
    OpenLayers.Control.prototype.initialize.apply(
      this, arguments
    );
    this.handler = new OpenLayers.Handler.Click(
      this, {
        'click': this.trigger
      }, this.handlerOptions
    );
  },

  trigger: function(e) {
    var lonlat = app.mapPanel.map.getLonLatFromPixel(e.xy);
    window.callHistoriaPlanos = new Request.JSONP({
      url: server+workspace+'/wfs',
      timeout: 7000,
      data: {
        service: 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName: 'parcelas',
        maxFeatures: '100',
        srsName: app.mapPanel.map.getProjection(),
        outputFormat: 'text/javascript',
        format_options: 'callback:callbackBPC',
        filter: "<Filter><Contains><PropertyName>geom</PropertyName><Point srsName='EPSG:900913'><coordinates>"+lonlat.lon+","+lonlat.lat+"</coordinates></Point></Contains></Filter>"
      },
      onTimeout: function(){
        Ext.MessageBox.alert('Sin resultados', 'No se encontro ninguna parcela donde usted realizo el click.');
        //Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
        // self.win.enable();
      },
      onError: function(){
        Ext.MessageBox.alert('Sin resultados', 'No se encontro ninguna parcela donde usted realizo el click.');
        //Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
        // self.win.enable();
      }
    }).send();
  }
});

gxp.plugins.BusquedaPlanos = Ext.extend(gxp.plugins.Tool, {

  ptype: "busqueda_planos_catastro",

  menuText: 'Historial de Planos',

  toolTip: 'Historial de Planos',

  constructor: function(config) {
    gxp.plugins.BusquedaPlanos.superclass.constructor.apply(this, arguments);
  },

  addActions: function() {
    var self = this;
    var actions = [];
    window.callbackBPC = this.digerirClick.bind(this);
    // this.capa = new OpenLayers.Layer.Vector("Consulta Partido Partida", {
    //   group: "util",
    //   visibility: false
    // });
    // this.target.mapPanel.map.addLayer(this.capa);
    actions.unshift(new GeoExt.Action({
      text: this.menuText,
      menuText: this.menuText,
      buttonText: this.menuText,
      iconCls: "gxp-icon-zoom",
      tooltip: this.toolTip,
      control: new ClickControlHP({
        // capa: this.capa
      }),
      map: this.target.mapPanel.map,
      enableToggle: true,
      toggleGroup: this.toggleGroup
    }));
    return gxp.plugins.BusquedaPlanos.superclass.addActions.apply(this, [actions]);
  },
  digerirClick: function(resultado){
    window.callHistoriaPlanos.cancel();
    if(resultado.features.length == 0){
      return Ext.MessageBox.alert('Sin resultados', 'No se encontro ninguna parcela donde usted realizo el click.');
    }
    var nomenclas = [],
        self = this;
    resultado.features.forEach(function(feature){
      nomenclas.push(feature.properties.nomencla);
    })
    var jsonRequest = new Request.JSON({
      url: './servicio/planos',
      onSuccess: function(planosResult){
        var planos = [];
        if(planosResult.length == 0){
          Ext.MessageBox.alert('Sin resultados', 'No se encontro ninguna parcela donde usted realizo el click.');
        }
        for (nomencla in planosResult) {
          var plano = planosResult[nomencla];
          var store = new Ext.data.ArrayStore({
            fields: [
                 {name: 'plano'},
                 {name: 'parcelas'},
              ]
          });
          store.loadData(plano)
          var grid = new Ext.grid.GridPanel({
              store: store,
              autoWidth		: true,
              autoHeight: true,
              columns: [{
                    header   : 'Plano',
                    width    : 80,
                    sortable : false,
                    dataIndex: 'plano'
                  },{
                    header   : 'Parcelas',
                    width    : 200,
                    sortable : false,
                    dataIndex: 'parcelas'
                  },{
                    xtype: 'actioncolumn',
                    width: 30,
                    items: [{
                        icon   : './theme/gxp/img/silk/magnifier_zoom.png',
                        tooltip: 'Ver Plano',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = store.getAt(rowIndex);
                            var win = window.open("http://www.mosp.gba.gov.ar/web_geodesia/visualizacion_plano_res.php?nombre=http://www.mosp.gba.gov.ar/sistemas/geodesia/ugeodesia/Geodesia/"+rec.get('plano')+"(PA).dwf", '_blank');
                            win.focus();
                        }
                    }]
                }
              ],
              stripeRows: true
          });
          var tmp = new Ext.Panel({
            title: '',
            autoWidth		: true,
            autoHeight: true,
            items: grid
          });
          planos.push(tmp);
        }
        new Ext.Window({
          title		: self.menuText,
          autoWidth		: true,
          autoHeight: true,
          closeAction	: 'close',
          items	: planos,
          autoScroll	: true,
          layout: 'accordion',
          // split:true,
          onHide: function(){
            // self.clickControl.deactivate();
            // app.mapPanel.map.removeLayer(self.capa);
          },
          onShow: function(){
            // self.clickControl.activate();
            // app.mapPanel.map.addLayer(self.capa);
          }
        }).show();
      },
      onError: function(){
        Ext.MessageBox.alert('Sin resultados', 'No se encontro ninguna parcela donde usted realizo el click.');
      },
      onFailure: function(){
        Ext.MessageBox.alert('Sin resultados', 'No se encontro ninguna parcela donde usted realizo el click.');
      }
    }).get({
      nomenclaturas: nomenclas
    });
  }
});

Ext.preg(gxp.plugins.BusquedaPlanos.prototype.ptype, gxp.plugins.BusquedaPlanos);
