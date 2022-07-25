<template>
  <div class="upload-container">
    <el-upload :headers="headers" :multiple="false" :show-file-list="false" :on-success="handleImageSuccess"
      class="image-uploader" drag action="http://117.50.187.26:8700/system/file/upload">
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div class="image-preview" v-show="fileList.length > 0" v-for="(item, index) in fileList" :key="index">
      <div class="image-preview-wrapper">
        <img :src="item">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { deleteFile } from '@/api/file'
import { Message } from 'element-ui'

@Component({
  name: 'UploadImage'
})
export default class extends Vue {
  @Prop({ default: () => [] }) private value!: Array<string>

  private tempUrl = ''
  private headers = { Authorization: 'Bearer ' + UserModule.token }

  get fileList() {
    return this.value
  }

  private emitInput() {
    console.log(this.fileList)
    this.$emit('input', this.fileList)
  }

  private rmImage(index: number) {
    const deleteUrl = this.fileList[index]
    console.log('deleteUrl', deleteUrl)
    deleteFile([deleteUrl])
    this.fileList.splice(index, 1)
    this.emitInput()
  }

  private handleImageSuccess(res: any) {
    console.log(res)
    if (res && res.code === 200) {
      this.fileList.push(res.data)
      this.emitInput()
    } else {
      Message({
        message: '图片上传出错！',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;

  .image-uploader {
    width: 45%;
    float: left;
  }

  .image-preview {
    width: 100px;
    height: 100px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 25px;

    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;

      .el-icon-delete {
        font-size: 36px;
        top: 33px;
        right: 30px;
        position: absolute;
      }
    }

    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }

  .image-app-preview {
    width: 320px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;

    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>
