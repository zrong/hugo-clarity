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
    // TODO file的值可能是相对路径，需要判断
    let fileURL = null
    if (f.file.indexOf('http') === 0) {
      fileURL = f.file
    } else {
      fileURL = goURL
    }
    const lia = document.createElement('li')
    lia.innerHTML = `<a href="${fileURL}" target="_blank">{{ T "download" }}</a>`
    ul.appendChild(lia)
    dldiv.appendChild(ul)
  }).catch((error) => {
    dldiv.innerText = error.message
  })
}

function aidInitDownloads () {
  // TODO 查找所有符合条件的 dl 容器，为其中的 btn 加入 click 事件
  // 以下部分为伪代码
  {{ if .Site.Params.aid.download }}
  const AID_DL_INFO_URL = '{{ .Site.Params.aid.download.info }}'
  const AID_DL_GO_URL = '{{ .Site.Params.aid.download.go }}'
  const downloadItems = document.querySelectorAll('.aid_download_item')
  if (downloadItems) {
    for (const dldiv of downloadItems) {
      // id is a number
      let btn = dldiv.firstElementChild
      btn.addEventListener('click', (evt) => {
        const id = btn.dataset.aidDownloadId
        // eslint-disable-next-line no-undef
        const infoURL = AID_DL_INFO_URL.replace('%s', id)
        // eslint-disable-next-line no-undef
        const goURL = AID_DL_GO_URL.replace('%s', id)
        aidDownload(dldiv, infoURL, goURL)
      })
    }
  }
  {{ end }}
}
