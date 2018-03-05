var vm = new Vue()

var regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

function emitError(message) {
    vm.$emit('error', message)
}

function onError(fn) {
    vm.$on('error', fn)
}

function emitInfo(message) {
    vm.$emit('info', message)
}

function onInfo(fn) {
    cm.$on('info', fn)
}

function handleError(errorMessage) {
    emitError(errorMessage)
}

var Alert = {
    template: '#alert',
    data: function () {
        return {
            message: ''
        }
    },
    mounted: function () {
        onError(function (errorMessage) {
            this.message = errorMessage
        }.bind(this))
    }
}


var Header = {
    template: '#header',
    data: function() {
        return {
            user: ''
        }
    }
}

var SignupForm = {
    template: '#signup_form',
    data: function () {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        handleSubmit: function (e) {
            e.preventDefault()
            if (this.name === '') {
                handleError('Username is empty.')
                return false
            }
            if (this.email === '') {
                handleError('Email is empty.')
                return false
            }
            if (!regexp.test(this.email)) {
                handleError('Please enter a valid email.')
                return false
            }
            if (this.password === '') {
                handleError('Password is empty.')
                return false
            }
            axios.post('api/user', {
                name: this.name,
                email: this.email,
                password: this.password
            }).then(function (res) {
                if (res.data.error) {
                    handleError(res.data.error)
                } else {
                    emitInfo('Completion!')
                    this.$router.push('/')
                }
            }.bind(this))
        }
    }
}

var Post = {
    template: '#posts',
    data: function () {
        return {
            users: []
        }
    }
    ,
    created: function () {
        var self = this
        emitInfo('')
        axios.get('/api/user/list')
            .then(function (res) {
                self.users = res.data
            })
    }
}

var routes = [
    {path: '/post', component: Post},
    {path: '/signup', component: SignupForm}
]

var router = new VueRouter({
    mode: 'history',
    routes: routes
})

new Vue({
    router: router,
    components: {
        'x-header': Header,
        'x-alert': Alert
    }
}).$mount('#app')
