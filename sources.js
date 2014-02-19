var sources = {
    ARBA: {
        url: "http://cartoservices.arba.gov.ar/geoserver/cartoservice/wms?",
        title: "cotas",
        ptype: "gxp_wmscsource"
    },
    IGN: {
		url: "http://192.168.12.133:8080/geoserver/ign/wms?",
        title: "Instituto Geográfico Nacional",
        ptype: "gxp_wmscsource"
    },
    Geodesia: {
		url: "http://192.168.12.133:8080/geoserver/Geodesia/wms?",
        title: "Geodesia",
        ptype: "gxp_wmscsource"
    },
	hidraulica: {
        url: "http://www.mosp.gba.gov.ar/wms_hidraulica/cgi-bin/wmsserv.exe",
        title: "Buenos Aires - Dccion. Hidraulica",
        ptype: "gxp_wmscsource"
    },
    urbasig: {
        url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/urbasig/wms?",
        title: "UrbaSig",
        ptype: "gxp_wmscsource"
    },
    ol: {
        ptype: "gxp_olsource"
    },
    bing: {
        ptype: "gxp_bingsource"
    },
    google: {
    	ptype: "gxp_googlesource"
    },
    osm:{
        ptype: "gxp_osmsource"
    },
    mapquest: {
    ptype: "gxp_mapquestsource"
}
}
