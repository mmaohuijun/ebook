<template>
<div class="case-project">
  <a href="javascript:;" class="case-add-btn" @click="addProject">新建项目</a>
  <Row :gutter="24" class="case-project__list">
    <Col :md="12" v-for="(items, index) in caseList" :key="index">
      <div class="case-project__item">
        <div class="case-project__line">
          <div class="case-project__label"><span>项目名称</span></div>
          <div class="case-project__data"><span>{{items.name}}</span></div>
        </div>
        <div class="case-project__scroll">
          <div class="case-project__line" v-for="(propertys, index) in items.propertys" :key="index">
            <div class="case-project__label"><span>{{propertys.propertyTypeName}}</span></div>
            <div class="case-project__data"><span v-for="apartTypes in propertys.apartTypes" :key="apartTypes">{{apartTypes}}</span></div>
          </div>
        </div>
        <div class="case-project__tool">
          <i class="iconfont icon-xiugai" @click="modifyCase(items)"></i>
          <i class="iconfont icon-shanchu1"></i>
        </div>
      </div>
    </Col>
  </Row>

  <Modal
    v-model="modalShow"
    :closable="false"
    :mask-closable="false"
    width="840">
    <p slot="header">{{modalTitle}}</p>
    <Row>
      <Col :md="12" style="padding: 28px 0 0 17px;">
        <Form :label-width="120" style="height: 340px; border-right: 1px solid #979797;">
          <Form-item label="项目名称：">
            <Input style="width: 180px;" v-model="inputModel.name"></Input>
          </Form-item>
          <Form-item label="物业选择：">
            <Select style="width: 180px;" @on-change="changeProperty" v-model="inputModel.propertyType">
              <Option value="1">别墅</Option>
              <Option value="2">住宅</Option>
              <Option value="3">酒店式公寓</Option>
            </Select>
          </Form-item>
          <Form-item label="户型信息：">
            <Select placeholder="" style="width: 74px;" v-model="inputModel.apartTypes1">
              <Option v-for="n in 20" :value="n" :key="n">{{n}}</Option>
            </Select>
            <span style="font-size: 16px; vertical-align: middle;">室</span>
            <Select placeholder="" style="width: 74px; margin-left: 10px;" v-model="inputModel.apartTypes2">
              <Option v-for="n in 20" :value="n" :key="n">{{n}}</Option>
            </Select>
            <span style="font-size: 16px; vertical-align: middle;">厅</span>
          </Form-item>
          <Form-item>
            <Select placeholder="" style="width: 74px;" v-show="inputModel.propertyType === '1'" v-model="inputModel.apartTypes3">
              <Option v-for="n in (1000 / 50)" :value="(n * 50)" :key="n">{{n * 50}}</Option>
            </Select>
            <Select placeholder="" style="width: 74px;" v-show="inputModel.propertyType !== '1'" v-model="inputModel.apartTypes3">
              <Option v-for="n in (300 / 10)" :value="(n * 10)" :key="n">{{n * 10}}</Option>
            </Select>
            <span style="margin: 0 10px; font-size: 16px; vertical-align: middle;">-</span>
            <Select placeholder="" style="width: 74px;" v-show="inputModel.propertyType === '1'" v-model="inputModel.apartTypes4">
              <Option v-for="n in (1000 / 50)" :value="(n * 50)" :key="n">{{n * 50}}</Option>
            </Select>
            <Select placeholder="" style="width: 74px;" v-show="inputModel.propertyType !== '1'" v-model="inputModel.apartTypes4">
              <Option v-for="n in (300 / 10)" :value="(n * 10)" :key="n">{{n * 10}}</Option>
            </Select>
            <span style="font-size: 16px; vertical-align: middle;">㎡</span>
            <i class="iconfont icon-tianjia btn-add-property" @click="addProperty"></i>
          </Form-item>
        </Form>
      </Col>
      <Col :md="12" style="padding: 28px 0 0 17px;">
        <div class="case-list">
          <div class="case-item" v-for="(items, propertyKey) in caseProject.propertys">
            <span class="case-item__label">{{items.propertyTypeName}}：</span>
            <p class="case-item__content" v-for="(item, itemKey) in items.apartTypes">{{item}}<i class="iconfont icon-shanchu" @click="deleteProperty(propertyKey, itemKey)"></i></p>
          </div>
        </div>
      </Col>
    </Row>
    <div slot="footer">
      <Button type="text" size="large" @click="modalShow = false">取消</Button>
      <Button type="primary" size="large" @click="saveProject">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  name: 'CaseProject',
  data() {
    return {
      modalShow: true,
      modalTitle: '',
      caseList: [
        {
          id: '1',
          name: '中南一期1',
          propertys: [
            {
              propertyTypeName: '别墅',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            },
            {
              propertyTypeName: '住宅',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            },
            {
              propertyTypeName: '酒店式公寓',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            }
          ]
        },
        {
          id: '2',
          name: '中南一期2',
          propertys: [
            {
              propertyTypeName: '别墅',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            },
            {
              propertyTypeName: '住宅',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            },
            {
              propertyTypeName: '酒店式公寓',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            }
          ]
        },
        {
          id: '3',
          name: '中南一期3',
          propertys: [
            {
              propertyTypeName: '别墅',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            },
            {
              propertyTypeName: '住宅',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            },
            {
              propertyTypeName: '酒店式公寓',
              apartTypes: ['1房1厅 50-70㎡', '1房1厅 70-90㎡']
            }
          ]
        }
      ],
      caseProject: {
        id: '1',
        name: '中南一期1',
        propertys: [
          {
            propertyType: '1',
            propertyTypeName: '别墅',
            apartTypes: ['1房1厅 50-70㎡', '2房1厅 70-90㎡']
          },
          {
            propertyType: '2',
            propertyTypeName: '住宅',
            apartTypes: ['4房1厅 50-70㎡', '4房1厅 70-90㎡']
          },
          {
            propertyType: '3',
            propertyTypeName: '酒店式公寓',
            apartTypes: ['5房1厅 50-70㎡', '6房1厅 70-90㎡']
          }
        ]
      },
      inputModel: {
        name: '',
        propertyType: '',
        apartTypes1: '',
        apartTypes2: '',
        apartTypes3: 0,
        apartTypes4: 0
      }
    }
  },
  computed: {
    caseId() {
      return this.$store.state.CASE_ID
    },
    propertyNumber() {
      return this.inputModel.propertyType === '1' ? 1000 : 300
    },
    propertyGutter() {
      return this.inputModel.propertyType === '1' ? 50 : 10
    }
  },
  methods: {
    getList() {
      this.$axios.post('/case-project/list', { caseId: this.caseId }).then(response => {
        if (response === null) return
        this.caseList = response.data
        console.log(this.caseList)
      })
    },
    changeProperty(value) {
      this.inputModel.apartTypes3 = ''
      this.inputModel.apartTypes4 = ''
    },
    modal(title) {
      this.modalTitle = title
      this.modalShow = true
    },
    addProject() {
      this.caseProject.id = '0'
      this.caseProject.name = ''
      this.caseProject.propertys = []
      this.modal('新建项目')
    },
    modifyCase(item) {
      console.log(item)
      this.caseProject = item
    },
    deleteCase(index) {
      console.log(index)
    },
    addProperty() {
      console.log(this.inputModel)
    },
    deleteProperty(key, index) {
      this.caseProject.propertys[key].apartTypes.splice(index, 1)
    },
    saveProject() {
      const data = {
        id: this.caseProject.id,
        caseId: this.caseId,
        name: this.caseProject.name,
        propertys[i].propertyType:
      }
      this.$axios.post('/case-project/save', { params: data }).then(response => {
        if (response === null) return
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less">
.case-project__list {
  padding: 0 -15px;
}
.case-project__item {
  position: relative;
  height: 240px;
  padding: 15px 0 15px 20px;
  margin-bottom: 25px;
  background:#f8f8f8;
  box-shadow:0 1px 2px 0 rgba(0,0,0,0.50);
  border-radius:5px;
  overflow: hidden;

  &:hover {
    .case-project__tool {
      display: block;
    }
  }
}

.case-project__tool {
  display: none;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 22px;

  i {
    margin-left: 8px;
    cursor: pointer;
  }
}

.case-project__line {
  margin-bottom: 14px;
  overflow: hidden;
}
.case-project__label{
  float: left;
  font-size: 18px;
  &::after {
    content: "：";
    display: inline-block;
    color: #555;
  }

  span {
    display:inline-block;
    width: 90px;
    text-align: justify;
    text-align-last: justify;
    color: #777;
  }
}
.case-project__data {
  margin-left: 115px;
  font-size: 16px;
  line-height: 27px;

  span {
    display: inline-block;
    color: #111;
    margin:0 30px 5px 0;
    white-space:nowrap
  }
}

.case-project__scroll {
  height: 179px;
  overflow-y: auto;
}

.case-list {
  height: 340px;
  overflow-y: auto;
}

.case-item {
  line-height: 27px;
  margin-bottom: 15px;
  overflow: hidden;
}

.case-item__label {
  display: inline-block;
  float: left;
  width: 110px;
  text-align: right;
  font-size: 18px;
  color: #111;
}

.case-item__content {
  margin-left: 110px;
  margin-bottom: 3px;
  font-size: 16px;
  color: #555;

  i {
    margin-left: 5px;
    color: #dbdce1;
    font-size: 14px;

    &:hover {
      color: #a5a8b4;
      cursor: pointer;
    }
  }
}

.btn-add-property {
  display: inline-block;
  margin-left: 5px;
  color: #dbdce1;
  font-size: 20px;
  vertical-align: middle;

  &:hover {
    color: #a5a8b4;
    cursor: pointer;
  }
}
</style>
