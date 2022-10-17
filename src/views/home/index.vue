<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px;">
      <el-card shadow="hover">
        <div class="user">
          <img :src="useImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间： <span>2022-7-29</span></p>
          <p>上次登陆地点： <span>湖北</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px;">
        <el-table :data="tableData">
          <el-table-column
          v-for="(val, key) in tableLabel"
          :key="key"
          :prop="key"
          :label="val"
          >

          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px">
              <div ref="echarts1" style="height: 280px;"></div>
                <!-- <div style="height: 280px" ref="echarts"></div> -->
                <!-- <echart :chartData="echartData.order" style="height: 280px" /> -->
            </el-card>
            <div class="graph">
                <el-card style="height: 260px">
                  <div ref="echarts2" style="height: 260px;"></div>
                </el-card>
                <el-card style="height: 260px">
                  <div ref="echarts3" style="height: 240px;"></div>
                </el-card>
            </div>
            
        </el-col>
  </el-row>
</template>

<script>
import {getData} from '@/api'
import * as echarts from 'echarts'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  data() {
    return {
      useImg: require('../../assets/images/user.png'),
      tableData: [],
      tableLabel: {
        name: '商品',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总计'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ]
    } 
  },
  mounted() {
    getData().then(({data}) => {
      const {tableData} = data.data
      this.tableData = tableData
      console.log(data)

      //图表
      const echarts1 = echarts.init(this.$refs.echarts1);
      var echarts1Option = {}
      const { orderData, userData, videoData} = data.data  
      const xAxis = Object.keys(orderData.data[0])
      echarts1Option.xAxis = {
        data: xAxis
      }
      echarts1Option.yAxis = {}
      echarts1Option.legend = {
        data: xAxis
      }
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })

      echarts1.setOption(echarts1Option)

      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
            legend: {
              // 图例文字颜色
              textStyle: {
                color: "#333",
              },
            },
            grid: {
              left: "20%",
            },
            // 提示框
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              type: "category", // 类目轴
              data: userData.map(item => item.date),
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
              axisLabel: {
                interval: 0,
                color: "#333",
              },
            },
            yAxis: [
              {
                type: "value",
                axisLine: {
                  lineStyle: {
                    color: "#17b3a3",
                  },
                },
              },
            ],
            color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
            series: [
              {
                name: '新增用户',
                data: userData.map(item => item.new),
                type: 'bar'
              },
              {
                name: '活跃用户',
                data: userData.map(item => item.active),
                type: 'bar'
              }
            ],
          }
      echarts2.setOption(echarts2Option)

      const echarts3 = echarts.init(this.$refs.echarts3);
      const echart3Option = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [{ 
            data: videoData,
            type: 'pie'
          }]
        }
        echarts3.setOption(echart3Option)

      //饼状图
      
    })
    
  }
}
</script>

<style lang="less" scoped>

</style>
