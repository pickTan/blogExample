//mvc架构  view 跟 modle 监听者模式


/**
 * 数据模型层
 * 业务逻辑
 * @constructor
 */
function Model() {
    var data = {
        text : ''
    }
    this.setText = function (text) {
        data.text = text;
    }

    //被观察者模式 将view 注册进来
    const regs = [];

    this.regiset = function (view) {
        regs.push(view);
    }
    this.notify = function () {
        regs.forEach(view=>view.render(data))
    }



}

/**
 * UI展示层
 *  **此处应该不是真实view，真实应该是html呈现的部分，而此处只是控制html的dom映射，理论来说应该是view Controller层，进行视图的更新控制器
 *    暂且我们将它看成View层
 * @param contr
 * @constructor
 */
function View(contr) {
    const $1=document.getElementById('input');
    const $2=document.getElementById('text') ;

    this.render = function (data) {
        var text = data['text'];
        $2.innerText=text;
    }

    //执行
    $1.addEventListener('input',function (e) {
        contr.setText(e.target.value)
    })

}

/**
 *
 * @constructor
 * 流程
 */
function Controller() {
    const  view = new View(this);
    const  model = new Model();
    // 注册进去
    model.regiset(view);

    this.setText = function(text) {
        model.setText(text);
        model.notify();
    }

}
//入口
new Controller();
