
export default {
    landingPageNumber:'',
    loading:false,
    ismenulock : false,
    ismenu: false,
    notifications: [],

    loggeduser: {
        islogged: false,
        username: '',
        usergroup: '',
        id:-1,
        email:'',
        mobile:'',
        image:'',
        granted:'',
        token:'',

    },

    loggedUserVerticals: {
        userName: '',
        userGroup: '',
        token: '',
    },

    // loggeduser: {
    //     isLogged: true,
    //     username: '123456',
    //     usergroup: 'admin',
    //     email: 'test@gmail.com',
    //     mobile: '1234567890',
    //     image: '',
    //     granted: 'all',
    //     id: 1,
    // },

    company: {},

    msg: {
        isShowMsg: false,
        header: '',
        body: '',
    },

}