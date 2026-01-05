import Vuex from 'vuex';


import authmodule from "./modules/authcontroller";
import itemmodule from "./module/itemcontroller";
import tablemodule from "./module/tablecontroller";



import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

const createstore = () => {

    return new Vuex.Store({
        state,
        getters,
        mutations,
        actions,

        modules: {
            auth:authmodule,
            items:itemmodule,
            tables:tablemodule,
        }
    });
}

export default createstore;