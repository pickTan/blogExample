//现在写一个页面Page，有左边栏Sider 有头部Top 有主体 content
//https://zhuanlan.zhihu.com/p/60995312
//高阶 是一个实现

class  Sider{

}

class  Top{

}

class  Content{

}

class Page {
    constructor() {
        this.sider = Sider();
        this.top = new Top();
        this.content = new Content();
    }

    render(){
        this.sider + this.top + this.content;
    }
}

//符合开闭原则的Ioc实现
// 提升开发效率
// 提高模块化
// 便于单元测试
// 一个抽象容器或者说一个抽象缓存
//bind改成register 又是一个订阅 发布模式
//容器中的bind再加一个惰性单例，在运行时实例化
//很难控制Container按需输出全局单例或者是新实例


class Container {
    constructor() {
        this.objs = {};
    }

    get(key){
        return this.objs[key]
    }

    bind(obj){

    }
}

const  container = new Container();

container.bind('sider',new Sider())
container.bind('top',new Top())
container.bind('content',new Content())

class IocPage {
    constructor() {
        this.sider = container.get('sider');
        this.top = container.get('top');
        this.content =  container.get('content');
    }

    render(){
        this.sider + this.top + this.content;
    }
}
