# js-async-test

jsの非同期処理で、上手くいくパターンとNGなパターンの実験

## OKなパターン async_sample.js

非同期処理の実施後、自関数を終わらせているため意図した通りに動作する

## NGなパターン async_ng_sample.js

whileでループしている中で非同期処理を実施しているため、whileが動いている限り実行されない
