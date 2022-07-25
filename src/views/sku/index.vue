<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column width="80" align="center" label="ID">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="商品名称">
        <template slot-scope="{row}">
          <span>{{ row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="品类">
        <template slot-scope="{row}">
          <span>{{ row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="品牌">
        <template slot-scope="{row}">
          <span>{{ row.brandName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="71px" label="图片">
        <template slot-scope="{row}">
          <el-image style="width: 50px; height: 50px" :src="row.imageUrl" :preview-src-list="[row.imageUrl]"
            fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="单价">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="单位">
        <template slot-scope="{row}">
          <span>{{ row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存">
        <template slot-scope="{row}">
          <span>{{ row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="{row}">
          <el-tag v-for="(item, index) in row.skuAttributes" :key="index">
            <em>{{item.name}}：</em>{{item.value}}
          </el-tag>
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
      <el-form :inline="false" :model="productForm" :rules="rules" ref="productForm" label-width="100px"
        class="demo-productForm">
        <el-form-item label="商品编码" prop="code" required>
          <el-input v-model="productForm.code"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name" required>
          <el-input v-model="productForm.name"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="productForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model.number="productForm.price"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brandId">
          <el-cascader ref="brandCascader" :options="brandTreeData" v-model="productForm.brandId" :show-all-levels="false" @change="getBrand"
            :props="{checkStrictly: true, label: 'name', value: 'id'}" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="属性" prop="attributes">
          <el-select v-model="selectedAttributes" multiple placeholder="请选择商品属性">
            <el-option v-for="item in attributeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="imageUrls" style="margin-bottom: 30px;">
          <upload-image v-model="productForm.imageUrls" />
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getSkuList, brandTree, getAttributeList, addProduct, updateProduct } from '@/api/product'
import { Product, Brand, Attribute, Sku } from '@/types/product'
import Pagination from '@/components/Pagination/index.vue'
import UploadImage from '@/components/UploadImage/index.vue'
import { Form as ElForm, Message } from 'element-ui'

@Component({
  name: 'ArticleList',
  components: {
    Pagination,
    UploadImage
  }
})
export default class extends Vue {
  private total = 0
  private list: Sku[] = []
  private listLoading = true
  private dialogFormVisible = false
  private formTitle = ''
  private listQuery = {
    page: 1,
    limit: 20
  }

  private brandTreeData: Brand[] = []
  private attributeList: Attribute[] = []
  private selectedAttributes: number[] = []
  private productForm: Product = {
    code: '',
    name: '',
    brandId: 0,
    typeId: 0,
    typeName: '',
    brandName: ''
  }

  private brandTypeMap: Map<number, number> = new Map();

  private rules = {
    code: [
      { required: true, message: '请输入商品编码', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入商品名称', trigger: 'blur' }
    ],
    unit: [
      { required: true, message: '请输入商品单位', trigger: 'blur' }
    ],
    price: [
      { required: true, message: '请输入商品单价', trigger: 'blur' },
      { type: 'number', min: 3, message: '单价必须是大于0的数字', trigger: 'change' }
    ],
    brandId: [
      { required: true, message: '请选择品牌', trigger: 'change' }
    ],
    attributes: [
      { required: true, message: '请至少选择一个商品属性', trigger: 'blur' }
    ]
  }

  created() {
    this.getList()
    this.getBrandTree()
    this.getAttributeList()
  }

  // 获取品牌列表
  private async getBrandTree() {
    const { data } = await brandTree()
    this.brandTreeData = data
    this.initBrandTypeMap(data)
  }

  private initBrandTypeMap(data: Array<Brand>) {
    if (data && data.length > 0) {
      data.forEach(e => {
        if (e.children && e.children?.length > 0) {
          this.initBrandTypeMap(e.children)
        }
        this.brandTypeMap.set(e.id, e.typeId)
      })
    }
  }

  // 获取属性列表
  private async getAttributeList() {
    const { data } = await getAttributeList()
    this.attributeList = data
  }

  // 获取列表
  private async getList() {
    this.listLoading = true
    const { data } = await getSkuList(this.listQuery)
    this.list = data.rows
    this.total = data.total
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
      if (row.attributes) {
        this.selectedAttributes = row.attributes.map(e => e.id)
      }
    }
    this.dialogFormVisible = true
  }

  getBrand(data: Array<number>) {
    this.productForm.brandId = data[data.length - 1]
    this.productForm.typeId = this.brandTypeMap.get(this.productForm.brandId) || -1
    console.log(this.productForm)
  }

  cancel() {
    this.dialogFormVisible = false
    this.productForm = {
      code: '',
      name: '',
      brandId: 0,
      typeId: 0,
      typeName: '',
      brandName: ''
    }
  }

  @Watch('selectedAttributes')
  private onSelectedAttributesChange(value: Array<number>) {
    this.productForm.attributes = value.map(e => {
      return { id: e, name: '', values: [] }
    })
  }

  submit() {
    if (this.selectedAttributes && this.selectedAttributes.length > 0) {
      this.productForm.attributes = this.selectedAttributes.map(e => {
        return { id: e, name: '', values: [] }
      })
    }
    (this.$refs.productForm as ElForm).validate(async(valid: any) => {
      console.log('productForm', this.$refs.productForm)
      if (valid) {
        // alert('submit!')
        if (this.productForm.id) {
          await updateProduct(this.productForm)
        } else {
          await addProduct(this.productForm)
        }
        Message.success('操作成功')
        this.cancel()
      } else {
        Message.error('请正确填写商品信息')
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
