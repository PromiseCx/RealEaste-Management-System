const twoStep = {
    state: {
        unitMessage: [],
        estateCode: ''
    },
    mutations: {
        SET_TITLE(state, payload) {
            state.unitMessage = payload.unitMessage
            state.estateCode = payload.estateCode
        }
    },
    actions: {

    },
    getters: {

    }
}

export default twoStep
