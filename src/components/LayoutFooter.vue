<script setup lang="ts">
interface IAtreementData {
  tadvPrvsLinkId: string;
  tadvPrvsLinkNm: string;
  tadvPrvsLinkUrlAddr: string;
}
const termsUse = ref('');
const privacyPolicy = ref('');

const getAgreementList = async () => {
  const result = await request.get('/bizon/api/agreement/list', {
    headers: {
      'X-COMMAND': 'P07001',
    },
  });
  privacyPolicy.value = result.data.data.find((target: IAtreementData) => {
    return target.tadvPrvsLinkId === 'PNIF_PRSS';
  }).tadvPrvsLinkUrlAddr;
  termsUse.value = result.data.data.find((target: IAtreementData) => {
    return target.tadvPrvsLinkId === 'TADV_PRVS';
  }).tadvPrvsLinkUrlAddr;
};

onMounted(() => {
  getAgreementList();
});
</script>

<template>
  <div class="footer">
    <div class="footer__info">
      <div class="footer__legal">
        <a :href="termsUse" target="_blank">이용약관</a>
        <a :href="privacyPolicy" target="_blank" class="!text-yellow-400">
          개인정보처리방침
        </a>
      </div>
      <p>
        ㈜엘지유플러스 서울특별시 용산구 한강대로 32 대표이사 황현식
        사업자등록번호 220-81-39938 통신판매신고 제 2015-서울용산-00481호
        <u>사업자정보확인</u>
      </p>
      <p>고객센터 가입/일반문의 1544-0001(유료)</p>
      <p class="mt-5">Copyright &#169; LG Uplus Corp. All Rights Reserved.</p>
    </div>
    <icon
      name="lguplus-logo--gray"
      extension="png"
      width="100"
      height="27"
      alt="LG U+"
      class="ml-5 mb-1"
    />
  </div>
</template>

<style lang="scss" scoped></style>
