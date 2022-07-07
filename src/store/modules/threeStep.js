const threeStep = {
    state: {
        cellMessage: [],
        estateCode: ''
    },
    mutations: {
        SET_TITLE(state, payload) {
            state.cellMessage = payload.cellMessage
            state.estateCode = payload.estateCode
        }
    },
    actions: {

    },
    getters: {

    }
}

export default threeStep
