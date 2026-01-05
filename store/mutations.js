export const SETLANDINGPAGE = (state,landingPageNumber) => {
    state.landingPageNumber = landingPageNumber;
}

export const SETMENULOCKING = (state,ismenulock) => {
    state.ismenulock = ismenulock;
}

export const setToggleMenu = (state) => {
    state.ismenu = !state.ismenu;
}

export const SETMENU = (state,isopen) => {
    state.ismenu = isopen;
}


export const LOGOUT = (state) => {
    // window.$nuxt.$cookies.remove("route_to", { path: "/"});
    // window.$nuxt.$cookies.remove("username", { path: "/"});
    state.ismenu = false;
    state.ismenulock = true;
    state.loggeduser.isLogged = false;
    state.loggeduser.username = '';
    state.loggeduser.usergroup = '';
}

export const PUSH_NOTIFICATION = (state, notification) => {
    state.notification.push({
        ...notification,
        id: (Math.random().toString(32) + Date.now().toString(32)).substr(2),
    });
}

export const RESET_NOTIFICATION = (state, notification) => {
    state.notifications = [];
}

export const SET_LOGEDUSER = (state, loggeduser) => {
    state.loggeduser = loggeduser;
}

export const SET_VERTICAL_USER = (state, loginDetails) => {
    state.loggedUserVerticals = loginDetails;
}

export const SET_COMPANYDETAILS = (state, company) => {
    state.company = company;
}

export const MessageBox = (state, { header, body }) => {
    state.msg.isShowing = true;
    state.msg.header = header;
    state.msg.body = body;
}

export const setLoading = (state, isloading) => {
    state.loading = isloading;
}