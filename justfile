build:
    vp build
build-lite:
    vp build --mode lite
build-lite-vconsole:
    vp build --mode lite-vconsole

build-all: build build-lite

[doc('格式化源代码')]
format:
    vp fmt

webdav:
    dufs -A dist
