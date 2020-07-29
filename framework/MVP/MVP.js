/**
 * 数据逻辑以及
 * @constructor
 */
function Model() {
    this.data = {
        text:''
    }

    this.setText = function (text) {
        this.data.text = text;
    }
}

/**
 * view更新逻辑 以及
 * @constructor
 */
function View() {
    const $1=document.getElementById('input');
    const $2=document.getElementById('text') ;
    const preset  = new Preset(this);

    this.render = function (data) {
        var text = data['text'];
        $2.innerText=text;
    }
    $1.addEventListener('input',function(e){
        preset.setText(e.target.value)
    } )

}


/**
 * 即做数据更新
 * 也做渲染
 * @param view
 * @constructor
 */
function Preset(view) {
    const model = new Model();
    this.setText = function (text) {
        model.setText(text);
        view.render(model.data);
    }
}

//入口
new View()
