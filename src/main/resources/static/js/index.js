/*
 *************************
 *                Settings 
 *************************
 */

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

/*
 *************************
 *                Alert 
 *************************
 */
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

/*
 *************************
 *                Header 
 *************************
 */
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
            emitInfo('')
            this.$router.push('/')
        }
    }
}

/* Sign in Form */
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
                    emitLogin('')
                    emitInfo('')
                    this.$router.push('/')
                }
            }.bind(this))
        }
    }
}

/*
 *************************
 *                Post
 *************************
 */
/*  New Post */
var NewPost = {
    template: '#new-post',
    data: function () {
        return {
            title: null,
            content: null
        }
    },
    beforeRouterEnter: function (to, from, next) {
        if (sessionStorege.getItem('token') === null) {
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
                handleError('タイトルが未入力です')
                return false
            }
            if (this.content === null || this.content === '') {
                handleError('内容が未入力です')
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
                emitInfo("登録完了")
                this.$router.push('/posts/' + res.data.id)
            }.bind(this))
        }
    }
}

/* Post List */
var PostList = {
    template: '#posts',
    data: function () {
        return {
            page: 0,
            dispItemSize: 3,
            posts: []
        }
    },
    filters: {
        dateFormat: function (long) {
            emitInfo()
            var date = moment(long).format('YYYY/MM/DD')
            return date.toLocaleString()
        }
    },
    mounted: function () {
        axios.get('/api/post').then(function (res) {
            if (res.data.error) {
                handleError(res.data.error)
            } else {
                var posts = res.data
                this.posts = posts.sort(function (a,b) {
                    return b.createTime - a.createTime
                })
            }
        }.bind(this))
    },
    methods: {
        // showDetail: {
        //
        // },
    }
}

/* Post Detail */
var PostDetail = {
    template: '#post-detail',
    data: function () {
        return {
            post: {
                title: '',
                content: '',
                author: {}
            },
            currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
        }
    },
    mounted: function () {
        axios.get('/api/post/' + this.$route.params.id).then(function (res) {
            if (res.data.error) {
                handleError(res.data.error)
                return
            } else {
                this.post = res.data,
                    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
            }
        }.bind(this))
    },
    filters: {
        dateFormat: function (long) {
            var date = moment(long).format('YYYY/MM/DD')
            return date.toLocaleString()
        }
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.post.content)
        }
    }
}

var PostEdit = {
    template: '#post-edit',
    data: function () {
        return {
            existentialQuestion: 'Am I truly an alligator?',
            post: {
                title: '',
                content: '',
                author: {}
            }
        }
    },
    mounted: function () {
        axios.get('/api/post/' + this.$route.params.id).then(function (res) {
            if (res.data.error) {
                handleError(res.data.error)
            } else {
                this.post = res.data
                this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
                console.log(this)
            }
        }.bind(this))
    },
    methods: {
        handleSubmit: function (e) {
            e.preventDefault()
            if (this.title === null || this.title === '') {
                handleError('タイトルが未入力です')
                return false
            }
            if (this.content === null || this.content === '') {
                handleError('内容が未入力です')
                return false
            }
            axios.put('/api/post/' + this.$route.params.id, {
                    title: this.post.title,
                    content: this.post.content,
                }, {
                    headers: {token: sessionStorage.getItem('token')}
                }
            ).then(function (res) {
                if (res.data.error) {
                    handleError(res.data.error)
                    return
                }
                emitInfo("登録完了")
                this.$router.push('/posts/' + res.data.id)
            }.bind(this))
        }
    }
}

/*
*************************
*                Run
*************************
*/
var routes = [
    {path: '/', component: PostList},
    {path: '/posts', component: PostList},
    {path: '/signup', component: SignupForm},
    {path: '/login', component: LoginForm},
    {path: '/posts/new', component: NewPost},
    {path: '/posts/:id', component: PostDetail},
    {path: '/post/edit/:id', component: PostEdit}
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
    },
}).$mount('#app')