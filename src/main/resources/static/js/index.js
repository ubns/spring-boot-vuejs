// ローカル登録
var Child = {
    template: '<div>Spring boot child</div>'
}

// root インスタンスの生成
new Vue({
    el: '#example',
    components: {
        'my-component': Child
    }
})