//UBD架构  view 跟 modle 监听者模式


/**
 * 数据访问层
 * @constructor
 */
function DAL(bll) {
    this.getData  = function () {
        ajaxSource('get','./data.json','',function (res) {
            bll.setData(res);
        },function (err) {
            bll.error(err);
        })
    }

}

/**
 * UI展示层
 * @param contr
 * @constructor
 */
function UI(bll) {
    const $1=document.getElementById('input');
    const $2=document.getElementById('text') ;
    const $3=document.getElementById('button') ;

    this.render = function (data) {
        var text = data['text'];
        //UI的逻辑
        if(text !== $1.value){
            $1.value = text;
        }
        $2.innerText=text;
    }

    this.errRender = function(){
        alert('错误')
    }

    //执行
    $1.addEventListener('input',function (e) {
        bll.setText(e.target.value)
    })

    $3.addEventListener('click',function () {
        bll.getData()
    })

}

/**
 * 逻辑层
 * @constructor
 */
function BLL() {
    var ui = new UI(this);
    var dal = new DAL(this);
    var model = {
        data:{text:''}
    };

    //给UI层调用的暴露的接口
    this.setText =  function (text) {
        model.data.text = text;
        ui.render(model.data)
    }

    //DAL层调用返回的model
    this.setData = function(data) {
        model = data;
        ui.render(model.data)
    }

    this.error = function () {
        ui.errRender();
    }

    //调用dal层
    this.getData = function() {
        dal.getData()
    }

}

//source
function ajaxSource(type, url, data, success, error){
    // 创建ajax对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    type = type.toUpperCase();
    // 用于清除缓存
    var random = Math.random();

    if(typeof data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }

    if(type == 'GET'){
        if(data){
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();

    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var  stat = ''+xhr.status;
            if(stat[0]== 2){
                success(JSON.parse(xhr.responseText));
            } else {
                if(error){
                    error(xhr.status);
                }
            }
        }
    }
}

//入口
new BLL();
