

main()

/**
 * 入口文件
 */
function main() {
    var vm =  new VM();
    new View(vm);
    window.vm = vm;
}

/**
 * 数据模型
 * @constructor
 */
function Model() {
    this.data = {
        text:1
    }
    this.tpl=''

}

/**
 * view层
 * @constructor
 */
function View(vm) {
    const $1=document.getElementById('input') ;
    const $2=document.getElementById('text') ;
    this.render = function () {
        var text = vm['data']['text'];
        $2.innerText=text;
        $1.value = text;
    }
    new Watcher(vm['data'],'text',this.render.bind(this))

    $1.addEventListener('input',function (e) {
        const target = e.target;
        vm['data']['text'] = target.value;
    })
}


/**
 * VM将Preset的手动绑定变为自动绑定
 * @constructor
 */
function VM() {
    return  bindModelToView(new Model());
}

//数据更新执行渲染，与watcher是注册模式
function Dep() {
    var watchers = []
    //增加坚挺
    this.add = function (wachter) {
        watchers.push(wachter);
    }
    //执行更新
    this.notify = function () {
        watchers.forEach(item=>item.run())
    }
}

Dep.target = null

/**
 *
 * @param vm
 * @param key
 * @param cb 回调函数
 * @constructor
 */
function Watcher(vm,key,cb) {
    Dep.target = this;
    vm[key]; //执行一次get方法，注入
    Dep.target = null;

    this.run = function () {
        cb()
    }
}


/**
 * 将数据代理，数据跟页面绑定,形成VM
 * @param data
 * @returns {*}
 */
function bindModelToView(data){
    var dep = new Dep();
    var logHandler =  {
        get: function(target, key) {
            Dep.target  && dep.add(Dep.target);
            console.log(`${key} 被读取`);
            return Reflect.get(target, key);
        },
        set: function(target, key, value) {
            typeof value === 'object' && bindModelToView(value);
            console.log(`${key} 被设置`);
            if(value !== target[key]){
            Reflect.set(target, key, value);
            dep.notify();
            }

        }
    }
    const proxy = target =>{
        Object.entries(target).forEach(item=>typeof item[1] ==='object' && (target[item[0]] = bindModelToView(item[1],logHandler)))
        return new Proxy(target,logHandler);
    }
    return proxy(data);
}
