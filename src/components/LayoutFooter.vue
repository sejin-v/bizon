<script setup lang="ts">
// const router = useRouter()
const goPage = () => {
  // TODO
  // router.push('/pnif-prss-plcy');
}
</script>

<template>
  <!-- footerWrap : S -->
  <div id="footerWrap">
    <div class="footer">
      <span class="f-logo">
        <img src="/icon/footer_logo.png" alt="LG U+"></span>
      <span class="f-name">㈜엘지유플러스</span>
      <div class="f-info">
        <span class="pc-only inline">대표이사 황현식</span>
        <span class="">서울특별시 용산구 한강대로 32 </span>
        <span class="">사업자등록번호 220-81-39938 </span>
        <span class="">통신판매신고 제 2015-서울용산-00481호 </span>
        <span class="">
          <a @click="goPage"> <u>개인정보처리방침</u></a>
          <a href="javascript:;"><u>서비스이용약관</u></a>
        </span>
        <span class="line-break">고객센터 : 1544-0001
          <span class="pc-only inline">(유료, ARS단축번호: 장애문의 4번→6번→1번)</span></span>
      </div>
    </div>
  </div>
  <!-- footerWrap : E -->
</template>

<style lang="scss" scoped>
#footerWrap {
  position: absolute;
  background-color: white;
  left: 0;
  bottom: 0px;
  width: 100%;
  padding: 15px 20px;
  margin-top: 0;

  .footer {
    display: flex;
    width: 100%;
    table-layout: fixed;
    max-width: 1150px;
    margin: 0 auto;
    font-size: 13px;

    >* {
      display: table-cell;
    }

    .f-logo {
      width: 100px;
    }

    .f-name {
      font-weight: bold;
      width: 120px;
    }

    .f-info {
      span {
        color: #666;
        display: inline-block;
        line-height: 12px;

        &.line-break {
          display: block;
          // margin-top: 5px;
        }
      }
    }
  }
}
</style>
