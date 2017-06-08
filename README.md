# lazy-evaluation
[![Build Status](https://travis-ci.org/seulike/lazy-evaluation.svg?branch=master)](https://travis-ci.org/seulike/lazy-evaluation)  
a simple lazy-evaluation implementation,using design pattern,Chain of Responsibility.
# Usage
## Installation
npm install ....
## 简介  
[lazy.js](http://danieltao.com/lazy.js/)实现了对计算的惰性求值。lazy.js的实现核心是Sequence对象。通过Sequence将一系列计算方法链接起来。
这类似于设计模式中的职责链模式。lazy-evaluation使用职责链模式来将一系列计算方法串联起来。lazy.js在具体计算的时候，计算过程的走向如同栈式。
而lazy-evaluation则是串行的,实现更简单直接。
## 使用
```
var arr = [10, 23, 34, 35, 72];
var result = new Lazy(arr).map(item => item * 2).filter(item => item > 60).map(item => item * 2).take(1).exe();

