let state = null;
// const [state,setState]
export const useState = (initState)=>{
    state = state || initState;
    const setState = (obj)=> {
        state = {...state , ...obj};
        render();
    }
    return[state,setState];
}

