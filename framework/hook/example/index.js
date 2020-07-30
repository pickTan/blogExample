import react,{Fragment} from 'react';
import ReactDOM from "react-dom";
/**********useState***************/

//state 本身挂在fiber上，render()方法全局注册到hook中,所以hook相当与一个present层
// let hooks = [];
// let cursor  = 0;
let state = null;
// const [state,setState]
export const useState = (initState)=>{
      // state =     hooks[cursor] ;
    state = state || initState;
    const setState = (obj)=> {
        state = {...state , ...obj};
        render();
    }
    // cursor++
    const res = [state,setState];
    return res;
}
/**********useStateEnd**********/

const initState = {
    data:{
        text:'1'
    }
}

function App() {
    const [state,setState] = useState(initState);
    return(<Fragment>
        <div><input id="input" type="text" /></div>
        <div> <p id="text"></p></div>
    </Fragment>)
}

const rootElement = document.getElementById("root");
function render() {
    ReactDOM.render(<App />, rootElement)
}

// 在react 中类似单链表的形式
// type Hooks = {
//     memoizedState: any, // 指向当前渲染节点 Fiber
//   baseState: any, // 初始化 initialState， 已经每次 dispatch 之后 newState
//   baseUpdate: Update<any> | null,// 当前需要更新的 Update ，每次更新完之后，会赋值上一个 update，方便 react 在渲染错误的边缘，数据回溯
//   queue: UpdateQueue<any> | null,// UpdateQueue 通过
//   next: Hook | null, // link 到下一个 hooks，通过 next 串联每一 hooks
// }
//
// type Effect = {
//   tag: HookEffectTag, // effectTag 标记当前 hook 作用在 life-cycles 的哪一个阶段
//   create: () => mixed, // 初始化 callback
//   destroy: (() => mixed) | null, // 卸载 callback
//   deps: Array<mixed> | null,
//   next: Effect, // 同上
// };
