<template>
  <div class="test-crud">
    <el-tabs type="card" lazy v-model="tabs.active" @tab-click="onTabClick">
      <el-tab-pane name="a" label="列表 A">
        <cl-crud name="a" @load="onLoadA" @fullscreen="onFullscreen" @resize="onResize">
          <template #table-column-images="{scope}">
            <el-image
              :src="scope.row.images[0]"
              :preview-src-list="scope.row.images"
              :style="{
                height: '60px',
                width: '60px'
              }"
            ></el-image>
          </template>

          <template #slot-append>
            <!-- eslint-disable-next-line -->
						<el-button size="mini" type="text" @click="openForm_CRUD">内嵌crud</el-button>
          </template>

          <template #slot-validate="{scope}">
            <el-form-item
              v-for="(item, index) in scope.vads"
              :key="index"
              :prop="'vads.' + index + '.val'"
              :rules="{ required: true }"
            >
              <el-input v-model="item.val"></el-input>
            </el-form-item>

            <el-button @click="addVad(scope.vads)">添加行</el-button>
          </template>

          <template #slot-fn>
            <el-button @click="submit" size="small">submit</el-button>
            <el-button @click="getForm" size="small">getForm</el-button>
            <el-button @click="hiddenItem" size="small">hiddenItem</el-button>
          </template>

          <template #slot-hdr-btn>
            <el-button size="mini" round>自定义按钮</el-button>
          </template>
        </cl-crud>
      </el-tab-pane>

      <el-tab-pane name="b" label="列表 B">
        <cl-crud name="b" @load="onLoadB">
          <template #slot-append>
            <!-- eslint-disable-next-line -->
						<el-button size="mini" type="text" @click="openForm_CRUD">内嵌crud</el-button>
          </template>
        </cl-crud>
      </el-tab-pane>
    </el-tabs>

    <cl-form ref="cl-form"></cl-form>
  </div>
</template>

<script>
const userList = [
  {
    id: 1,
    name: '刘一',
    process: 42.2,
    endTime: '2019年09月02日',
    price: 75.99,
    salesRate: 52.2,
    salesStatus: 1,
    images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg'],
    children: [
      {
        id: 6,
        name: '刘一儿子',
        process: 35.2,
        endTime: '2019年09月05日',
        price: 242.1,
        salesRate: 72.1,
        salesStatus: 1,
        images: []
      }
    ]
  },
  {
    id: 2,
    name: '陈二',
    process: 35.2,
    endTime: '2019年09月05日',
    price: 242.1,
    salesRate: 72.1,
    salesStatus: 1,
    images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg']
  },
  {
    id: 3,
    name: '张三',
    process: 10.2,
    endTime: '2019年09月12日',
    price: 74.11,
    salesRate: 23.9,
    salesStatus: 0,
    images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg']
  },
  {
    id: 4,
    name: '李四',
    process: 75.5,
    endTime: '2019年09月13日',
    price: 276.64,
    salesRate: 47.2,
    salesStatus: 0,
    images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg']
  },
  {
    id: 5,
    name: '王五',
    process: 25.4,
    endTime: '2019年09月18日',
    price: 160.23,
    salesRate: 28.3,
    salesStatus: 1,
    images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg']
  }
]

export default {
  data() {
    return {
      vad: {
        list: []
      },
      crud1: null,
      crud2: null,
      tabs: {
        active: 'a',
        list: [
          {
            label: '列表A',
            value: 'a'
          },
          {
            label: '列表B',
            value: 'b'
          }
        ]
      }
    }
  },

  methods: {
    onTabClick() {
      this.$nextTick(() => {
        this.crud1.doLayout('table')
        this.crud2.doLayout('table')
      })
    },

    onFullscreen(v) {
      console.log('是否全屏', v)
    },

    onResize({ tableMaxHeight }) {
      console.log('table-max-height', tableMaxHeight + 'px')
    },

    onLoadA({ ctx, app }) {
      this.crud1 = app

      ctx
        .service({
          page: p => {
            console.log('GET[page]', p)
            return Promise.resolve({
              list: userList,
              pagination: {
                page: 1,
                size: 20,
                total: 5
              }
            })
          },
          info: d => {
            console.log('GET[info]', d)
            return new Promise(resolve => {
              resolve(d)
            })
          },
          add: d => {
            console.log('POST[add]', d)
            return Promise.resolve()
          },
          delete: d => {
            console.log('POST[delete]', d)
            return Promise.resolve()
          },
          update: d => {
            console.log('POST[update]', d)
            return Promise.resolve()
          }
        })
        .set('permission', () => {
          return {
            add: true,
            update: true,
            delete: true
          }
        })
        .set('table', {
          columns: [
            {
              type: 'selection',
              align: 'center',
              width: 60
            },
            {
              label: '图片',
              prop: 'images',
              align: 'center',
              width: '200'
            },
            {
              label: '花名',
              prop: 'name',
              align: 'center'
            },
            {
              label: '统计',
              prop: 'name',
              align: 'center',
              children: [
                {
                  label: '进展',
                  prop: 'process',
                  align: 'center'
                },
                {
                  label: '总量',
                  prop: 'price',
                  align: 'center'
                },
                {
                  label: '销售',
                  prop: 'salesRate',
                  align: 'center'
                }
              ]
            },
            {
              label: '最后期限',
              prop: 'endTime',
              align: 'center'
            }
          ],

          op: {
            props: {
              width: 250
            },

            layout: [
              'slot-append',
              'edit',
              'delete',
              ({ scope, h }) => {
                return h(
                  'el-button',
                  {
                    props: {
                      size: 'mini',
                      type: 'text'
                    },
                    on: {
                      click() {
                        alert(scope.row.name)
                      }
                    }
                  },
                  '点击我'
                )
              }
            ]
          },

          on: {
            'selection-change'(selection) {
              console.log(selection)
            }
          }
        })
        .set('upsert', {
          sync: false,
          props: {
            labelWidth: '150px'
          },
          op: {
            layout: ['slot-fn', 'cancel', 'confirm']
          },
          hdr: {
            layout: ['slot-hdr-btn', 'flex1', 'fullscreen', 'close']
          },
          items: [
            {
              prop: 'vads',
              value: [],
              label: '动态增减表单验证',
              component: {
                name: 'slot-validate'
              }
            },
            {
              label: '数字框',
              prop: 'a',
              component: {
                name: 'el-input-number'
              }
            },
            {
              label: '输入框',
              prop: 'b',
              hidden: false,
              component: {
                name: 'el-input',
                attrs: {
                  placeholder: '请输入关键字'
                }
              }
            },
            {
              label: '下拉选择',
              prop: 'c',
              value: [1, 2],
              component: {
                name: 'el-select',
                props: {
                  multiple: true
                },
                options: [
                  {
                    label: '选项1',
                    value: 1
                  },
                  {
                    label: '选项2',
                    value: 2
                  }
                ]
              }
            },
            {
              label: '时间',
              prop: 'd',
              component: {
                name: 'el-date-picker'
              }
            },
            {
              label: '多选',
              prop: 'e',
              value: [1],
              component: {
                name: 'el-checkbox-group',
                options: [
                  {
                    label: '选项1',
                    value: 1
                  },
                  {
                    label: '选项2',
                    value: 2
                  }
                ]
              }
            }
          ]
        })
        .set('search', {
          adv: {
            items: [
              {
                label: '输入框',
                prop: 'a',
                hidden: false,
                component: {
                  name: 'el-input',
                  attrs: {
                    placeholder: '请输入关键字'
                  }
                }
              },
              {
                label: '下拉选择',
                prop: 'b',
                value: [1, 2],
                component: {
                  name: 'el-select',
                  props: {
                    multiple: true
                  },
                  options: [
                    {
                      label: '选项1',
                      value: 1
                    },
                    {
                      label: '选项2',
                      value: 2
                    }
                  ]
                }
              },
              {
                label: '时间',
                prop: 'c',
                component: {
                  name: 'el-date-picker'
                }
              },
              {
                label: '多选',
                prop: 'd',
                value: [1],
                component: {
                  name: 'el-checkbox-group',
                  options: [
                    {
                      label: '选项1',
                      value: 1
                    },
                    {
                      label: '选项2',
                      value: 2
                    }
                  ]
                }
              }
            ]
          },

          query: {
            list: [
              {
                label: '类目1',
                value: 1
              },
              {
                label: '类目2',
                value: 0
              }
            ]
          }
        })
        .set('layout', [
          ['refresh-btn', 'add-btn', 'multi-delete-btn', 'query', 'flex1', 'search-key', 'adv-btn'],
          ['data-table'],
          ['flex1', 'pagination']
        ])
        .on('info', (data, { next }) => {
          setTimeout(() => {
            next(data)
          }, 300)
        })
        .on('open', (isEdit, data) => {
          console.log('\n【打开窗口】')
          console.log('是否编辑', isEdit)
          console.log('表单参数', data)
        })
        .done()
      app.refresh()
    },

    onLoadB({ ctx, app }) {
      this.crud2 = app

      ctx
        .service({
          page: p => {
            console.log('GET[page]', p)
            return Promise.resolve({
              list: userList,
              pagination: {
                page: 1,
                size: 20,
                total: 5
              }
            })
          },
          info: d => {
            return Promise.resolve(d)
          },
          add: () => {
            return Promise.resolve()
          },
          delete: () => {
            return Promise.resolve()
          },
          update: () => {
            return Promise.resolve()
          }
        })
        .set('permission', () => {
          return {
            add: true,
            update: true,
            delete: true
          }
        })
        .set('table', {
          columns: [
            {
              type: 'index',
              label: '#',
              align: 'center'
            },
            {
              label: '花名',
              prop: 'name',
              align: 'center'
            },
            {
              label: '进展',
              prop: 'process',
              align: 'center'
            },
            {
              label: '总量',
              prop: 'price',
              align: 'center'
            },
            {
              label: '销售',
              prop: 'salesRate',
              align: 'center'
            },
            {
              label: '最后期限',
              prop: 'endTime',
              align: 'center'
            }
          ],

          op: {
            layout: ['slot-append']
          }
        })
        .set('layout', [
          ['refresh-btn', 'flex1', 'search-key'],
          ['data-table'],
          ['flex1', 'pagination']
        ])
        .done()
      app.refresh()
    },

    openForm_CRUD() {
      this.$refs['cl-form'].open({
        props: {
          title: '内嵌CRUD',
          width: '800px',
          size: 'mini'
        },

        op: {},

        items: [
          {
            props: {
              labelWidth: '0px'
            },

            component: {
              name: 'cl-crud',

              on: {
                load({ ctx, app }) {
                  ctx
                    .service({
                      page: () => {
                        return Promise.resolve({
                          list: [
                            {
                              id: 1,
                              name: 'A',
                              age: 26
                            }
                          ],
                          pagination: {
                            total: 1,
                            page: 1,
                            size: 10
                          }
                        })
                      }
                    })
                    .set('search', {
                      query: {
                        list: [
                          {
                            label: '类目1',
                            value: 1
                          },
                          {
                            label: '类目2',
                            value: 0
                          }
                        ]
                      }
                    })
                    .set('table', {
                      columns: [
                        {
                          label: '姓名',
                          prop: 'name'
                        },
                        {
                          label: '年龄',
                          prop: 'age'
                        }
                      ],

                      op: {
                        visible: false
                      }
                    })
                    .set('layout', [
                      ['refresh-btn', 'query', 'flex1', 'search-key'],
                      ['data-table'],
                      ['flex1', 'pagination']
                    ])
                    .done()

                  app.refresh()
                }
              }
            }
          }
        ]
      })
    },

    submit() {
      this.crud1.submit()
    },

    getForm() {
      console.log('表单数据', this.crud1.getForm())
    },

    hiddenItem() {
      this.crud1.hiddenItem('a')
    },

    addVad(list) {
      list.push({
        val: ''
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-tabs, .el-tab-pane {
	height: 100%;

	>>>.el-tabs__header {
		margin-bottom: 0;
	}

	>>>.el-tabs__item.is-active {
		background-color: #fff;
	}

	>>>.el-tabs__content {
		height: calc(100% - 42px);
		border: 1px solid #eee;
		border-top: 0;
	}
}
</style>
