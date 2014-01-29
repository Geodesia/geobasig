var app;
var permalink;
OpenLayers.ProxyHost = "prox/prox.php?url=";
Ext.onReady(function() {	
    GeoExt.Lang.set("es");    
    app = new gxp.Viewer({    	
    	proxy: "prox/prox.php?url=",
        portalConfig: {
            layout: "border",
            border: false,
            items: [{
            	id: "northpanel",
            	xtype: "container",
            	region: "north",
            	border: false,
            	height: 56,
            	items: [{ html: '<div> <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f4822c">  <tr> <td width="20%" align="left"> <img title="Logo Buenos Aires Provincia" src="app/img/logobsas.png" alt="Buenos Aires Provincia"> </td><td align="center" width="60%"> <img title="Logo Geodesia" src="app/img/logogeodesia.png" alt="Consejo Provincial de Emergencia"> </td> <td align="left" width="20%"> <img title="Logo Ministerio de Infraestructura" src="app/img/logomin.png" alt="Ministerio de Infraestructura"> </td></tr>  </table> </div>'}]
            },{
                id: "centerpanel",
                xtype: "tabpanel",
                region: "center",
                activeTab: 0,                 
                items: ["mymap",
                        {
                			title: "Ayudas",
                			autoScroll: true,
                			html: "<iframe src='ayuda.html'>"
                        }
                ]
            },{
                id: "westcontainer",
                region: "west",
                xtype: "gxp_crumbpanel",                
                width: 300,                
                collapsible: true,
                collapseMode: "mini",
                hideCollapseTool: true,
                split: true,
                border: true                
            }]
        },
        // configuration of all tool plugins for this application
        tools: [{
            ptype: "gxp_layermanager",
            outputConfig: {
                id: "tree",
                title: "Capas",
                autoScroll: true,
                tbar: []
            },            
            outputTarget: "westcontainer",            
            groups: groups,
        },{
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar",
            outputTarget: "westcontainer",            
            upload: true
        },{
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        },{
            ptype: "gxp_zoomtolayerextent",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        },{
            ptype: "gxp_layerproperties",
            outputTarget: "westcontainer",            
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        },{
            ptype: "gxp_zoomtoextent",
            actionTarget: "map.tbar",
            extent: new OpenLayers.Bounds(-7175626.9266567,-5141723.905941,-6304445.4046767,-3812835.624341)
        },{
            ptype: "gxp_zoom",
            showZoomBoxAction: true,
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            ptype: "gxp_navigationhistory",
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            ptype: "gxp_wmsgetfeatureinfo",
            outputConfig: {
                width: 300,                
                draggable:true
            },
            format: "html",
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            ptype: "gxp_measure",
            outputConfig: {
                width: 400,
                height: "auto"
            },
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            ptype: "gxp_googlegeocoder",
            outputTarget: "map.tbar",
            outputConfig: {
                emptyText: "Buscar un lugar ..."
            }
        },{
            xtype: "gxp_scaleoverlay",
            actionTarget: "map.tbar"
        },{
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Imprimir',
                iconCls: "gxp-icon-print",
                handler: function() {
                	window.print();
                }
            }]
        },{
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Permalink',
                iconCls: "gxp-icon-permalink",
                handler: function() {
                    Ext.MessageBox.show({
                        title: 'Permalink', 
                        msg: 'Seleccione y copie el texto con Ctrl+C',
                        value: permalink,
                        multiline: true,
                        width: 500,
                        icon: Ext.MessageBox.INFO
                    });
                }
            }]
        }],
        
        // layer sources
        defaultSourceType: "gxp_wmssource",
        sources: sources,

        // map and layers
        map: {
            id: "mymap",
            title: "Mapa",
            projection: "EPSG:900913",
            displayProjection: "EPSG: 4326",
            units: "m",                        
            restrictedExtent: [-7175626.9266567,-5141723.905941,-6304445.4046767,-3812835.624341],
            center: [-6768040.2321373,-4401345.9230043],
            zoom: 6,            
            numZoomLevels: 23,
            stateId: "map",
            prettyStateKeys: true,            
            layers: layers,
            tiled: false,
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        }
    });
    app.mapPanel.map.events.register("mousemove", app.mapPanel.map, function (e) {
        position = app.mapPanel.map.getLonLatFromViewPortPx(e.xy);
        Ext.getCmp('position').update("<label>Latitud: " + position.lat + "</label><br/><label>Longitud: " + position.lon + "</label>");
    });
});
