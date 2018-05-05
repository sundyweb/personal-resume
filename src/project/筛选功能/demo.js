var person = [
    { name: '刘小华', src: '1.jpg', sex: 'male', des: '漂亮的女孩子' },
    { name: '王花', src: '2.jpg', sex: 'male', des: '漂亮的程序猿' },
    { name: '陈军', src: '3.jpg', sex: 'female', des: '我是一个学霸' },
    { name: '王华', src: '4.jpg', sex: 'female', des: '我喜欢游泳' },
    { name: '陈思思', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '陈学习', src: '6.jpg', sex: 'female', des: '我爸我妈爱学习' },
    { name: '王美丽', src: '7.jpg', sex: 'male', des: '我妈是美丽得妈妈' }
];
var Oul = document.getElementById('list');
var Oinp = document.getElementById('inp');
var listUl = document.getElementById('listUl');
var sNum = document.getElementById('sNum');

// 渲染html
function render(list) {
    var str = '';
    // 当前共有num条记录
    var num = 0;
    list.forEach(function (ele, index) {
        str += '<li>\
        <img src="./img/'+ ele.src + '" alt="">\
        <span class = "name">'+ ele.name + '</span>\
        <span>'+ ele.des + '</span>\
    </li>'
        num++;
    });
    Oul.innerHTML = str;
    sNum.innerText = num;

}
render(person);

// 根据姓名筛选
Oinp.oninput = function () {
    state.text = this.value;
    // render(filterText(text,person));
    render(addFn(objFilter, person));
}
function filterText(text, arr) {
    return arr.filter(function (ele, index) {
        if (ele.name.indexOf(text) !== -1) {
            return true;
        }
    })
}

// 根据性别筛选
listUl.addEventListener('click', function (e) {
    if (e.target.tagName == "LI") {
        state.sex = e.target.getAttribute('sex');
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        // render(filterSex(sex,person));
        render(addFn(objFilter, person));

    }
})
function filterSex(sex, arr) {
    if (sex == 'all') {
        return arr;
    } else {
        return arr.filter(function (ele, index) {
            if (sex == ele.sex) {
                return true;
            }
        })
    }
}
// 姓名和性别筛选的交集

// 监测是否发生改变
var state = {
    text: '',
    sex: 'all'
}
var objFilter = {
    text: filterText,
    sex: filterSex
}
// 第一次筛选后结果为lastArr，再从lastArr中进行二次筛选
function addFn(obj, arr) {
    var lastArr = arr;
    for (var prop in obj) {
        lastArr = obj[prop](state[prop], lastArr);
        // lastArr = filterText(text,lastArr);
        // lastArr = filterSex(sex,lastArr);
    }
    console.log(lastArr);
    return lastArr;
}
// addFn(objFilter, person);

