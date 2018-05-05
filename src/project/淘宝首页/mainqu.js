window.onload = function () {
    var lili = document.getElementsByClassName('lili');
    var innercon = document.getElementsByClassName('inner-con');
    var innercon1 = document.getElementsByClassName('inner-con1');
    var maininner = document.getElementsByClassName('main-inner');
    var len = lili.length;
    for (var i = 0; i < len-1; i++) {
        (function (n) {
            lili[n].onmouseover = function () {
                for (var j = 0; j < len-1; j++) {
                    innercon1[j].style.display = 'none';
                    innercon[0].style.display = 'none';
                    innercon1[n].style.display = 'block';
                }
            }
            innercon1[n].onmouseout = function () {
                for (var j = 0; j < len-1; j++) {
                    innercon1[j].style.display = 'none';
                    innercon[0].style.display = 'block';
                    innercon1[n].style.display = 'none';
                }
            }
            maininner[0].onmouseout = function () {
                for (var j = 0; j < len-1; j++) {
                    innercon1[j].style.display = 'none';
                    innercon[0].style.display = 'block';
                    innercon1[n].style.display = 'none';
                }
            }
        }(i))
    }
    var lichina = document.getElementsByClassName('china');
    var divchina = document.getElementsByClassName('nav-item-china')[0];
    lichina[0].onmouseover = function(){
        divchina.style.diplay = 'block';
    }
}