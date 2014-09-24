var arbabc = {
		        source: "arba",
		        name: "macizos",
		        visibility: false,
		        title: "Macizos",
		        group: "geoserver"
		    }

var layers = [
        //CAPAS PREDEFINIDAS
        {
            source: "Geodesia",
            name: "red_ferroviaria",
            visibility: false,
            title: "Ferrocarril",
            group: "IGN"
        },
        //CAPAS
        {
            source: "Geodesia",
            name: "vuelos",
            visibility: false,
            title: "Vuelos",
            group: "Foto"
        },{
            source: "Geodesia",
            name: "grilla_100000",
            visibility: false,
            title: "Grilla al 100000",
            group: "IGN"
        },{
            source: "Geodesia",
            name: "grilla_50000",
            visibility: false,
            title: "Grilla al 50000",
            group: "IGN"
        },{
            source: "Geodesia",
            name: "grilla_25000",
            visibility: false,
            title: "Grilla al 25000",
            group: "IGN"
        },
        //CAPAS IGN
        {
            source: "Geodesia",
            name: "secundaria",
            visibility: false,
            title: "Red Secundaria",
            group: "IGN"
        },{
            source: "Geodesia",
            name: "rutas_nac",
            visibility: false,
            title: "Rutas Nacionales",
            group: "IGN"
        },{
            source: "IGN",
            name: "Rutas_Provinciales",
            visibility: false,
            title: "Rutas Provinciales",
            group: "IGN"
        },{
            source: "Geodesia",
            name: "ejidos_urbanos",
            visibility: false,
            title: "Ejidos Urbanos",
            group: "IGN"
        },{
            source: "Geodesia",
            name: "cuerpos_de_agua",
            visibility: false,
            title: "Cuerpos de Agua",
            group: "IGN"
        },{
            source: "Geodesia",
            name: "cursos_de_agua",
            visibility: false,
            title: "Cursos de Agua",
            group: "IGN"
        },{
            source: "Geodesia",
            name: "curvas_de_nivel",
            visibility: false,
            title: "Curvas de Nivel",
            group: "IGN"
        },
        //CAPAS TOPO
        {
            source: "Geodesia",
            name: "vinculaciones",
            visibility: false,
            title: "vinculaciones",
            group: "Topo"
        },{
            source: "Geodesia",
            name: "mensulas",
            visibility: false,
            title: "mensulas",
            group: "Topo"
        },{
            source: "Geodesia",
            name: "geoba",
            visibility: false,
            title: "Red Geoba",
            group: "Topo"
        },
	//CAPAS CARTO
        {
            source: "Geodesia",
            name: "gr_5000",
            visibility: false,
            title: "Cartas 5000",
            group: "Carto"
        },
	{
            source: "Geodesia",
            name: "gr_10000",
            visibility: false,
            title: "Cartas 10000",
            group: "Carto"
        },
	//CAPAS GEOSERVER (GEODIGIT)
	 {
            source: "Geodesia",
            name: "ParcelarioCompleto",
            visibility: true,
            title: "Parcelario",
            group: "Geoserver"
        },{
	    source: "Geodesia",
	    name: "Parcelario_Transparente",
	    visibility: false,
	    title: "Parcelario Transparente",
	    group: "Geoserver"
	},{
            source: "Arba",
            name: "Cotas",
            visibility: true,
            title: "Cotas",
            group: "Geoserver"
        },

	 //CAPAS TERRITORIAL
	{
            source: "Arba",
            name: "Grupo ARBA",
            visibility: false,
            title: "Catastro", 
            group: "Capa Territorial"
        },

        // CAPAS URBASIG
        {
            source: "urbasig",
            name: "usos_del_suelo",
            visibility: false,
            title: "Usos del Suelo",
            group: "urbasig"
        },{
            source: "urbasig",
            name: "urbanizaciones_cerradas",
            visibility: false,
            title: "Urbanizaciones Cerradas",
            group: "urbasig"
        },
        // CAPAS ESCUELAS
        {
            source: "mapaescolar",
            name: "escuelas",
            visibility: false,
            extended: false,
            title: "Escuelas",
            group: "mapaescolar"
        },
        // CAPAS HIDRAULICA
        {
            source: "hidraulica",
            name: "hidrografia",
            visibility: false,
            title: "Hidrografía",
            group: "hidraulica"
        },
        // CAPAS SALUD
        {
            source: "salud",
            name: "centros_de_salud",
            visibility: false,
            title: "Centros de Salud",
            group: "salud"
        },
        // CAPAS BASE
        {
            source: "google",
            name: "HYBRID",
            title: "Google Híbrido",
            group: "background"
        },{
            source: "google",
            name: "ROADMAP",
            title: "Google Callejero",
            group: "background"
        },{
            source: "google",
            name: "SATELLITE",
            title: "Google Satélite",
            group: "background"
        },{
            source: "google",
            name: "TERRAIN",
            title: "Google Físico",
            group: "background"
        },{
            source: "osm",
            name: "mapnik",
            title: "Open Street Map",
            selected: true,
            group: "background"
        },{
            source: "bing",
            name: "Aerial",
            title: "Bing Satélite",
            selected: false,
            group: "background"
        },{
            source: "bing",
            name: "Road",
            title: "Bing Callejero",
            selected: false,
            group: "background"
        },{
            source: "ol",
            group: "background",
            fixed: true,
            type: "OpenLayers.Layer",
            args: ["Sin capa base",
            {
                visibility: false
            }]
        },
        arbabc
]
