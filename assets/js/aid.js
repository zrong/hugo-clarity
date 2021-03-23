/* eslint-disable no-unused-vars */
/**
 * 提供对 AID 下载服务的调用
 * @param {string} rid 
 * @param {string} infoURL 
 * @param {string} goURL 
 */
function aidDownload (dldiv, infoURL, goURL) {
  // eslint-disable-next-line no-undef
  axios.get(infoURL).then((resp) => {
    dldiv.innerHTML = ''
    console.log(resp)
    const f = resp.data.file
    const ul = document.createElement('ul')
    for (const text of [f.file_name, f.file_date, f.file_hits, f.file_des]) {
      if (text) {
        const li = document.createElement('li')
        li.innerText = text
        ul.appendChild(li)
      }
    }
    const lia = document.createElement('li')
    lia.innerHTML = `<a href="${goURL}" target="_blank">{{ T "download" }}</a>`
    ul.appendChild(lia)
    dldiv.appendChild(ul)
  }).catch((error) => {
    dldiv.innerText = error.message
  })
}


function aidInit () {
  /**
   * 查找所有符合条件的 download 容器，为其中的 btn 加入 click 事件
   * 条件为使用了 .aid_download_item 类名的容器
   */
  (function aidInitDownloads () {
    {{- if .Site.Params.aid.download }}
    const AID_DL_INFO_URL = '{{ .Site.Params.aid.download.info }}'
    const AID_DL_GO_URL = '{{ .Site.Params.aid.download.go }}'
    const downloadItems = document.querySelectorAll('.aid_download_item')
    if (downloadItems) {
      for (const dldiv of downloadItems) {
        // id is a number
        let btn = dldiv.firstElementChild
        btn.addEventListener('click', (evt) => {
          const id = btn.dataset.aidDownloadId
          const infoURL = AID_DL_INFO_URL.replace('%s', id)
          const goURL = AID_DL_GO_URL.replace('%s', id)
          aidDownload(dldiv, infoURL, goURL)
        })
      }
    }
    {{- end }}
  })();

  (function aidInitPageview () {
    {{ if .Site.Params.aid.pageview }}
    const AID_PV_INFO_URL = '{{ .Site.Params.aid.pageview.info }}'
    const pageviewItems = document.querySelectorAll('.aid_pageview_item')
    if (pageviewItems) {
      for (const pvspan of pageviewItems) {
          const id = pvspan.dataset.postid
          const infoURL = AID_PV_INFO_URL.replace('%s', id)
          axios.get(infoURL).then((resp) => {
            pvspan.innerText = resp.data.hit
          }).catch((error) => {
            pvspan.innerText = error.message
          })
      }
    }
    {{- end }}
  })();
}
