/*$Id$*/
export default function (url, header = null) {
  let contentType = "json";
  let core = {
    ajax(method, url, args, payload, files, onProcess) {
      let p = new Promise((resolve, reject) => {
        let client = new XMLHttpRequest();
        let uri = url;
        var data = "";
        if (args && (method === "POST" || method === "PUT")) {
          let argcount = 0;
          for (let key in args) {
            if ({}.hasOwnProperty.call(args, key)) {
              if (argcount++) {
                data += "&";
              }
              data += `${encodeURIComponent(key)}=${encodeURIComponent(
                args[key]
              )}`;
            }
          }
        }

        client.upload.addEventListener("progress", onProcess);

        client.open(method, uri);

        if (header) {
          Object.keys(header).forEach((key) => {
            client.setRequestHeader(key, header[key]);
          });
        }

        if (files && files.constructor === new FormData().constructor) {
          client.send(files);
        } else if (files) {
          var data = new FormData();
          data.append("file", files[0]);
          client.send(data);
        } else if (payload) {
          if (payload instanceof FormData) {
            client.send(payload);
          } else {
            if (contentType == "json") {
              client.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
              );
              client.send(JSON.stringify(payload));
            } else {
              client.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded;charset=UTF-8"
              );
              let data = "";
              let argcount = 0;
              for (let key in payload) {
                if ({}.hasOwnProperty.call(payload, key)) {
                  if (argcount++) {
                    data += "&";
                  }
                  data += `${encodeURIComponent(key)}=${encodeURIComponent(
                    payload[key]
                  )}`;
                }
              }
              client.send(data);
            }
          }
        } else {
          client.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          client.send(data);
        }

        client.onload = function () {
          if (
            this.status === 200 ||
            this.status === 201 ||
            this.status === 204
          ) {
            let response = this.response ? this.response : this.responseText;
            if (response === "") {
              resolve({ responseStatus: this.status }, () => percentComplete);
            } else {
              try {
                resolve(JSON.parse(response));
              } catch (e) {
                resolve(response);
              }
            }
          } else {
            reject(this);
          }
        };

        client.onerror = function () {
          reject(this);
        };
      });
      p.getProgress = () => p.progress;
      return p;
    },
  };

  return {
    get() {
      return core.ajax("GET", url);
    },
    patch(args, payload) {
      return core.ajax("PATCH", url, args, payload);
    },
    post(args, payload) {
      return core.ajax("POST", url, args, payload);
    },
    put(args, payload, files) {
      return core.ajax("PUT", url, args, payload, files);
    },
    del() {
      return core.ajax("DELETE", url);
    },
    attach(files, onProcess) {
      return core.ajax("POST", url, {}, undefined, files, onProcess);
    },
    setContentType(type) {
      contentType = type;
      return this;
    },
  };
}
