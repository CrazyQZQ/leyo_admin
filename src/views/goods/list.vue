<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column width="80" align="center" label="ID">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="品牌">
        <template slot-scope="{row}">
          <span>{{ row.brandName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="71px" label="图片">
        <template slot-scope="{row}">
          <el-image style="width: 50px; height: 50px" :src="row.imageUrls[0]" :preview-src-list="row.imageUrls"
            fit="fill"></el-image>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="单价">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="库存">
        <template slot-scope="{row}">
          <span>{{ row.stock }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button type="primary" icon="el-icon-plus" circle @click="preEdit()"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="preEdit(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="productForm" :rules="rules" ref="productForm" label-width="100px" class="demo-productForm">
        <el-form-item label="商品名称" prop="name" required>
          <el-input v-model="productForm.name"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="productForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="productForm.price"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="productForm.brandId" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品类">
          <el-select v-model="productForm.brandId" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性">
          <el-select v-model="productForm.attributes" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { productList } from '@/api/product'
import { Product } from '@/types/product'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'ArticleList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private total = 0
  private list: Product[] = []
  private listLoading = true
  private dialogFormVisible = false
  private formTitle = ''
  private listQuery = {
    page: 1,
    limit: 20
  }

  private productForm: Product = {}

  private rules = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    date1: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    date2: [
      { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    ],
    type: [
      { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [
      { required: true, message: '请填写活动形式', trigger: 'blur' }
    ]
  }

  created() {
    this.getList()
  }

  // 获取列表
  private async getList() {
    this.listLoading = true
    const { rows, total } = await productList(this.listQuery)
    this.list = rows
    this.total = total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  // 编辑
  private async preEdit(row: Product) {
    this.formTitle = '新增商品'
    if (row) {
      this.productForm = row
      this.formTitle = '编辑商品'
    }
    this.dialogFormVisible = true
  }

  cancel() {
    this.dialogFormVisible = false
    this.productForm = {}
  }

  submit() {
    this.$refs.productForm.validate((valid: any) => {
      if (valid) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
