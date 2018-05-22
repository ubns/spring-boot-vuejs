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
    vm.$on('info', fn)
}

function handleError(errorMessage) {
    emitError(errorMessage)
}

function emitLogin() {
    vm.$emit('login')
}

function onLogin(fn) {
    vm.$on('login', fn)
}

function emitLogout() {
    vm.$emit('logout')
}

function onLogout(fn) {
    vm.$on('logout', fn)
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
        onInfo(function (message) {
            this.message = message
        }.bind(this))
    }
}


var Header = {
    template: '#header',
    data: function() {
        return {
            currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
        }
    },
    mounted: function () {
        onLogin(function () {
            this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
        }.bind(this))
    },
    methods: {
        logout: function () {
                this.currentUser = null
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('currentUser')
                this.$router.push('/')
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
                } else if (res.data.message != null) {
                    handleError(res.data.message)
                }else {
                    emitInfo('Completion!')
                    this.$router.push('/login')
                }
            }.bind(this))
        }
    }
}

/* Login Form */
var LoginForm = {
    template: '#login_form',
    data: function () {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        handleSubmit: function (e) {
            e.preventDefault()
            if (this.name === '') {
                handleError('Name is empty.')
                return false
            }
            if (this.password === '') {
                handleError('Password is empty.')
                return false
            }
            axios.post('/api/authentication', {
                name: this.name,
                password: this.password
            }).then(function (res) {
                if (res.data.error) {
                    handleError(res.data.error)
                } else {
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('currentUser', JSON.stringify(res.data.user));
                    emitLogin()
                    emitInfo()
                    this.$router.push('/')
                }
            }.bind(this))
        }
    }
}

var NewPost = {
    template: '#new-post',
    data: function () {
        return {
            title: null,
            content: null
        }
    },
    beforeRouterEnter: function (to, from, next) {
        if (sessionStorage.getItem('token') === null) {
            next({path: 'login'})
            emitInfo('ログインしてください')
        } else {
            next()
        }
    },
    methods: {
        handleSubmit: function (e) {
            e.preventDefault()
            if (this.title === null || this.title === '') {
                handleError('タイトルが入力されていません')
                return false
            }
            if (this.content === null || this.content === '') {
                handleError('コンテンツが入力されていません')
                return false
            }
            axios.post('/api/post', {
                title: this.title,
                content: this.content,
            }, {
                headers: {token: sessionStorage.getItem('token')}
            }
            ).then(function (res) {
                if (res.data.error) {
                    handleError(res.data.error)
                    return
                }
                this.$router.push('/')
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

var Top = {
    template: '#main',
    created: function () {
        emitInfo()
    }
}

var routes = [
    {path: '/', component: Top},
    {path: '/signup', component: SignupForm},
    {path: '/login', component: LoginForm},
    {path: '/posts/new', component: NewPost}
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
