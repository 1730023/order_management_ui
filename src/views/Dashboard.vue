<template>
  <div class="">
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
        
        <vxe-input style="float: right;" v-model="filterName" type="search" placeholder="Search an order"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table :data="filteredData">
      <vxe-table-column field="order_id" title="Order ID"></vxe-table-column>
      <vxe-table-column field="order_date" title="Order Date"></vxe-table-column>
      <vxe-table-column field="approved_by" title="Approved By"></vxe-table-column>
      <vxe-table-column field="customer_name" title="Customer Name"></vxe-table-column>
      <vxe-table-column field="customer_id" title="Customer ID"></vxe-table-column>
      <vxe-table-column field="order_amount" title="Order Amount"></vxe-table-column>
      <vxe-table-column field="approval_status" title="Approval Status"></vxe-table-column>
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
          <vxe-form-item v-model="formData.customer_id" v-if="formType === 'add'" title="Customer ID" field="customer_id" span="15" :item-render="{name: 'input'}"></vxe-form-item>
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
import axios from 'axios'
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
        customer_id: null,
        amount: null,
        notes: null,
        approved_by: null,
      },
      localStorageUsername: localStorage.getItem('username'),
      openNewOrderDialog: false,
      formType: '',
      tableData: [],
      baseUrl: 'http://localhost:8088',
      orderAmount: null,
      formRules: {
				id: [
					{ required: true, message: 'Please fill the name' }
				],
				date: [
					{ required: true, message: 'Please fill the date' }
        ],
        customer_name: [
					{ required: true, message: 'Please fill the customer name' }
        ],
        customer_id: [
					{ required: true, message: 'Please fill the customer id' }
        ],
        amount: [
					{ required: true, message: 'Please fill the amount' }
        ],
        notes: [
					{ required: true, message: 'Please fill the notes' }
				],
			},
    }
  },
  created() {
    console.log('localstorage',localStorage.getItem('username'))
    this.initialize();
    this.orderAmount = this.formData.amount
  },
  watch: {
		'openNewOrderDialog': function (newVal) {
			console.log(newVal, "watcher");
      // if(!newVal)
      // this.initialize();
    },
    'orderAmount': function (newVal) {
			console.log(newVal, "watcher");
      if(!newVal)
      this.formData.amount = this.approvedByWhom
		}
	},
  methods: {
    initialize(){

      return axios
        .get(`${this.baseUrl}/orders`,{
          params: {
            username: localStorage.getItem('username')
          }
        })
        .then(response => {
          if (response){
            
            this.tableData = response.data.data
            console.log(response.data.data)
          }
        })
        .catch(e => {
          console.log(e);
      });

    },
    openOrderDialog(formType){
      this.formType = formType
      if (this.formType === "add") {
				this.formData = {
					id: "",
          date: "",
          customer_name: "",
          customer_id: "",
          amount: "",
          notes: "",
				}
        this.selectRow = null
        this.openNewOrderDialog = true
      }
      if (this.formType === "edit") {
        this.formData = {
          id: "4324",
          amount: null,
          notes: "frferf",
          approved_by: this.approvedByWhom
        }
				// this.selectRow = row
        this.openNewOrderDialog = true
      }
    },
    createOrder(){
      if(this.formType == 'add'){
				return axios
					.post(`${this.baseUrl}/orders`,{
            id: this.formData.id,
            date: this.formData.date,
            customer_name: this.formData.customer_name,
            customer_id: this.formData.customer_id,
            amount: this.formData.amount,
            notes: this.formData.notes,
            approval_by: "",

            approval_status: ""
          },
            {
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
					.then(response => {
						if (response){
							console.log("response", response);
						}
					})
					.catch(e => {
						console.log(e);
					});
			}
			else{
				// console.log("formDatainEdit", this.formData)
				// console.log("landlord edit id", this.selectRow.id)
				return axios
					.put(`${this.baseUrl}/orders`,{
						id: this.formData.id,
            amount: this.formData.id,
            notes: this.formData.id,
            approved_by: this.formData.approved_by
					},
            {
              headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
					.then(response => {
						console.log(response)
					})
					.catch(e => {
							console.log(e);
					});
			}
    }
  },
  computed: {
    approvedByWhom(){
      const amount = this.formData.amount
      console.log("amount", amount)
      if(amount <= 10000){
        console.log('david')
        return "David Lee"
      }else if(amount > 10000 && amount <= 50000){
        console.log('laura')
        return "Laura Smith"
      }else{
        console.log('matthew')
        return "Matthew Vance"
      }
    },
    pageTitle(){
			return this.formType ? this.formType === 'add' ? "ADD ORDER" : "EDIT ORDER" : '';
		},
    filteredData () {
      const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['order_id']
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