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
              <vxe-button status="primary" v-if="level1User" @click="openOrderDialog('add')" content="ADD" size="medium"></vxe-button>
              <vxe-button status="primary" v-if="level1User" @click="openOrderDialog('edit')" content="EDIT" :disabled="selectRow == null" size="medium"></vxe-button>
              <vxe-button status="primary" v-if="!level1User" @click="orderStatusChange('approve')" content="APPROVE" :disabled="selectRow == null" size="medium"></vxe-button>
              <vxe-button status="primary" v-if="!level1User" @click="orderStatusChange('reject')" content="REJECT" :disabled="selectRow == null" size="medium"></vxe-button>
              
              <vxe-input style="float: right;" v-model="filterName" type="search" placeholder="Search an order"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table 
          border
          ref="xTable1"
          :data="filteredData"
          size="mini"
          row-id="id"
          :checkbox-config="{checkStrictly: true}"
          :radio-config="{highlight: true}"
          @cell-click="cellClickEvent"
          @radio-change="radioChangeEvent">

          <vxe-table-column type="radio" width="60">
            <template v-slot:header>
              <vxe-button type="text" @click="clearRadioRowEevnt" :disabled="!selectRow"></vxe-button>
            </template>
          </vxe-table-column>
          <vxe-table-column field="order_id" title="Order ID"></vxe-table-column>
          <vxe-table-column field="order_date" title="Order Date"></vxe-table-column>
          <vxe-table-column field="approved_by" title="Approved By"></vxe-table-column>
          <vxe-table-column field="customer_name" title="Customer Name"></vxe-table-column>
          <vxe-table-column field="customer_id" title="Customer ID"></vxe-table-column>
          <vxe-table-column field="order_amount" title="Order Amount"></vxe-table-column>
          <vxe-table-column field="approval_status" title="Approval Status"></vxe-table-column>
          <vxe-table-column field="notes" title="Notes"></vxe-table-column>
          
        </vxe-table>
        <vxe-pager
            :loading="loading1"
            :current-page="tablePage.currentPage"
            :page-size="tablePage.pageSize"
            :total="tablePage.totalResult"
            :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Total']"
            @page-change="handlePageChange1">
            <p>fefefef</p>
          </vxe-pager>
            


     
        </div>
      </div>
    </div>
    <el-dialog :title="pageTitle" :visible.sync="openNewOrderDialog">
      <el-form :model="formData" :rules="formRules" ref="ruleFormCreateOrder">
        <el-form-item prop="id" label="Order Id" label-width="140px">
          <el-input v-model="formData.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Order Date"  label-width="140px" required>
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="Pick a date" v-model="formData.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item  prop="customer_name" label="Customer Name" label-width="140px">
          <el-input v-model="formData.customer_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="customer_id" label="Customer Number" label-width="140px">
          <el-input v-model="formData.customer_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="amount" label="Order Amount" label-width="140px">
          <el-input v-model="formData.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="notes" label="Notes" label-width="140px">
          <el-input v-model="formData.notes" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="openNewOrderDialog = false">CANCEL</el-button> -->
        <el-button type="primary" @click="createOrder()">ADD</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="pageTitle" :visible.sync="openEditOrderDialog">
      <el-form ref="ruleForm">
        <el-form-item label="Order Id" label-width="120px">
          <el-input v-model="editOrderId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Order Amount" label-width="120px">
          <el-input v-model="editOrderAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Notes" label-width="120px">
          <el-input v-model="editOrderNotes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Approved By" label-width="120px">
          <el-input v-model="approvedByWhom" id="approvedByField" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="openEditOrderDialog = false">CANCEL</el-button> -->
        <el-button type="primary" @click="createOrder()">SUBMIT</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import XEUtils from 'xe-utils'
import { EventBus } from './event-bus';
// import axios from 'axios'
export default {
  data () {
    return {
      elName: null,
      selectRow: null,
      loading1: false,
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      editOrderId: null,
      editOrderAmount: null,
      editOrderNotes: null,
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
      level1User: false,
      localStorageUsername: localStorage.getItem('username'),
      openNewOrderDialog: false,
      openEditOrderDialog: false,
      formType: '',
      tableData: [],
      baseUrl: 'http://localhost:8088',
      orderAmount: null,
      formRules: {
				id: [
					{ required: true, message: 'Please fill the id', trigger: 'blur'  }
				],
				date: [
					{ required: true, message: 'Please fill the date' , trigger: 'blur'  }
        ],
        customer_name: [
					{ required: true, message: 'Please fill the customer name' , trigger: 'blur' }
        ],
        customer_id: [
					{ required: true, message: 'Please fill the customer id' , trigger: 'blur' }
        ],
        amount: [
					{ required: true, message: 'Please fill the amount', trigger: 'blur'  }
        ],
        notes: [
					{ required: true, message: 'Please fill the notes', trigger: 'blur' }
				],
			},
    }
  },
  created() {
    EventBus.$emit('logged', 'User logged')
    if(localStorage.getItem('username') === "David_Lee"){
      this.level1User = true
    }
    this.initialize();
    
  },
  watch: {
		'openNewOrderDialog': function (newVal) {
      if(!newVal){
        this.initialize();
        this.selectRow = null
      }
    }
	},
  methods: {
    initialize(){
      // EventBus.$emit('logged', 'User logged')
      return axios
        .get(`${this.baseUrl}/orders`,{
          params: {
            username: localStorage.getItem('username'),
            pageSize: this.tablePage.pageSize,
            currentPage: this.tablePage.currentPage,
          }
        })
        .then(response => {
          if (response){
            // response.data.data.forEach(function(a) {
            //   a.order_date = this.formatDate(a.order_date)
            // });
            this.tableData = response.data.data
            this.tablePage.totalResult = response.data.total_count
            this.loading1 = false
          }
        })
        .catch(e => {
          console.log(e);
          this.loading1 = false
      });

    },
    cellClickEvent () {
    },
    radioChangeEvent ({ row }) {
      this.selectRow = row
    },
    clearRadioRowEevnt () {
      this.selectRow = null
      this.$refs.xTable1.clearRadioRow()
    },
    handlePageChange1 ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.initialize()
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
      else{
        
        this.editOrderId = this.selectRow.order_id
        this.editOrderAmount = this.selectRow.order_amount
        this.editOrderNotes = this.selectRow.notes
        
        this.openEditOrderDialog = true
      }
    },
    approvalStatus(amount){
      if(amount <= 10000){
        return "David Lee"
      }else if(amount > 10000 && amount <= 50000){
        return "Awaiting approval"
      }
    },
    
    createOrder(){



      if(this.formType == 'add'){

        this.$refs['ruleFormCreateOrder'].validate((valid) => {
          if (valid) {
            return axios
              .post(`${this.baseUrl}/orders`,{
                id: this.formData.id,
                date: this.formatDate(this.formData.date),
                customer_name: this.formData.customer_name,
                customer_id: this.formData.customer_id,
                amount: this.formData.amount,
                notes: this.formData.notes,
                approved_by: (this.formData.amount <= 10000) ? "David Lee" : "",
                approval_status: (this.formData.amount <= 10000) ? "Approved" : "Awaiting Approval",
              },
                {
                  headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                }
              })
              .then(response => {
                if (response.data.status == true){
                  this.openNewOrderDialog = false
                }
              })
              .catch(e => {
                console.log(e);
              });

          } else {
            return false;
          }
        });

			}
			else{
				return axios
					.put(`${this.baseUrl}/orders`,{
						id: this.editOrderId,
            amount: this.editOrderAmount,
            notes: this.editOrderNotes,
            approved_by: document.getElementById('approvedByField').value,
            edit_type: "order_edit"
					},
            {
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            }
          )
					.then(response => {
            if (response.data.status == true){
              this.openEditOrderDialog = false
              this.initialize()
						}
					})
					.catch(e => {
							console.log(e);
					});
			}
    },
    orderStatusChange(status){
      return axios
        .put(`${this.baseUrl}/orders`,{
          id: this.selectRow.order_id,
          approval_status: (status === "approve") ? "Approved" : "Rejected",
          approved_by: (status === "approve") ? localStorage.getItem('username').replace('_',' ') : "",
          edit_type: " "
        },
          {
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }
        )
        .then(response => {
          if (response.data.status == true){
            this.initialize()
            alert("Order updated")
            
          }
        })
        .catch(e => {
            console.log(e);
        });
    },
    formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
  },
  computed: {
    approvedByWhom(){
      const amount1 = this.editOrderAmount
      if(amount1 <= 10000){
        return "David Lee"
      }else if(amount1 > 10000 && amount1 <= 50000){
        return "Laura Smith"
      }else{
        return "Matthew Vance"
      }
    },
    pageTitle(){
			return this.formType ? this.formType === 'add' ? "ADD ORDER" : "EDIT ORDER" : '';
    },
    buttonTitle(){
      return this.formType ? this.formType === 'add' ? "ADD" : "SUBMIT" : '';
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