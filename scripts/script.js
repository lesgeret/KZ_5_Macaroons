'use strict'


// modal menu
document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open')
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

// кнопка ВЫБРАТЬ МАКАРУН - ПЛАВНЫЙ СКРОЛЛ
$('#choose_macaroon').on('click', function () {
    $('#products-header')[0].scrollIntoView({behavior: 'smooth'});
})

// работа с формами:
let product = $('#product');
let name = $('#name');
let phone = $('#phone');

// кнопка ЗАКАЗАТЬ вставляет название макаруна в ИнПУТ

let addToCardButton = $('.product-button');
addToCardButton.click((e) => {
    product.val($(e.target).parents('.product-grid-item').find('.product-name').text());
    $('.order')[0].scrollIntoView({behavior: 'smooth'});
    product.next().hide();
    product.css('borderColor', 'rgb(118, 12, 34)');
    product.css('marginBottom', '15px');
})

// маска на телефон
phone.inputmask({"mask": "+375 (99)999-99-99"});

// hide form - прячет форму, показывает лоадер и сообщение
let hideForm = function () {
    let loaderFlash = function () {
        let orderLoader = $('#order_loader');
        orderLoader.show();
        setTimeout(() => {
            orderLoader.hide()
        }, 2000)
    }
    $('#order_form').hide();
    loaderFlash();
    setTimeout(() => {
        $('#order_success').css('display', 'block')
    }, 2000);
}

// validation

/* функция убирает предупреждение при начале ввода в инпут */
let orderInput = $('.order-input');
orderInput.on('input', function () {
    let currentInput = $(this);
    currentInput.next().hide();
    currentInput.css('borderColor', 'rgb(118, 12, 34)');
    currentInput.css('marginBottom', '15px');
})


/* основная функция SUBMIT  */
$('#submit').click(function () {

    let hasError = false;

    $('.input-alert').hide();

    if (!product.val()) {
        product.next().show();
        product.css('borderColor', 'red');
        product.css('marginBottom', '2px');
        hasError = true;
    }
    if (!name.val()) {
        name.next().show();
        name.css('borderColor', 'red');
        name.css('marginBottom', '2px');
        hasError = true;
    }
    if (!phone.val()) {
        phone.next().show();
        phone.css('borderColor', 'red');
        phone.css('marginBottom', '2px');
        hasError = true;
    }
    if (!hasError) {
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {product: product.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                if (msg.success) {
                    hideForm();
                } else {
                    alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ")
                }
            });
    }
});
