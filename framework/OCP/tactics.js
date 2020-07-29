/**
 * /**
 * 入参类型检查
 当数据量较大并层次很深时，使用递归函数会导致栈溢出,而此处又无法使用尾递归,该怎么处理
 typeof Date,Math,RegExp,Function,Null 都返回Object 该怎么处理
 Date,RegExp,Function 应该如何克隆
 当对象的两个属性v,s引用同一个对象时，克隆之后也应该引用同一个对象
 对象的原型prototype 如何克隆
 属性的getOwnPropertyDescriptor如何克隆
 for-in遍历的是原型链，需要用hasOwnProperty 判断是否是自有属性
 简单深克隆
 * @type {{Array: (function(*, *): Uint8Array | BigInt64Array | *[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array), Undefined: (function(): *), Function: (function(*): *), Null: (function(): null), Number: (function(*): *), RegExp: (function(*=): RegExp), Object: (function(*=, *): any), String: (function(*): *), Boolean: (function(*): *), Date: (function(*): Data)}}
 */

//类型策略
var types = {
    'String':function (str) {
        return str
    },
    'Number':function (num) {
        return num;
    },
    'Boolean':function (b) {
        return b;
    },
    'Undefined':function () {
        return void 0;
    },
    'Null':function () {
        return null;
    },
    'Object':function (obj,_clone) {
        const propt = Object.getPrototypeOf(obj);
        const copyObj = Object.create(propt);
        for (let key in obj ){
           if( obj.hasOwnProperty(obj)) copyObj[key] = _clone(obj);
        }
        return copyObj;
    },
    'Function':function (fn) {
        return fn;
    },
    'Array':function (arr,_clone) {
       return  arr.map(item =>_clone(item));
    },
    'RegExp':function (reg) {
        let atts = '';
        if(reg.global) atts+='g'
        if(reg.ignoreCase) atts+='i'
        if(reg.multiline) atts+='m'
        const copyReg = new RegExp(reg,atts);
        if(reg.lastIndex) copyReg.lastIndex = reg.lastIndex;
        return copyReg;
    },
    'Date':function (data) {
        return new Data(data.getTime())
    },
}
//1.判断类型
//2.克隆
//3.相互引用复用
//爆栈处理
function tactics(obj) {
    const objMap = new WeakMap();
    const isObject = o=> typeof o === 'object' && o!==null;
    const _clone = (o)=>{
        if(isObject(o) && objMap.get(o)) return  objMap.get(o);
         //[object Array] => Array
         const type = Object.prototype.toString.call(o).slice(8,-1);
         return types[type](o,_clone);
    }
    const copyObj = _clone(obj);
    if(isObject(o)) return  objMap.set(obj,copyObj);
    return copyObj
}

//1.获取原型
//2.从原型创造对像
//3.复制属性
//4.复制属性策略
function simpleClone(obj){
    const prop = Object.getPrototypeOf(obj);
    const copyObj = Obkect.create(obj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            copyObj[key] = obj[key];
            const des = Object.getOwnPropertyDescriptor(obj,key);
            Object.defineProperties(copyObj,key,des);
        }
    }
    return copyObj;
}
