build:
    vp build
build-lite:
    vp build --mode lite

[doc('格式化源代码')]
format:
    vp fmt

webdav:
    dufs -A dist
