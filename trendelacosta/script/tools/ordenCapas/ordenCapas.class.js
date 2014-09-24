/**
 * Copyright (c) 2008-2011 The Open Planning Project
 *
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires plugins/Tool.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = LayerProperties
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: LayerProperties(config)
 *
 *    Plugin for showing the properties of a selected layer from the map.
 */
gxp.plugins.OrderLayer = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = gxp_layerproperties */
    ptype: "gxp_orderlayers",

    /** api: config[menuText]
     *  ``String``
     *  Text for layer properties menu item (i18n).
     */
    menuText: "Layer Properties",

    /** api: config[toolTip]
     *  ``String``
     *  Text for layer properties action tooltip (i18n).
     */
    toolTip: "Layer Properties",

    treeNodeUI: null,

    /** api: config[layerPanelConfig]
     *  ``Object`` Additional configuration options for the layer type specific
     *  properties panels, keyed by xtype, e.g.:
     *
     *  .. code-block:: javascript
     *
     *      layerPanelConfig: {
     *          "gxp_wmslayerpanel": {rasterStyling: true}
     *      }
     */

    constructor: function(config) {
        gxp.plugins.LayerTree.superclass.constructor.apply(this, arguments);

        if (!this.outputConfig) {
            this.outputConfig = {
                autoHeight: true
            };
        };

        if (!this.treeNodeUI) {
            this.treeNodeUI = Ext.extend(
                GeoExt.tree.LayerNodeUI,
                new GeoExt.tree.TreeNodeUIEventMixin()
            );
        };
    },

    /** api: method[addActions]
     */
    addActions: function() {
        var actions = gxp.plugins.OrderLayer.superclass.addActions.apply(this, [{
            menuText: this.menuText,
            iconCls: "ordenCapas",
            tooltip: this.toolTip,
            handler: function() {
                this.removeOutput();
                this.addOutput();
            },
            scope: this
        }]);
        return actions;
    },

    addOutput: function(config) {
    	var self = this;
        config = config || {};
        var record = this.target.selectedLayer;
        var origCfg = this.initialConfig.outputConfig || {};
        this.outputConfig.title = "Orden";
        this.outputConfig.shortTitle = "Orden";

        //TODO create generic gxp_layerpanel
        var panelConfig = this.layerOrderConfig;
        if (panelConfig && panelConfig[xtype]) {
            Ext.apply(config, panelConfig[xtype]);
        }

        var treeRoot = new GeoExt.tree.LayerContainer({
            text: 'Activas',
            iconCls: "gxp-folder",
            expanded: true,
            loader: new GeoExt.tree.LayerLoader({
                // baseAttrs: exclusive ?
                //     {checkedGroup: Ext.isString(exclusive) ? exclusive : group} :
                //     undefined,
                store: this.target.mapPanel.layers,
                filter: function(record) {
                	var layer = record.getLayer();
                    return (layer.visibility == true) && (layer.isBaseLayer == false) && (layer.displayInLayerSwitcher == true);
                },
                createNode: function(attr) {
                    self.configureLayerNode(this, attr);
                    return GeoExt.tree.LayerLoader.prototype.createNode.apply(this, arguments);
                }
            }),
            singleClickExpand: true,
            allowDrag: false,
            // listeners: {
            //     append: function(tree, node) {
            //         node.expand();
            //     }
            // }
        });

        return gxp.plugins.OrderLayer.superclass.addOutput.call(this, Ext.apply({
            xtype: "treepanel",
            plugins: [{
                ptype: "gx_treenodecomponent"
            }],
            root: treeRoot,
            rootVisible: false,
	           enableDD: true,
        }, config));
    },

    configureLayerNode: function(loader, attr) {
        attr.uiProvider = this.treeNodeUI;
        var layer = attr.layer;
        var store = attr.layerStore;
        if (layer && store) {
            var record = store.getAt(store.findBy(function(r) {
                return r.getLayer() === layer;
            }));
            if (record) {
                attr.qtip = record.get('abstract');
                if (!record.get("queryable")) {
                    attr.iconCls = "gxp-tree-rasterlayer-icon";
                }
                if (record.get("fixed")) {
                    attr.allowDrag = false;
                }
                attr.listeners = {
                    rendernode: function( tree, scope, node, index ) {
                        // if (record === this.target.selectedLayer) {
                        //     node.select();
                        // }
                        // this.target.on("layerselectionchange", function(rec) {
                        //     if (!this.selectionChanging && rec === record) {
                        //         node.select();
                        //     }
                        // }, this);
                        console.log('rendernode',arguments);
                    },
                    scope: this
                };
            }
        };
        var legendXType;
        // add a WMS legend to each node created
        if (OpenLayers.Layer.WMS && attr.layer instanceof OpenLayers.Layer.WMS) {
            legendXType = "gx_wmslegend";
        } else if (OpenLayers.Layer.Vector && attr.layer instanceof OpenLayers.Layer.Vector) {
            legendXType = "gx_vectorlegend";
        }
        attr.component = {
            xtype: "gx_opacityslider",
            ctCls: "sliderTransparencia",
            layer: attr.layer,
            aggressive: true,
            vertical: false,
            width: 100,
            plugins: new GeoExt.LayerOpacitySliderTip({
              template: "Transparencia: {opacity}%"
            })
        }
    }
});
Ext.preg(gxp.plugins.OrderLayer.prototype.ptype, gxp.plugins.OrderLayer);

gxp.plugins.OrderLayerPanel = Ext.extend(Ext.tree.TreePanel, {

});
Ext.reg('gxp_orderlayerpanel', gxp.plugins.OrderLayerPanel);
