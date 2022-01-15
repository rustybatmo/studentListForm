import { generateAPITypes } from "../../util/Common";
import requestAPI from "../../util/RequestAPI";

export function getSampleList(isForce = true) {
  return {
    types: generateAPITypes("SAMPLE_LIST"),
    shouldCallAPI: (state) => {
      if (!isForce) {
        const { sampleDataList = [] } = state;
        return sampleDataList.length === 0;
      }
      return true;
    },
    callAPI: (state) =>
      requestAPI(`${mockServerURL}/api/v1/sampleapi`, {})
        .get()
        .then((res) => {
          return res;
        }),
  };
}

export function addSample(payload) {
  return {
    types: generateAPITypes("ADD_SAMPLE"),
    callAPI: (state) => {
      return new Promise((resolve, reject) => {
        let url = `${mockServerURL}/api/v1/addSample`;
        requestAPI(url, {})
          .post("", payload)
          .then((res) => {
            resolve(res);
          });
      });
    },
  };
}
