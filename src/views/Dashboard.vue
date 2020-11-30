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
        <vxe-button status="primary" @click="openOrderDialog('add')" content="ADD" size="medium"></vxe-button>
        <vxe-button status="primary" @click="openOrderDialog('edit')" content="EDIT" size="medium"></vxe-button>
        
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
    <vxe-modal ref="createOrderModal" v-model="openNewOrderDialog" :title="pageTitle" width="800" resize destroy-on-close>
      <template v-slot>
        <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100">
          <!-- <vxe-form-item title="Client Name" span="15">
              <vxe-select v-model="formData.client_id" placeholder="Select an employee">
                <vxe-option v-for="item in clientListing" :key="item.id" :value="item.id" :label="item.name"></vxe-option>
              </vxe-select>  
          </vxe-form-item> -->
          <vxe-form-item v-model="formData.id" title="Order ID" field="id" span="15" :item-render="{name: 'input'}"></vxe-form-item>
          <vxe-form-item title="Order Date" v-if="formType === 'add'" v-model="formData.date" field="date" span="15" :item-render="{name: 'input', attrs: {type: 'date', placeholder: 'Date'}}"></vxe-form-item>
          <vxe-form-item v-model="formData.customer_name" v-if="formType === 'add'" title="Customer Name" field="customer_name" span="15" :item-render="{name: 'input'}"></vxe-form-item>
          <vxe-form-item v-model="formData.customer_number" v-if="formType === 'add'" title="Customer Number" field="customer_name" span="15" :item-render="{name: 'input'}"></vxe-form-item>
          <vxe-form-item v-model="formData.amount" title="Order amount"  field="amount" span="15" :item-render="{name: 'input'}"></vxe-form-item>
          <vxe-form-item title="Notes" v-model="formData.notes" field="notes" span="15" :item-render="{name: 'textarea'}"></vxe-form-item>
          <vxe-form-item v-if="formType === 'edit'" title="Approved By" v-model="formData.approved_by" field="approved_by" span="15" :item-render="{name: 'input'}"></vxe-form-item>
          <vxe-form-item align="center" span="24">
            <template v-slot>
              <vxe-button @click="createOrder()" type="submit" status="primary">ADD</vxe-button>
              <vxe-button type="reset">Reset</vxe-button>
              <vxe-button @click="$refs.createOrderModal.close()">Close</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>
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
// import axios from 'axios'
export default {
  data () {
    return {
      filterName: '',
      formData:{
        id: null,
        date: null,
        customer_name: null,
        customer_number: null,
        amount: null,
        notes: null
      },
      openNewOrderDialog: false,
      formType: '',
      tableData: [
        { date: '07/08/2020', name: 'Alesssandro', id: 756462, name1: 'May Com', id1: 756462 , amount: 'INR 30897' , status: 'AwaitingApproval', notes: 'Pending Approval from John' },
        { date: '07/08/2020', name: 'Lucio', id: 346433, name1: 'Coro Group', id1: 77896 , amount: 'INR 30899' , status: 'Approved', notes: 'Approved by John' },
        { date: '07/07/2020', name: 'Aleb', id: 756489, name1: 'k. Com', id1: 756489 , amount: 'INR 40897' , status: 'AwaitingApproval', notes: 'Pending Approval from David' },
        { date: '07/09/2020', name: 'sandro', id: 786462, name1: 'May kom', id1: 786462 , amount: 'INR 30097' , status: 'Approved', notes: 'Approved by David' }
        
        // { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
        // { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
      ],
      formRules: {
				// name: [
				// 	{ required: true, message: 'Please fill the name' },
				// 	{ min: 3, max: 5, message: '长度在 3 到 5 个字符' }
				// ],
				// phone: [
				// 	{ required: true, message: 'Please fill the phone number' },
				// ],
				// description: [
				// 	{ required: true, message: '请选择性别' }
				// ],
				// cash: [
				// 	{ required: true, message: '请选择性别' }
				// ]
			},
    }
  },
  watch: {
		'openNewOrderDialog': function (newVal) {
			console.log(newVal, "watcher");
      // if(!newVal)
      // this.initialize();
		}
	},
  methods: {
    openOrderDialog(formType){
      this.formType = formType
      if (this.formType === "add") {
				this.formData = {
					id: "",
          date: "",
          customer_name: "",
          customer_number: "",
          amount: "",
          notes: "",
				}
        this.selectRow = null
        this.openNewOrderDialog = true
      }
      if (this.formType === "edit") {
        // this.formData = {
				// 	id: row.id,
				// 	amount: row.amount,
				// 	notes: row.notes,
				// 	approved_by: row.description
					
				// }
				// this.selectRow = row
        this.openNewOrderDialog = true
      }
    },
    createOrder(){
      if(this.formType == 'add'){
				// return axios
				// 	.post(`${this.baseUrl}/api/landlords`,{
				// 		name: this.formData.name,
				// 		phone: this.formData.phone,
				// 		address: this.formData.address,
				// 		description: this.formData.description,
				// 		fields: this.formData.fields,
				// 	})
				// 	.then(response => {
				// 		if (response){
				// 			this.openNewLandlordDialog = false
				// 		}
				// 	})
				// 	.catch(e => {
				// 		console.log(e);
				// 	});
			}
			else{
				// console.log("formDatainEdit", this.formData)
				// console.log("landlord edit id", this.selectRow.id)
				// return axios
				// 	.put(`${this.baseUrl}/api/landlords/${this.selectRow.id}`,{
				// 		name: this.formData.name,
				// 		phone: this.formData.phone,
				// 		address: this.formData.address,
				// 		description: this.formData.description,
				// 		fields: this.formData.fields,
				// 	})
				// 	.then(response => {
				// 		this.openNewLandlordDialog = false
				// 	})
				// 	.catch(e => {
				// 			console.log(e);
				// 	});
			}
    }
  },
  computed: {
    pageTitle(){
			return this.formType ? this.formType === 'add' ? "ADD ORDER" : "EDIT ORDER" : '';
		},
    filteredData () {
      const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['id', 'name']
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