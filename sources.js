var sources = {
    Geodesia: {
        url: "http://192.168.0.107:8080/geoserver/Geodesia/wms?",
        title: "Geodesia",
        ptype: "gxp_wmscsource"
    },
    Arba: {
        url: "http://cartoservices.arba.gov.ar/geoserver/cartoservice/wms?",
        title: "Arba",
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
