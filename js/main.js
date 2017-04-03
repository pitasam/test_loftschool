//работа чекбоксов
(function () {
    var count = 0;
    var ch = $('.checkbox');
    function setCount() {
        //подсчет количества
        count = $('.checkbox:checked').length;
        $('.sum-checked__value').text(count);
    }

    //подсчёт количества
    ch.on('click', function () {
       setCount();
    });

    //сброс
    $('.reset__link').on('click', function (e) {
        e.preventDefault();
        ch.each(function(){this.checked = false;});

        setCount();//подсчёт количества

        $('.quantity').each(function () {
            $( this ).text(0);
        });

        mult();
        countInTotal();

    })
})();

//подсчёт итога
function countInTotal() {
    var
        basketResult = 0,
        basketResultNDS = 0,
        basketInTotal = 0,
        allResult = $('.result');

    console.log('allResult');
    console.log(allResult);


    var arrayResult = [];
    for(var key in allResult){
        arrayResult[key] = allResult[key];
    }

    console.log('arrayResult');
    console.log(arrayResult);

    $(arrayResult).each(function (i) {
        basketResult += parseInt($(arrayResult[i]).text().substring(0, $(arrayResult[i]).text().length-2));
        console.log('array basketResult');
        console.log(basketResult);
    });

    basketResultNDS = Math.ceil(basketResult * 0.18);
    basketInTotal = Math.ceil(basketResult + basketResultNDS);

    $('.basket-result__cost').text(basketResult + ' P');
    $('.basket-result__cost-nds').text(basketResultNDS + ' P');
    $('.in-total__num').text(basketInTotal + ' P');
    console.log('basketResult');
    console.log(basketResult);
    console.log('basketResultNDS');
    console.log(basketResultNDS);
    console.log('basketInTotal');
    console.log(basketInTotal);

}
countInTotal();

function mult() {
    console.log('mult');
    var quantitiesInput = $('.quantity');
    var arrayQuantity = [];
    for(var key in quantitiesInput){
        arrayQuantity[key] = quantitiesInput[key];
    }

    $(arrayQuantity).each(function (i) {
        console.log(i);
        console.log(arrayQuantity[i]);
        var resInput = $('.result')[i];
        quantitiesInput = $('.quantity')[i];

        var quantitiesInputText = $(quantitiesInput).text();
        var quantities = parseInt(quantitiesInputText);

        var onePriceInput = $('.cost')[i];
        var onePriceInputText = $(onePriceInput).text();
        console.log($(resInput).text());
        console.log($(onePriceInput).text());
        var onePrice = parseInt(onePriceInputText.substring(0, onePriceInputText.length -2));
        var res = onePrice * quantities;



        console.log('onePrice');
        console.log(onePrice);
        console.log('quantities');
        console.log(quantities);
        console.log('res');
        console.log(res);

        $(resInput).text(res + ' P');


    })
}

(function () {
    console.log('1');
    var inputCount = $('.quantity');

    var popupInput = $('.popup-quantity');
    var onePricePopup = $('.popup-cost');
    var resultPopup = $('.popup-result');

    //для позиционирования
    var topPopupInput = $(popupInput).position().top;
    var leftPopupInput = $(popupInput).position().left;

    
    var tr,
        tdInputText,
        tdResultText,
        tdPriceText,
        onePrise,
        num = 0,
        result;


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

        //изменение положения попапа при изменении размеров окна
        $(window).resize(function () {
            var topInputCount = $this.offset().top;
            var leftInputCount = $this.offset().left;

            var topPosPopup=topInputCount - topPopupInput;
            var leftPosPopup=leftInputCount - leftPopupInput;

            $('.popup').css({
                'top': topPosPopup,
                'left': leftPosPopup
            });

        })
    });

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

    //сохранить
    $('.popup__save').on('click', function (e) {
        e.preventDefault();
        console.log('save');



        $('.popup, .popup-close').css({
            'display': 'none'
        });

        $(tdInput).text($('.popup-quantity').text());
        $(tdResult).text(result + ' P');



        // console.log(allResult);
        // console.log('allResult');
        // console.log(allResult);



        // $(arrayResult).each(function (i) {
        //     basketResult += parseInt($(arrayResult[i]).text().substring(0, $(arrayResult[i]).text().length-2));
        // });
        countInTotal();


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

//вкл/выкл чекбокс
(function () {
    var checkboxes=$('.checkbox');
    checkboxes.on('click' ,function() {
        var $this = $(this),
            tr = $this.closest('.table-basket__row'),
            input = tr.find('.quantity'),
            checked = $this.prop('checked');

        if(checked == true){
            console.log('if');
            $(input).text(1);
            countInTotal();

            mult();
            countInTotal();

        } else {
            console.log('else');
            $(input).text(0);
            countInTotal();

            mult();
            countInTotal();
        }

    });
})();

//подсвечивание меню
(function () {
    $('.menu__link').on('click', function (e) {
        e.preventDefault();

        console.log('menu');
        var $this=$(this),
            //menu = $this.closest('.menu'),
            li = $this.closest('.menu__item'),
            liNum = $this.eq();
        console.log('liNum');
        console.log(liNum);

        $(li).toggleClass('active').siblings().removeClass('active');


    })
})();
