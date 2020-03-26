const axios = require("axios");

const actions = {
  fetchTotals({ commit }, country) {
    commit("SET_CHECKING", true);
    return axios
      .get(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, {
        headers: {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": "725c9f399emsh9693ba7bbf383b3p1a01a0jsn241b16cbdb73"
        }
      })
      .then(result => {
        // console.log("RESPONSE", result.data.response);
        commit("SET_DATAS", result.data.response);
      })
      .catch(error => console.log(error))
      .finally(() => commit("SET_CHECKING", false));
  }
};

const mutations = {
  SET_DATAS: (state, payload) => (state.statistics = payload),
  SET_CHECKING: (state, payload) => (state.checking = payload)
};

const getters = {
  statistics: state => state.statistics || [],
  checking: state => state.checking
};

const state = {
  statistics: [],
  checking: false
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
