var vm = new Vue({
    el:'#app',
    data: {
        users: ''
    },
    methods: {
        get: function () {
            var self = this
            axios.get("/api/user/1")
                .then(function (res) {
                    self.users = res.data
                })
        },
        hoge: function () {
            this.users = {id: 1, name: "hoge", password:"hogehoge"}
        }
    }
})

