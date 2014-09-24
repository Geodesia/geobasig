var server = "http://www.mosp.gba.gov.ar/geoserver/";//"http://192.168.12.133:8080/";//"http://127.0.0.1:8080/";//http://hyperdvba:8080/";
var masizos = "masizos",
	parcelas = "parcelas";
var workspace = "Geodesia";

var Nomenclatura = new Class({
	Implements: Events,
	win: false,
	dom: false,
	ext: false,
	init: function(ext){
		this.ext = ext;
		this.dom = $('nomenclatura');
		this.clickEnMapa();
		// this.dom.getElement('button').addEvent('click',this.consultar.bind(this));
		window.callbackNomenclatura = this.procesarRespuesta.bind(this);
		this.capa = new OpenLayers.Layer.Vector("Consulta Nomenclatura", {
			group: "util"
		});
		this.store = new Ext.data.JsonStore({
				// store configs
				autoLoad: true,
				url: './servicio/partidos',
				storeId: 'partidos',
				// reader configs
				root: 'partidos',
				idProperty: 'partido',
				fields: ['nombre', 'partido']
		});
	},
	mostrar: function(){
		var self = this;
		if(!this.win){
			this.form = new Ext.form.FormPanel({
				autoHeight: true,
				labelWidth: 90,
				frame: false,
				bodyStyle:'padding:5px 5px 0',
				items   : [
						new Ext.form.ComboBox({
							    // typeAhead: true,
							    // triggerAction: 'all',
							    //lazyRender:true,
							    mode: 'local',
							    store: this.store,
									name: 'partidoN',
									id: 'partidoN',
							    valueField: 'partido',
							    displayField: 'nombre',
									fieldLabel: 'Partido',
									anchor:'100%',  // anchor width by percentage
									anyMatch: true,
									listeners   : {
									    beforequery: function(record){
									        // record.query = new RegExp(record.query, 'i');
									        // record.forceAll = true;
									    }
									}
							}),{
	                xtype     : 'textfield',
	                id      : 'circunscripcionN',
	                fieldLabel: 'Circunscripción'
	            },{
	                xtype     : 'textfield',
	                id      : 'seccionN',
	                fieldLabel: 'Sección'
	            },{
	                xtype : 'compositefield',
	                fieldLabel: 'Chacra',
	                items: [{
                            xtype: 'textfield',
                            id:'chacraNN',
                          	flex : 1
                        },
                        {
                            xtype: 'textfield',
                          	id:'chacraTN',
                          	flex : 1
                    }]
	            },{
	                xtype : 'compositefield',
	                fieldLabel: 'Quinta',
	                items: [{
                            xtype: 'textfield',
                          	id:'quintaNN',
                          	flex : 1
                        },
                        {
                            xtype: 'textfield',
                          	id:'quintaTN',
                          	flex : 1
                    }]
	            },{
	                xtype : 'compositefield',
	                fieldLabel: 'Fracción',
	                items: [{
                            xtype: 'textfield',
                          	id:'fraccionNN',
                          	flex : 1
                        },
                        {
                            xtype: 'textfield',
                          	id:'fraccionTN',
                          	flex : 1
                    }]
	            },{
	                xtype : 'compositefield',
	                fieldLabel: 'Manzana',
	                items: [{
                            xtype: 'textfield',
                          	id:'manzanaNN',
                          	flex : 1
                        },
                        {
                            xtype: 'textfield',
                          	id:'manzanaTN',
                          	flex : 1
                    }]
	            },{
	                xtype : 'compositefield',
	                fieldLabel: 'Parcela',
	                items: [{
                            xtype: 'textfield',
                          	id:'parcelaNN',
                          	flex : 1
                        },
                        {
                            xtype: 'textfield',
                          	id:'parcelaTN',
                          	flex : 1
                    }]
	            }]
			});
			this.win = new Ext.Window({
				title		: 'Busqueda por Nomenclatura',
				autoWidth		: true,
				autoHeight: true,
				closeAction	: 'hide',
				items	: [this.form],
				autoScroll	: true,
				onHide: function(){
					//self.clickControl.deactivate();
					app.mapPanel.map.removeLayer(self.capa);
				},
				onShow: function(){
					//self.clickControl.activate();
					app.mapPanel.map.addLayer(self.capa);
				},
				buttons: [{
            		text: 'Buscar',
            		handler: self.consultar.bind(self)
        		}]
			});
		}
		app.mapPanel.map.addLayer(this.capa);
		this.win.show(this.ext);
	},
	clickEnMapa: function(){
		var self = this;
		ClickControl = OpenLayers.Class(OpenLayers.Control, {
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
                var point = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);
                if(self.bufferVec){
					self.capa.removeFeatures([self.bufferVec]);
					self.bufferVec = false;
                }
                var bufferValue = 5;
                self.buffer = new OpenLayers.Geometry.Polygon.createRegularPolygon(point,bufferValue,20);

				self.bufferVec = new OpenLayers.Feature.Vector(self.buffer);
				self.capa.addFeatures([self.bufferVec]);

                var bounds = self.buffer.getBounds().toArray();
                self.win.disable();
				self.reqJsonP = new Request.JSONP({
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
						format_options: 'callback:callbackProgresiva',
						filter: "<Filter><BBOX><PropertyName>the_geom</PropertyName><Box srsName='EPSG:900913'><coordinates>"+bounds[0]+","+bounds[1]+" "+bounds[2]+","+bounds[3]+"</coordinates></Box></BBOX></Filter>"
					},
					onTimeout: function(){
						//console.log('onTimeout',arguments);
						//Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
						self.win.enable();
					}
				}).send();
            }

        });
		this.clickControl = new ClickControl();
		app.mapPanel.map.addControl(this.clickControl);
		//this.clickControl.deactivate();
	},
	completar: function(palabra,largo){
		while(palabra.length < largo){
			palabra = "0"+palabra;
		}
		return palabra.toUpperCase();
	},
	_gTex: function(id){
		var dom = document.getElementById(id);
		var respuesta = {
			seteado: true
		};
		if(this.formato[id].tipo == "numero"){
			if(dom.value.toInt() == 0 || isNaN(dom.value.toInt())){
				respuesta.seteado = false;
				var value = "0";
			}else{
				var value = dom.value.toInt().toString();
			}
		}else{
			var value = dom.value.trim();
			if(value.length == 0){
				respuesta.seteado = false;
			}
		}
		respuesta.valor = this.completar(value,this.formato[id].largo.toInt());
		return respuesta;
	},
	gTex: function(ids){
		var respuesta = {
			seteado: false,
			valor: ""
		};
		for (var i = ids.length - 1; i >= 0; i--) {
			var valor = this._gTex(ids[i]);
			if(valor.seteado)
				respuesta.seteado = true;
			respuesta.valor = valor.valor + respuesta.valor;
		};
		return respuesta;
	},
	formato: {
		'partidoN': {
			tipo: "numero",
			largo: 3
		},
		'circunscripcionN': {
			tipo: "texto",
			largo: 2
		},
		'seccionN': {
			tipo: "texto",
			largo: 2
		},
		'chacraNN': {
			tipo: "numero",
			largo: 4
		},
		'chacraTN': {
			tipo: "texto",
			largo: 3
		},
		'quintaNN': {
			tipo: "numero",
			largo: 4
		},
		'quintaTN': {
			tipo: "texto",
			largo: 3
		},
		'fraccionNN': {
			tipo: "numero",
			largo: 4
		},
		'fraccionTN': {
			tipo: "texto",
			largo: 3
		},
		'manzanaNN': {
			tipo: "numero",
			largo: 4
		},
		'manzanaTN': {
			tipo: "texto",
			largo: 3
		},
		'parcelaNN': {
			tipo: "numero",
			largo: 4
		},
		'parcelaTN': {
			tipo: "texto",
			largo: 3
		}

	},
	consultar: function(){
		var nomenclatura = {
			partido: this.gTex(['partidoN']),
			circunscripcion: this.gTex(['circunscripcionN']),
			seccion: this.gTex(['seccionN']),
			chacra: this.gTex(['chacraNN','chacraTN']),
			quinta: this.gTex(['quintaNN','quintaTN']),
			fraccion: this.gTex(['fraccionNN','fraccionTN']),
			manzana: this.gTex(['manzanaNN','manzanaTN']),
			parcela: this.gTex(['parcelaNN','parcelaTN'])
		};
		var self = this;
		var capa,nomencla;

		if(nomenclatura.partido.seteado){//Tiene Partido?
			if(nomenclatura.circunscripcion.seteado){//Tiene Circunscripcion?
				if(nomenclatura.seccion.seteado || nomenclatura.parcela.seteado){//Tiene Seccion?
					if(	nomenclatura.chacra.seteado ||
						nomenclatura.quinta.seteado ||
						nomenclatura.fraccion.seteado ||
						nomenclatura.manzana.seteado ||
						nomenclatura.parcela.seteado){
						if(nomenclatura.parcela.seteado){
							capa = "parcelas";
							this.nomenclatura =
								nomenclatura.partido.valor+
								nomenclatura.circunscripcion.valor+
								nomenclatura.seccion.valor+
								nomenclatura.chacra.valor+
								nomenclatura.quinta.valor+
								nomenclatura.fraccion.valor+
								nomenclatura.manzana.valor+
								nomenclatura.parcela.valor;
						}else{
							capa = "macizos";
							this.nomenclatura =
								nomenclatura.partido.valor+
								nomenclatura.circunscripcion.valor+
								nomenclatura.seccion.valor+
								nomenclatura.chacra.valor+
								nomenclatura.quinta.valor+
								nomenclatura.fraccion.valor+
								nomenclatura.manzana.valor;
						}
					}else{
						capa = "secciones";
						this.nomenclatura = nomenclatura.partido.valor+
											nomenclatura.circunscripcion.valor+
											nomenclatura.seccion.valor;
					}
				}else{
					capa = "circunscripciones";
					this.nomenclatura = nomenclatura.partido.valor+nomenclatura.circunscripcion.valor;
				}
			}else{
				capa = "partidos";
				this.nomenclatura = nomenclatura.partido.valor;
			}
		}else{
			Ext.MessageBox.alert('Error', 'Debe definir almenos el partido.');
			return false;
		}
		//console.log(capa,this.nomenclatura);
		this.win.disable();
		this.reqJsonP = new Request.JSONP({
			url: server+workspace+'/wfs',
			timeout: 7000,
			onTimeout: function(){
				//console.log('onTimeout',arguments);
				//Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
				self.win.enable();
			},
			data: {
				service: 'WFS',
				version: '1.0.0',
				request: 'GetFeature',
				typeName: capa,
				maxFeatures: '100',
				srsName: app.mapPanel.map.getProjection(),
				outputFormat: 'text/javascript',
				format_options: 'callback:callbackNomenclatura',
				filter: '<PropertyIsEqualTo> <PropertyName>nomencla</PropertyName> <Literal>'+this.nomenclatura+'</Literal> </PropertyIsEqualTo>',
			},
		}).send();
	},
	parseNomencla: function(a){
		var valores = ['#partidoN','#circunscripcionN','#seccionN','#chacraNN','#chacraTN','#quintaNN','#quintaTN','#fraccionNN','#fraccionTN','#manzanaNN','#manzanaTN','#parcelaNN','#parcelaTN'],
			i = 0;
		while (a.length > 0){
			var dom = this.dom.getElement(valores[i]);
			var largo = dom.getAttribute('largo').toInt();
			dom.value = a.substr(0,largo);
			a = a.substring(largo);
			i++;
		}
	},
	procesarRespuesta: function(response){
		this.reqJsonP.cancel();
		var respuesta = response;
		var self = this;
		//console.log('Respuesta',respuesta);
		self.win.enable();
		if(respuesta.features.length == 0){
			Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
		}else{
			respuesta.features.each(function(item){
				var feature = item;
				var punto,
					lineString = [];
				for (i in feature.geometry.coordinates[0][0]){
					punto = feature.geometry.coordinates[0][0][i];
					if(typeof punto == 'function') continue;
					punto = new OpenLayers.Geometry.Point(punto[0],punto[1]);
					lineString.push(punto);
				}

				var geometria = new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(lineString)]);


				if(self.vectorFeature){
					self.capa.removeFeatures([self.vectorFeature]);
					self.vectorFeature = false;
                }
				self.vectorFeature = new OpenLayers.Feature.Vector(geometria);
				self.capa.addFeatures([self.vectorFeature]);
				//self.parseNomencla(feature.properties.NOMENCLA);
				app.mapPanel.map.zoomToExtent(geometria.getBounds());
			})
		}
	}
});
