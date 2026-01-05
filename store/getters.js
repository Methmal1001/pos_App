export const user_token = (state) => {
    return state.loggeduser.token;
}


export const user_id = (state) => {
    return state.user_id;
}

export const usertype = (state) => {
    return state.usertype;
}

export const username = (state) => {
    return state.username;
}

export const loading = (state) => {
    return state.loading;
}

export const authInfo = (state) => {
    return {"user_token":state.user_token,"user_id":state.user_id,"usertype":state.usertype,"username":state.username}
}

export const notifications = (state) => {
    return state.notifications;
}