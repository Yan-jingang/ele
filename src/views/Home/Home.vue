<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img src />
          <div class="userinfo">
            <p class="name">腹鼓</p>
            <p class="access">画家</p>
          </div>
        </div>
        <div class="logininfo">
          <p>
            上次登录
            <span>252</span>
          </p>
          <p>
            地点
            <span>湖北发</span>
          </p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height:520px;margin-top:20px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableList"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in Data"
          :key="item.value"
          :body-style="{ display: 'flex', height: '80px', padding: 0 }"
        >
          <i class="icon" :class="`el-icon-${item.icon}`"></i>
          <div class="detail">
            <p class="detail_num">￥ {{ item.value }}</p>
            <p class="detail_text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <Echart style="height:280px" :chartData="echartData.order" />
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <Echart style="height:260px" :chartData="echartData.user" />
        </el-card>
        <el-card shadow="hover">
          <Echart
            style="height:260px"
            :isAxisChart="false"
            :chartData="echartData.video"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "@/request/api";
import Echart from "@/components/Echarts.vue";

export default {
  data() {
    return {
      Data: [
        {
          name: "v发布布局",
          value: 54456,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "v发布布局",
          value: 54646,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "v发布布局",
          value: 54466,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "v发布布局",
          value: 56446,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "v发布布局",
          value: 54468,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "v发布布局",
          value: 5446,
          icon: "success",
          color: "#2ec7c9"
        }
      ],
      tableData: [],
      tableList: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  components: {
    Echart
  },
  methods: {
    getData() {
      getData().then(res => {
        res = res.data;
        this.tableData = res.data.tableData;
        // 获取订单折线图
        const order = res.data.orderData;
        this.echartData.order.xData = order.date;
        // 取出series中name部分---键名
        let keyArray = Object.keys(order.data[0]);
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: order.data.map(item => item[key]),
            type: "line"
          });
        });
        // 用户柱状图
        this.echartData.user.xData = res.data.userData.map(item => item.date);
        this.echartData.user.series.push({
          name: "新增用户",
          data: res.data.userData.map(item => item.new),
          type: "bar"
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: res.data.userData.map(item => item.active),
          type: "bar",
          barGap: 0
        });
        // 视频饼图
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: "pie"
        });
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    &info {
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
    }
  }
  .logininfo {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999;
    }
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 30%;
      margin-bottom: 20px;
    }
    .icon {
      font-size: 30px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      background-color: red;
    }
    .detail {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .detail_num {
        font-size: 25px;
        margin: 5px 0 10px;
      }
      .detail_text {
        margin-top: 0;
        font-size: 14px;
        text-align: center;
        color: #999999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>
