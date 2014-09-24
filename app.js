var app;
var permalink;


var nomenclatura = new Nomenclatura(),
    partido_partida = new PartidoPartida(),
    numero_plano = new NumeroPlano();

OpenLayers.ProxyHost = "./servicio/proxy?url=";
Ext.onReady(function() {
    GeoExt.Lang.set("es");
    app = new gxp.Viewer({
    	//proxy: "prox/prox.php?url=",
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
                        },
			{
                                        title: "Acerca de",
                                        autoScroll: true,
                                        html: "<iframe src='acerca.html'>"
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
        },{
            xtype: 'tbbutton',
            actions: [{
                xtype: 'tbbutton',
                text: 'Busqueda',
                iconCls: 'gxp-icon-find',
                menu: {
                    items:[{
                        text: 'Por Partido-Partida',
                        xtype: 'menuitem',
                        handler: function() {
                            window.partido_partida.mostrar();
                        }
                    },{
                        text: 'Por Nomenclatura',
                        xtype: 'menuitem',
                        handler: function() {
                            window.nomenclatura.mostrar();
                        }
                    },{
                        text: 'Por Numero de Plano',
                        xtype: 'menuitem',
                        handler: function() {
                            window.numero_plano.mostrar();
                        }
                    }]

                }
            }]
        },{
            ptype: "gxp_orderlayers",
            outputTarget: "westcontainer",
            actionTarget: "tree.tbar"
        },{
            ptype: "busqueda_planos_catastro",
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Entrar',
                iconCls: "gxp-icon-print",
                handler: function() {
                  app.authenticate();
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
        },
    /** private: method[authenticate]
     * Show the login dialog for the user to login.
     */
    authenticate: function() {
        var panel = new Ext.FormPanel({
            url: "/servicio/login",
            frame: true,
            labelWidth: 60,
            defaultType: "textfield",
            errorReader: {
                read: function(response) {
                    var success = false;
                    var records = [];
                    if (response.status === 200) {
                        success = true;
                    } else {
                        records = [
                            {data: {id: "username", msg: this.loginErrorText}},
                            {data: {id: "password", msg: this.loginErrorText}}
                        ];
                    }
                    return {
                        success: success,
                        records: records
                    };
                }
            },
            items: [{
                fieldLabel: "Usuario",
                name: "username",
                width: 137,
                allowBlank: false,
                listeners: {
                    render: function() {
                        this.focus(true, 100);
                    }
                }
            }, {
                fieldLabel: "Contraseña",
                name: "password",
                width: 137,
                inputType: "password",
                allowBlank: false
            }],
            buttons: [{
                text: "Entrar",
                formBind: true,
                handler: submitLogin,
                scope: this
            }],
            keys: [{
                key: [Ext.EventObject.ENTER],
                handler: submitLogin,
                scope: this
            }]
        });

        function submitLogin() {
            panel.buttons[0].disable();
            panel.getForm().submit({
                success: function(form, action) {
                    // Ext.getCmp('paneltbar').items.each(function(tool) {
                    //     if (tool.needsAuthorization === true) {
                    //         tool.enable();
                    //     }
                    // });
                    window.auth = true;
                    var user = form.findField('username').getValue();
                    this.setCookieValue(this.cookieParamName, user);
                    this.setAuthorizedRoles(["ROLE_ADMINISTRATOR"]);
                    this.showLogout(user);
                    win.un("beforedestroy", this.cancelAuthentication, this);
                    win.close();
                },
                failure: function(form, action) {
                    window.auth = false;
                    this.authorizedRoles = [];
                    panel.buttons[0].enable();
                    form.markInvalid({
                        "username": this.loginErrorText,
                        "password": this.loginErrorText
                    });
                },
                scope: this
            });
        }

        var win = new Ext.Window({
            title: this.loginText,
            layout: "fit",
            width: 235,
            height: 130,
            plain: true,
            border: false,
            modal: true,
            items: [panel],
            listeners: {
                beforedestroy: this.cancelAuthentication,
                scope: this
            }
        });
        win.show();
    },

    });

    nomenclatura.init(this);
    partido_partida.init(this);
    numero_plano.init(this);

});
