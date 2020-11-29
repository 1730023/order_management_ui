<template>
  <div class="container">
  <div class="row">
    <div class="col-sm-3">
      <img src="../assets/hrc-logo.svg" />
    </div>
    <div class="col-sm-6">
      <img src="../assets/abc-logo.png" />
    </div>
  </div>
  <br>
  <div class="row">
    <div class="col">
      <div class="container-fluid">
       <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input v-model="filterName" type="search" placeholder="Search an order"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table :data="filteredData">
      <!-- <vxe-table-column type="seq" title="Seq" width="60"></vxe-table-column> -->
      <vxe-table-column field="date" title="Order Date"></vxe-table-column>
      <vxe-table-column field="name" title="Approved By"></vxe-table-column>
      <vxe-table-column field="id" title="Order ID"></vxe-table-column>
      <vxe-table-column field="name1" title="Company Name"></vxe-table-column>
      <vxe-table-column field="id1" title="Company ID"></vxe-table-column>
      <vxe-table-column field="amount" title="Order Amount"></vxe-table-column>
      <vxe-table-column field="status" title="Approval Status"></vxe-table-column>
      <vxe-table-column field="notes" title="Notes"></vxe-table-column>
    </vxe-table>
      </div>
  </div>
    </div>
  <!--     <div class="col">
      2 of 3
    </div>
    <div class="col">
      3 of 3
    </div> -->
  
</div>
</template>

<script>
import XEUtils from 'xe-utils'
export default {
  data () {
    return {
      filterName: '',
      tableData: [
        { date: '07/08/2020', name: 'Alesssandro', id: 756462, name1: 'May Com', id1: 756462 , amount: 'INR 30897' , status: 'AwaitingApproval', notes: 'Pending Approval from John' },
        { date: '07/08/2020', name: 'Lucio', id: 346433, name1: 'Coro Group', id1: 77896 , amount: 'INR 30899' , status: 'Approved', notes: 'Approved by John' },
        { date: '07/07/2020', name: 'Aleb', id: 756489, name1: 'k. Com', id1: 756489 , amount: 'INR 40897' , status: 'AwaitingApproval', notes: 'Pending Approval from David' },
        { date: '07/09/2020', name: 'sandro', id: 786462, name1: 'May kom', id1: 786462 , amount: 'INR 30097' , status: 'Approved', notes: 'Approved by David' }
        
        // { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
        // { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
      ]
    }
  },
  computed: {
    filteredData () {
      const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['id']
        const rest = this.tableData.filter(item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1))
        return rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `${match}`)
          })
          return item
        })
      }
      return this.tableData
    }
  },
}
</script>

<style>

</style>