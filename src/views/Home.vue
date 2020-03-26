<template>
  <div>
    <div class="row" v-if="countryDetails">
      <div class="col-lg-3">
        <div class="token-statistics card card-token height-auto">
          <div class="card-innr">
            <div class="token-balance token-balance-with-icon">
              <div class="token-balance-icon">
                <img :src="`${publicPath}coronavirus.png`" alt="logo" />
              </div>

              <div class="token-balance-text">
                <h6 class="card-sub-title">Confirmed Cases</h6>
                <span class="lead">
                  {{ cases[cases.length - 1] }}
                  <span>
                    <br />
                    <!-- {{ countryDetails.time | moment("MMMM Do YYYY") }} -->
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="token-statistics card card-token height-auto">
          <div class="card-innr">
            <div class="token-balance token-balance-with-icon">
              <div class="token-balance-icon">
                <img :src="`${publicPath}coronavirus.png`" alt="logo" />
              </div>

              <div class="token-balance-text">
                <h6 class="card-sub-title">Deceased</h6>
                <span class="lead">
                  {{ death[death.length - 1] }}
                  <span>
                    <br />
                    <!-- {{ countryDetails.time | moment("MMMM Do YYYY") }} -->
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="token-statistics card card-token height-auto">
          <div class="card-innr">
            <div class="token-balance token-balance-with-icon">
              <div class="token-balance-icon">
                <img :src="`${publicPath}coronavirus.png`" alt="logo" />
              </div>

              <div class="token-balance-text">
                <h6 class="card-sub-title">Recovered</h6>
                <span class="lead">
                  {{ recovery[recovery.length - 1] }}
                  <span>
                    <br />
                    <!-- {{ countryDetails.time | moment("MMMM Do YYYY") }} -->
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="token-statistics card card-token height-auto">
          <div class="card-innr">
            <div class="token-balance token-balance-with-icon">
              <div class="token-balance-icon">
                <img :src="`${publicPath}coronavirus.png`" alt="logo" />
              </div>

              <div class="token-balance-text">
                <h6 class="card-sub-title">Active cases</h6>
                <span class="lead">
                  {{ activeCases[activeCases.length - 1] }}
                  <span>
                    <br />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="chartLeft.series.length">
      <div class="col-md-10 offset-md-1">
        <apexchart
          height="350"
          type="bar"
          :options="chartLeft.chartOptions"
          :series="chartLeft.series"
        ></apexchart>
      </div>
    </div>
    <div
      v-if="loading"
      class="row justify-content-md-center justify-content-sm-center justify-content-xs-center p-4"
    >
      <img style="width:100px" src="@/assets/loader.gif" />
    </div>
    <TableData :tableData="tableData" v-if="tableData.length > 0" />
  </div>
</template>

<script>
import Vue from "vue";
import XLSX from "xlsx";
import VueApexCharts from "vue-apexcharts";
import TableData from "@/components/TableData";

Vue.use(XLSX);
Vue.use(VueApexCharts);

const axios = require("axios");

export default {
  name: "Home",
  components: {
    apexchart: VueApexCharts,
    TableData
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      country: "drc",
      loading: false,
      tableData: [],
      statistics: [],
      activeCases: [],
      cases: [],
      recovery: [],
      death: [],
      chartLeft: {
        series: [],
        chartOptions: {
          chart: {
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              endingShape: "rounded"
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: []
          },
          fill: {
            opacity: 1
          }
        }
      }
    };
  },
  computed: {
    countryDetails() {
      return this.cases && this.death && this.recovery ? this.cases : null;
    }
  },
  methods: {
    // async fetchTotals(country) {
    //   const { data } = await axios.get(
    //     `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
    //     {
    //       headers: {
    //         "x-rapidapi-host": "covid-193.p.rapidapi.com",
    //         "x-rapidapi-key":
    //           "725c9f399emsh9693ba7bbf383b3p1a01a0jsn241b16cbdb73"
    //       }
    //     }
    //   );
    //   if (data) {
    //     this.statistics = data.response;
    //   }
    // },
    async loadFile() {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1Svu1dygMWvNR8MSBsEIA_BGuSNwiAMA8d_H0s8ZUgN4/export?format=xlsx"
      );
      const data = await response.blob();

      return new File([data], "covid.xlsx");
    },
    async loadData() {
      this.loading = true;
      // await this.fetchTotals(this.country);

      let vm = this;

      var file = await this.loadFile();
      var rABS = false; //Read the file as a binary string

      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(file) {
        var binary = "";
        var rABS = false; //Read the file as a binary string
        var pt = this;
        var wb; //Read completed data
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          //If not introduced in main.js, you need to introduce it here to parse excel
          // var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //Manual conversion
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
            raw: false
          });

          //outdata is read data (without header rows or headers, the header will be the subscript of the object)
          //Data can be processed here.
          let series = {
            activeCases: {
              name: "Active cases",
              data: []
            },
            cases: {
              name: "Confirmed Cases",
              data: []
            },
            Recovery: {
              name: "Recovery",
              data: []
            },
            Death: {
              name: "Death",
              data: []
            }
          };

          outdata.map(v => {
            vm.tableData.push(v);
            vm.chartLeft.chartOptions.xaxis.categories.push(v["Date"]);

            series.activeCases.data.push(v["Active cases"]);
            series.cases.data.push(v["Confirmed Cases"]);
            series.Recovery.data.push(v["Recovery"]);
            series.Death.data.push(v["Death"]);
          });

          for (const key in series) {
            vm.chartLeft.series.push(series[key]);
          }
          vm.loading = false;
          vm.statistics = series;
          vm.activeCases = series.activeCases.data;
          vm.cases = series.cases.data;
          vm.death = series.Death.data;
          vm.recovery = series.Recovery.data;

          // console.log("DATAS FROM EXCEL", series);

          return "loaded";
        };
        reader.readAsArrayBuffer(file);
      };
      if (rABS) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsBinaryString(file);
      }
    }
  },

  mounted() {
    this.loadData();
  }
};
</script>
