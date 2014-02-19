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
            source: "geoserver",
            name: "ferrocarril",
            visibility: false,
            title: "Ferrocarril",
            group: "geoserver"
        },        
        // CAPAS ARBA
        {                
            source: "ARBA",
            name: "cotas R",
            visibility: false,
            title: "cotas",
            group: "Geoserver"
        },        {                
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
        },//CAPAS IGN
        {                
            source: "IGN",
            name: "Secundarias",
            visibility: false,
            title: "Red Secundaria",
            group: "IGN"
        },{                
            source: "IGN",
            name: "Rutas_Nacionales",
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
            source: "IGN",
            name: "Red_Ferroviaria",
            visibility: false,
            title: "Red Ferroviaria",
            group: "IGN"
        },{                
            source: "IGN",
            name: "Ejidos_Urbanos",
            visibility: false,
            title: "Ejidos Urbanos",
            group: "IGN"
        },{                
            source: "IGN",
            name: "Cuerpos_De_Agua",
            visibility: false,
            title: "Cuerpos de Agua",
            group: "IGN"
        },{                
            source: "IGN",
            name: "Cursos_De_Agua",
            visibility: false,
            title: "Cursos de Agua",
            group: "IGN"
        },{                
            source: "IGN",
            name: "Curvas_De_Nivel",
            visibility: false,
            title: "Curvas de Nivel",
            group: "IGN"
        },{                
            source: "IGN",
            name: "Red_Vial",
            visibility: false,
            title: "Red Vial",
            group: "IGN"
        },{                
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
        },{                
            source: "Geodesia",
            name: "Provincia",
            visibility: true,
            title: "Provincia",
            group: "Geoserver"
        },{                
            source: "Geodesia",
            name: "circunscripcion",
            visibility: false,
            title: "Circunscripcion",
            group: "Geoserver"
        },{                
            source: "Geodesia",
            name: "seccion",
            visibility: false,
            title: "Sección",
            group: "Geoserver"
        },{                
            source: "Geodesia",
            name: "macizos",
            visibility: false,
            title: "Macizos",
            group: "Geoserver"
        },{                
            source: "Geodesia",
            name: "parcelas",
            visibility: false,
            title: "Parcelas",
            group: "Geoserver"
        },{                
            source: "Geodesia",
            name: "subparcelas",
            visibility: false,
            title: "Subparcelas",
            group: "Geoserver"
        },{                
            source: "Geodesia",
            name: "calles",
            visibility: false,
            title: "Calles",
            group: "Geoserver"
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
