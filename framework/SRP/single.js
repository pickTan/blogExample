/**
 * 创建登陆框的惰性单例(只有使用时才加载)模式
 * 职责 1. 创建登陆的DIV  2.单利化
 * 坏处：1.以后其他的
 * @returns {function(): HTMLDivElement}
 */
function createLoginLayer(){
    var div;
    return function () {
        if(!div){
            div =  document.createElement('div');
            div.innerHTML = '我是登陆框';
            div.style.display='none';
            document.body.append(div)
        }
        return div;
    }
}

var loginLayer = createLoginLayer()()

//进行职责拆分
//拆分成 1.单例生成器  2.登陆层

//单例模式是典型的单一职责的
function getSingle(fn) {
    var res;
    return function () {
        return res || (res = fn.call(this,arguments))
    }
}

function loginLayer() {
   var div =  document.createElement('div');
    div.innerHTML = '我是登陆框';
    div.style.display='none';
    document.body.append(div)
    return div;
}

var loginLayer = getSingle(loginLayer)()

