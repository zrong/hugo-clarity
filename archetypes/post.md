+++
title = "{{ replace .Name "-" " " | title }}"
postid = {{ .Name }}
date = {{ .Date }}
isCJKLanguage = true
toc = true
type = "post"
slug = "{{ .Name }}"
description = "Article description."
featured = true
draft = true
aliases = [ "/post/{{ .Name }}.html",]
# menu: main
featureImage = "/images/path/file.jpg"
thumbnail = "/images/path/thumbnail.png"
shareImage = "/images/path/share.png"
codeMaxLines = 10
codeLineNumbers = true
figurePositionShow = true
category = [ "technology" ]
tag = []
+++

{{< label 全文完 >}}