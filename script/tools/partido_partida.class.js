var server = "http://192.168.12.133:8080/";//"http://127.0.0.1:8080/";//http://hyperdvba:8080/";
var masizos = "masizos",
	parcelas = "parcelas";
var workspace = "Geodesia";

var PartidoPartida = new Class({
	Implements: Events,
	win: false,
	dom: false,
	ext: false,
	initialize: function(ext){
		this.ext = ext;
		this.dom = $('nomenclatura_par');
		this.clickEnMapa();
		this.dom.getElement('button').addEvent('click',this.consultar.bind(this));
		window.callbackPartidoPartida = this.procesarRespuesta.bind(this);
		this.capa = new OpenLayers.Layer.Vector("Consulta Partido Partida", {
			group: "util"
		});
	},
	mostrar: function(){
		var self = this;
		if(!this.win){
			this.win = new Ext.Window({
				title		: 'Busqueda por Partido Partida',
				width		: 150,
				height		: 360,
				closeAction	: 'hide',
				contentEl	: this.dom,
				autoScroll	: true,
				onHide: function(){
					//self.clickControl.deactivate();
					app.mapPanel.map.removeLayer(self.capa);
				},
				onShow: function(){
					//self.clickControl.activate();
					app.mapPanel.map.addLayer(self.capa);
				}
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
					url: server+'geoserver/'+workspace+'/wfs',
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
						console.log('onTimeout',arguments);
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
		var dom = this.dom.getElement(id);
		var respuesta = {
			seteado: true
		};
		if(dom.getAttribute('tipo') == "numero"){
			if(dom.value.toInt() == 0 || isNaN(dom.value.toInt())){
				respuesta.seteado = false;
			}
		}else{
			if(dom.value.trim().length == 0){
				respuesta.seteado = false;
			}
		}
		respuesta.valor = this.completar(dom.value,dom.getAttribute('largo').toInt());
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
	consultar: function(){
		var nomenclatura = {
			partido: $('partidoPP').value.toInt(),
			partida: $('partidaPP').value.toInt(),
		};
		var self = this;
		
			
		//console.log(capa,this.nomenclatura);
		this.win.disable();
		var filtro = '<And>'+
							'<PropertyIsEqualTo>'+
								'<PropertyName>partida</PropertyName>'+
								'<Literal>'+nomenclatura.partida+'</Literal>'+
							'</PropertyIsEqualTo>'+
							'<PropertyIsEqualTo>'+
								'<PropertyName>partido</PropertyName>'+
								'<Literal>'+nomenclatura.partido+'</Literal>'+
							'</PropertyIsEqualTo>'+
						'</And>';
		console.log('Filtro',filtro);
		this.reqJsonP = new Request.JSONP({
			url: server+'geoserver/'+workspace+'/wfs',
			timeout: 7000,
			onTimeout: function(){
				console.log('onTimeout',arguments);
				//Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
				self.win.enable();
			},
			data: {
				service: 'WFS',
				version: '1.0.0',
				request: 'GetFeature',
				typeName: "parcelas",
				maxFeatures: '1000',
				srsName: app.mapPanel.map.getProjection(),
				outputFormat: 'text/javascript',
				format_options: 'callback:callbackPartidoPartida',
				filter: filtro,
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
		console.log('Respuesta',respuesta);
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
