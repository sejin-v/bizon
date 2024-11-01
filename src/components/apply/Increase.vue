<script lang="ts" setup>
import { IStandardParameter } from '~/types';

const props = withDefaults(defineProps<IStandardParameter>(), {
  entrNo: '',
  svcCd: '',
  sbscDownSpedVlue: '',
  sbscUpldSpedVlue: '',
  occrTrfDivsCd: '01',
  trfEvetOccrDt: '',
  icspRqstKdCd: '',
});

const increaseData = reactive({
  icspRqstDownSped: 0,
  icspRqstUpldSped: 0,
  icspRqstKdCd: '',
  occrTrfDivsCd: props.occrTrfDivsCd,
  trfEvetOccrDt: props.trfEvetOccrDt,
});

const getStandardData = async (params: IStandardParameter) => {
  try {
    const result = await request.get('/bizon/api/icsp/standard', {
      params,
      headers: {
        'X-COMMAND': 'P07101',
      },
    });
    return result.data.data;
  } catch (error) {
    throw error;
  }
};

const getParamsData = () => {
  return {
    svcCd: props.svcCd, // 서비스 코드(basic: Basic, standard: Standard, premium: Premium)
    occrTrfDivsCd: props.occrTrfDivsCd, // 발생 트래픽 구분 코드(01: 업로드, 02: 다운로드, 03: 업다운로드)
    sbscDownSpedVlue: props.sbscDownSpedVlue, // 청약 다운로드 속도값(MB)
    sbscUpldSpedVlue: props.sbscUpldSpedVlue, // 청약 업로드 속도값(MB)
  };
};

const getRequestData = () => {
  return {
    trfEvetOccrDt: increaseData.trfEvetOccrDt,
    icspRqstKdCd: increaseData.icspRqstKdCd,
    icspRqstDownSped: increaseData.icspRqstDownSped,
    icspRqstUpldSped: increaseData.icspRqstUpldSped,
    occrTrfDivsCd: props.occrTrfDivsCd,
  };
};

onMounted(async () => {
  try {
    const data = getParamsData();
    const result = await getStandardData(data);
    increaseData.icspRqstUpldSped = result.icspRqstUpldSped;
    increaseData.icspRqstDownSped = result.icspRqstDownSped;
    increaseData.icspRqstKdCd = result.icspRqstKdCd;
  } catch (error) {
    console.error(error);
  }
});
defineExpose({ getRequestData });
</script>

<template>
  <div>
    <p class="popup__desc--sm">
      <em>고객번호&#40;가입번호&#41;</em> {{ entrNo }} 의 속도가 아래와 같이
      변경됩니다.
    </p>
    <form class="form">
      <FormItem label="다운로드">
        <div class="box--f3f">
          <span>{{ props.sbscDownSpedVlue }}M</span>
          <icon
            name="arrow-r__line--7f8"
            width="24"
            height="24"
            alt="변경 후"
          />
          <em
            >{{
              increaseData.icspRqstDownSped
                ? increaseData.icspRqstDownSped
                : props.sbscDownSpedVlue
            }}M</em
          >
        </div>
      </FormItem>
      <FormItem label="업로드">
        <div class="box--f3f">
          <span>{{ props.sbscUpldSpedVlue }}M</span>
          <icon
            name="arrow-r__line--7f8"
            width="24"
            height="24"
            alt="변경 후"
          />
          <em
            >{{
              increaseData.icspRqstUpldSped
                ? increaseData.icspRqstUpldSped
                : props.sbscUpldSpedVlue
            }}M</em
          >
        </div>
      </FormItem>
      <FormItem label="속도 증속기간">
        <div class="box--f3f">증속 완료일부터 10일</div>
      </FormItem>
    </form>
    <ul class="list">
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>
          증속된 속도는 무상제공되며, 기존 사용중인 요금제와 동일하게
          과금합니다.
        </p>
      </li>
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>
          증속 완료일로부터 10일 경과 후 원래 사용 중인 속도로 원상복구 됩니다.
        </p>
      </li>
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>
          증속 속도로 계속 사용원하시는 경우에는 영업
          담당자<u>&#40;김비즈&#47;010-8080-1234&#47;bizon&#64;lguplus.co.kr&#41;</u>께
          문의바랍니다.
        </p>
      </li>
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>
          비밀번호로 생년월일, 주민등록번호 앞자리, 핸드폰 번호 등의 개인정보는
          사용하지 마십시오.
        </p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
