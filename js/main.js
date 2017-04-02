//работа чекбоксов
(function () {
    var count = 0;
    var ch = $('.checkbox');

    //подсчёт количества
    $(ch).on('click', function () {
        count = $('.checkbox:checked').length;
        $('.sum-checked__value').text(count);
    });

    //сброс
    $('.reset__link').on('click', function (e) {
        e.preventDefault();
        $(ch).each(function(){this.checked = false;});
        count = $('.checkbox:checked').length;
        $('.sum-checked__value').text(count);
    })
})();




(function () {
    console.log('1');
    var inputCount = $('.quantity');

    var popupInput = $('.popup-quantity');
    var onePricePopup = $('.popup-cost');
    var resultPopup = $('.popup-result');
    var topPopupInput = $(popupInput).position().top;
    var leftPopupInput = $(popupInput).position().left;

    
    var tr,
        tdInputText,
        tdResultText,
        tdPriceText,
        onePrise,
        num = 0,
        result,
        basketResult = 0,
        basketResultNDS = 0,
        basketInTotal = 0;

    //клик на инпут таблицы
    $(inputCount).on('click', function (e) {
        console.log('2');
        var $this = $(this);

        tr = $this.closest('.table-basket__row');
        tdInput = $($this);
        tdResult = tr.find('.result');
        tdPrice = tr.find('.col-cost');
        tdInputText = $($this).text();
        tdResultText = tr.find('.result').text();
        tdPriceText = tr.find('.col-cost').text();
        onePrise=parseInt(tdPriceText.substring(0, tdPriceText.length -2));
        num = parseInt(tdInputText);


        //заполняем попап данными
        $(onePricePopup).text(tdPriceText);
        $(popupInput).text(tdInputText);
        $(resultPopup).text(tdResultText);

        //плюс минус
        $('.popup__plus').on('click', function () {

            console.log(typeof num);
            num = num+1;
            console.log(num);
            $(popupInput).text(num);
            result = onePrise * num;
            $(resultPopup).text(result + ' Р');
            console.log(result);
        });
        $('.popup__min').on('click', function () {

            if(num<=1){
                num = 1;
            }
            else {
                num = num-1;
                console.log(num);
                $(popupInput).text(num);
                result = onePrise * num;
                $(resultPopup).text(result + ' Р');
            }
        });


        //позиционирование попапа
        var topInputCount = $this.offset().top;
        var leftInputCount = $this.offset().left;

        var topPosPopup=topInputCount - topPopupInput;
        var leftPosPopup=leftInputCount - leftPopupInput;

        $('.popup').css({
            'display':'block',
            'top': topPosPopup,
            'left': leftPosPopup
        });
        $('.popup-close').css({
            'display':'block'
        });
    });

    //сохранить
    $('.popup__save').on('click', function (e) {
        e.preventDefault();
        console.log('save');

        basketResult = 0;
        basketResultNDS = 0;
        basketInTotal = 0;


        $('.popup, .popup-close').css({
            'display': 'none'
        });

        $(tdInput).text($('.popup-quantity').text());
        $(tdResult).text(result + ' P');

        allResult = $('.result');

        // console.log(allResult);
        // console.log('allResult');
        // console.log(allResult);

        var arrayResult = [];
        for(var key in allResult){
            arrayResult[key] = allResult[key];
        }


        $(arrayResult).each(function (i) {
            basketResult += parseInt($(arrayResult[i]).text().substring(0, $(arrayResult[i]).text().length-2));
        });

        basketResultNDS = Math.ceil(basketResult * 0.18);
        basketInTotal = Math.ceil(basketResult + basketResultNDS);

        $('.basket-result__cost').text(basketResult + ' P');
        $('.basket-result__cost-nds').text(basketResultNDS + ' P');
        $('.in-total__num').text(basketInTotal + ' P');
        // console.log('array');
        // console.log(basketResult);
        // console.log(basketResultNDS);
        // console.log(basketInTotal);
    });
    //отменить
    $('.popup__cancel, .popup-close').on('click', function (e) {
        e.preventDefault();
        console.log('save');
        $('.popup, .popup-close').css({
            'display': 'none'
        });
    });

})();



