<template>
  <div class="container mt-4">
    <div class="card content-area">
      <div class="card-innr">
        <div class="card-head">
          <h4 class="card-title">RDC COVID-19 DATAS</h4>
        </div>
        <table v-if="tableData" data-items="5" class="data-table dt-init user-list">
          <thead>
            <tr class="data-item data-head">
              <th class="data-col dt-user">DATE</th>
              <th class="data-col dt-user">DAY</th>
              <th class="data-col dt-email">ACTIVE CASES</th>
              <th class="data-col dt-email">CONFIRMED CASES</th>
              <th class="data-col dt-token">DEATH</th>
              <th class="data-col dt-verify">RECOVERED</th>
            </tr>
          </thead>
          <tbody>
            <tr class="data-item" v-for="(item, i) in tableData" :key="i">
              <td class="data-col dt-user">
                <span class="lead">{{ item['Date'] }}</span>
              </td>
              <td class="data-col dt-user">
                <span class="lead">{{ item['Day'] }}</span>
              </td>
              <td class="data-col dt-user">
                <span class="lead">{{ item['Active cases'] }}</span>
              </td>
              <td class="data-col dt-user">
                <span class="lead">{{ item['Confirmed Cases'] }}</span>
              </td>
              <td class="data-col dt-user">
                <span class="lead">{{ item['Death'] }}</span>
              </td>
              <td class="data-col dt-user">
                <span class="lead">{{ item['Recovery'] }}</span>
              </td>
            </tr>
            <!-- .data-item -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array
  },
  mounted() {
    (function(t) {
      var O = t(".dt-init");
      O.length > 0 &&
        O.each(function() {
          var e = t(this),
            a = e.data("items") ? e.data("items") : 5;
          e.DataTable({
            ordering: !1,
            autoWidth: !1,
            dom:
              '<"table-wrap"t><"row align-items-center"<"col-md-9"p><"col-md-3 text-left text-md-right"i>>',
            pageLength: a,
            bPaginate: t(".data-table tbody tr").length > a,
            iDisplayLength: a,
            language: {
              search: "",
              searchPlaceholder: "Type in to Search",
              info: "_START_ -_END_ of _TOTAL_",
              infoEmpty: "No records",
              infoFiltered: "( Total _MAX_  )",
              paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Prev"
              }
            }
          });
        });
    })(jQuery);
  }
};
</script>
