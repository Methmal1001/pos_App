import axios from 'axios';

var api_call = axios.create({
    baseURL: 'https://api.example.com',
});

var api_call_vertical = axios.create({
    baseURL: 'https://vertical.api.example.com',
});

export async function getLogin (context, logindetails) {
    context.commit('setLoading', true, { root: true });

    await api_call.post('/auth/login', logindetails).then(resp => {

        let response = resp.data;
        let loggeduser = response.user;

        if (loggeduser.isLogged) {
            context.commit('SET_LOGEDUSER', loggeduser, { root: true });
            context.commit('PUSH_NOTIFICATION', {
                type: 'success',
                message: 'Login successful!'
            }, { root: true });

            let redirectto = window.$nuxt.$cookies.get("setRedirectTo");

            // console.log("Redirect to:", redirectto);
            if (loggeduser.email!='' && loggeduser.mobile!=''){
                if(redirectto != undifined)
                    $nuxt.$router.push(redirectto);
                else
                    $nuxt.$router.push('/');
            }
            else
                $nuxt.$router.push('/user/updatedetails');
        }
        else {
            context.commit('PUSH_NOTIFICATION', {
                type: 'failed',
                message: 'Login Failed',
            }, { root: true });
        }
            })

            .catch(error => {
                context.commit('PUSH_NOTIFICATION', {
                    type: 'failed',
                    message: error,
                }, { root: true });
            });
            context.commit('setLoading', false, { root: true });
    }

export const getChangeLogin = (context, changelogindetails) => {
    context.commit('setLoading', true, { root: true });

    api_call.post('/Auth/getChangeLogin', changelogindetails).then(resp => {
        let result = resp.data;

        if (result.resultcode == 100) {
            context.commit('PUSH_NOTIFICATION', {
                type: 'success',
                message: result.resultdesc,
            }, { root: true });

            $nuxt.$router.push('user/login');
        }
        else {
            context.commit('PUSH_NOTIFICATION', {
                type: 'failed',
                message: result.resultdesc,
            }, { root: true });
        }
    }).catch(error => {
            context.commit('PUSH_NOTIFICATION', {
            type: 'failed',
            message: error,
        }, { root: true });
    });
    context.commit('setLoading', false, { root: true });
}
