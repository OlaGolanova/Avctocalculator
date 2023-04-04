'use strict';
//Анимация при загрузке странцы
window.addEventListener('DOMContentLoaded', () => {
    animation();

});
function animation(){
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {

        const tlTitle = gsap.timeline({});

        tlTitle.from('.form_items', {
            xPercent: -200,
            duration: 1, 
        })
        tlTitle.from('.form_img', {
            xPercent: 200,
            duration: 1
        }, '<',)

    });

    
    mm.add("(max-width: 1024px)", () => {

        const tlTitle = gsap.timeline({});

        tlTitle.from('.form_items', {
            xPercent: -200,
            duration: 1, 
        })
        tlTitle.from('.form_img', {
            xPercent: 200,
            duration: 1
        })

    });


}


//Создаю массивы объектов для каждой марки авто
const reno = [
    {name: 'Reno Sandero', firstPrice: '1200', img: 'img/RenoSandero.jpeg' },
    {name: 'Reno Logan', firstPrice: '1250', img: 'img/RenoLogan.jpeg' },
    {name: 'Reno Duster', firstPrice: '1900', img: 'img/RenoDuster.jpeg' },
    {name: 'Reno Kaptur', firstPrice: '2350', img: 'img/RenoKaptur.jpeg' },
];

const opel = [
    {name: 'Opel Crossland', firstPrice: '2850', img: 'img/OpelCrossland.jpeg' },
    {name: 'Opel Grandland', firstPrice: '2150', img: 'img/OpelGrandland.jpeg' },
    {name: 'Opel Vivaro', firstPrice: '3300', img: 'img/OpelVivaro.jpeg' },
    {name: 'Opel ComboLife', firstPrice: '2190', img: 'img/OpelComboLife.jpeg' },
];

const mazda = [
    {name: 'Mazda 6', firstPrice: '2560', img: 'img/Mazda6.jpeg' },
    {name: 'Mazda CX4', firstPrice: '2190', img: 'img/MazdaCX4.jpeg' },
    {name: 'Mazda CX5', firstPrice: '2600', img: 'img/MazdaCX5.jpeg' },
    {name: 'Mazda CX9', firstPrice: '4550', img: 'img/MazdaCX9.jpeg' },
];

const jaguar = [
    {name: 'Jaguar FPace', firstPrice: '4700', img: 'img/jaguarFPace.jpeg' },
    {name: 'Jaguar EPace', firstPrice: '3700', img: 'img/jaguarEPace.jpeg' },
    {name: 'Jaguar IPace', firstPrice: '8800', img: 'img/jaguarIPace.jpeg' },
    {name: 'Jaguar XF', firstPrice: '4600', img: 'img/jaguarXF.jpeg' },
];



//Создаю массивы цен, фото и названия марок авто
const arrFirstPriceReno = reno.map(item => item.firstPrice);
const arrFirstPriceOpel = opel.map(item => item.firstPrice);
const arrFirstPriceMazda = mazda.map(item => item.firstPrice);
const arrFirstPriceJaguar = jaguar.map(item => item.firstPrice); 

const arrPrices = [arrFirstPriceReno, arrFirstPriceOpel, arrFirstPriceMazda, arrFirstPriceJaguar]; //массив массивов цен авто

const arrImgReno = reno.map(item => item.img);
const arrImgOpel = opel.map(item => item.img);
const arrImgMazda = mazda.map(item => item.img);
const arrImgJaguar = jaguar.map(item => item.img); 

const arrImges = [arrImgReno, arrImgOpel, arrImgMazda, arrImgJaguar]; //Массив массивов фото авто

const arrNameReno = reno.map(item => item.name);
const arrNameOpel = opel.map(item => item.name);
const arrNameMazda = mazda.map(item => item.name);
const arrNameJaguar = jaguar.map(item => item.name); 

const arrNames = [arrNameReno, arrNameOpel, arrNameMazda, arrNameJaguar]; //Массив массивов имен авто



//Задаю переменные
const selectAvtoModel = document.form.elements.avto; // коллекция моделей в selectAvto-- Рeно, Опель, Мазда, Ягуар-это options у select
const avtoModelOptions = document.querySelectorAll('.avto');

const selectsAvtoModels = document.querySelectorAll('.selectsAvtoModels'); // коллекция самих селектов Рeно, Опель, Мазда, Ягуар


const optionsModelReno = document.querySelectorAll('.option_modelReno');
const optionsModelOpel = document.querySelectorAll('.option_modelOpel');
const optionsModelMazda = document.querySelectorAll('.option_modelMazda');
const optionsModelJaguar = document.querySelectorAll('.option_modelJaguar');

const arrOptions = [optionsModelReno, optionsModelOpel, optionsModelMazda, optionsModelJaguar]; //Массив массивов имен авто

const wrapOwners = document.querySelector('.wrap_owners');
const checkNew = document.getElementById('new');
const checkUsed = document.getElementById('used');
const checkUsed12 = document.getElementById('one');
const checkUsed34 = document.getElementById('three');

const owners = document.querySelectorAll('.owners');

const fuel = document.form.elements.fuel;

const checkPetrol = document.getElementById('petrol');
const checkDiesel = document.getElementById('diesel');
const checkGas = document.getElementById('gas');
const checkElectricity = document.getElementById('electricity');
const electricityLabel = document.getElementById('electricityLabel'); 

const engineCapacity = document.getElementById('engineCapacity');

const paymentMethod = document.form.elements.paymentMethod;

const checCard = document.getElementById('card');
const checkCash = document.getElementById('cash');
const checkCheck = document.getElementById('check');

const buttonPrice = document.getElementById('btn');
let resultPrice = document.querySelector('.resultPrice');

const imgAvto = document.getElementById('img');
const errorDiv = document.querySelector('.errorsInfo');
const errorDiv2 = document.querySelector('.errorsInfo2');

let newPrice,
    priceUsed,
    priceFuel,
    priceEngine,
    pricePayment;

let nameAvto;

// В объект записывается результат сбора данных true/false, в случае не полного сбора информации выдается сообщение об ошибке
const success = {
    selectModel: false,
    used: false,
    fuel: false,
    engine: false,
    payment: false
};


//При нажатии на select выбора марки авто, срабатывает функция выбирающая нужную модель авто
selectAvtoModel.addEventListener('input', () =>  {
    imgAvto.classList.remove('img_transform');
    resultPrice.textContent  = '';
    addClassListHidden();

        for(let i = 0; i < avtoModelOptions.length; i++) {
            if(avtoModelOptions[i].selected) {
                selectsAvtoModels[i].classList.remove('hidden');
                choosePriceImgNameAvto(i);
            }
        }  
    });


//Функция устанавливает первоначльную стоимость авто, выбирает фото и название выбранного Авто. Работает с массивами цен, фото, имен
function choosePriceImgNameAvto(i) {
    selectsAvtoModels.forEach(function(el){

        el.addEventListener('input', () => {
        
                for (let j = 0; j < arrOptions[i].length; j++){
                    if (arrOptions[i][j].selected) {
                
                    // if (imgAvto.classList.contains('img_transform')) {
                    //     imgAvto.classList.remove('img_transform');
                    // } else {
                    //     imgAvto.src = arrImges[i][j];
                    //     imgAvto.classList.add('img_transform');
                    // }

                    imgAvto.src = arrImges[i][j];
                    newPrice = arrPrices[i][j];         
                    nameAvto = arrNames[i][j];
                    success.selectModel = true;
                    resultPrice.textContent  = '';
                
                        // setTimeout(() => {
                        //     imgAvto.src = arrImges[i][j];
                        //     imgAvto.classList.add('img_transform'); 
                        // }, 1000)
                
                    }
                }
            });
    });    
}

//Функция добавляет ко всем selects выбора  модели Авто класс 'hidden', тем самым делая их невидимыми
function addClassListHidden() {
    for ( let i = 0; i < selectsAvtoModels.length; i++) {
        selectsAvtoModels[i].classList.add('hidden');
    }
};


checkNew.addEventListener('input', () => {
        wrapOwners.classList.add('hidden');
        success.used = true;

});

checkUsed.addEventListener('input', () => {
    wrapOwners.classList.remove('hidden');
});

// Функция определяет цену в зависимости от количества владельцев авто
function chooseUsed() {
    if(checkNew.checked){
        priceUsed = newPrice;
        success.used = true;

    } else if (checkUsed.checked && checkUsed12.checked) {
        priceUsed = newPrice * 0.85;
        success.used = true;

    } else if (checkUsed.checked == true && checkUsed34.checked == true) {
        priceUsed = newPrice * 0.7;
        success.used = true;
    }
}
owners.forEach(function(event){
        event.addEventListener('input', chooseUsed);
        
    });


// Функция определяет цену в зависимости от топлива
function chooseFuel() {

    if (checkPetrol.checked){
        priceFuel = priceUsed;
        success.fuel = true;

    } else if (checkDiesel.checked) {
        priceFuel = priceUsed * 1.1;
        success.fuel = true;

    } else if (checkGas.checked) {
        priceFuel = priceUsed * 1.15;
        success.fuel = true;

    } else if (checkElectricity.checked){
        priceFuel = priceUsed * 1.3;
        success.fuel = true;

    }
}  

fuel.forEach(function(event){
        event.addEventListener('input', chooseFuel);
        
    });



// Определяем цену в зависимости от объема двигателя, input проверяется на коректность вводимых данных патерном, в случае ошибки выдает сообщение
engineCapacity.addEventListener('change', () =>  {
    let regExp = /[1-3]\.[0-5]/; // Регулярное выражение для ввода значения в формате 2 чисел через точку 1.1-3.5
   
    if (regExp.test(engineCapacity.value) == true) {
        priceEngine = +priceFuel + (priceFuel * (+engineCapacity.value / 10));
        success.engine = true;
        errorDiv.innerHTML = '';

    } else {
        engineCapacity.value = "";
        errorDiv.innerHTML = 'Неверный формат ввода данных';
    }
});


paymentMethod.forEach(function(event){
    event.addEventListener('input', choosePayment);
    
});

//Функция определяющая стоимость авто в зависимости от способа оплаты. 

function choosePayment() {
    if (checCard.checked) {
        pricePayment = priceEngine;
        success.payment = true;

    } else if (checkCash.checked) {
        pricePayment = priceEngine * 1.1;
        success.payment = true;

    } else if (checkCheck.checked) {
        pricePayment = priceEngine * 1.3;
        success.payment = true;
    }
}

// Кнопка Рассчитать стоимость, при нажатии очищается форма, значения в переменной success становятся false

buttonPrice.addEventListener('click', function(event){
    event.preventDefault();

    if (success.selectModel == true && success.used == true && success.fuel == true &&  success.engine == true && success.payment == true) {
        let totalPrice = +pricePayment.toFixed(1) * 1000 + ''; 
     
        const parse = (s)=>[...s.replace(/[^0-9]/g,"")].reduce((a,c,i,l)=>a+=c+((l.length-i)%3==1?" ":"")||a,""); // сумма авто преобразуется в вид с пробелами 1_111_111
        resultPrice.innerHTML = `${nameAvto} <br> ${parse(totalPrice)}  рублей <hr>  <br>Прекрасный выбор)`;

        errorDiv2.innerHTML = '';
     }
    else {   
        errorDiv2.innerHTML = 'Сейчас введены не все данные. <br> Попробуйте еще раз!';
        resultPrice.innerHTML = '';
        imgAvto.src = 'img/avtoPicture.jpg';
    }

    addClassListHidden();

    success.selectModel = false;
    success.used = false;
    success.fuel = false;
    success.engine = false;
    success.payment = false;

    form.reset();
});
