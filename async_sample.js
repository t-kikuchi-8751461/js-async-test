const request = require('request');
const moment = require('moment');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

// 日時の昇順で格納されているとする
let request_date = [];
// 過去の日時(即時で実行される)
request_date.push(moment().add(-10, 'second').format('YYYY-MM-DD HH:mm:ss.SSS'));
request_date.push(moment().add(-5, 'second').format('YYYY-MM-DD HH:mm:ss.SSS'));
// 未来の日時(時刻が来たら実行される)
request_date.push(moment().add(10, 'second').format('YYYY-MM-DD HH:mm:ss.SSS'));
request_date.push(moment().add(15, 'second').format('YYYY-MM-DD HH:mm:ss.SSS'));

// 再帰実行
function exec() {

    let requests = [];

    // 現在時刻より過去のデータをリクエスト対象とする
    for (let i = 0; i < request_date.length; i++) {
        let date = request_date[i];
        if (moment(date).isBefore(moment())) {
            requests.push(date);
        } else {
            break;
        }
    }

    // あれば実行
    if (0 < requests.length) {
        logger.debug(`requests ${requests.length}`);
        requests.forEach(function (date) {
            // googleにgetするだけ（非同期）
            const options = {url:'https://www.google.com/', method: 'GET'};
            request(options, function (error, response, body) {
                logger.debug(`request : ${date}, statusCode : ${response.statusCode}`);
            });
            request_date.shift();
        });
    }

    // まだ残ってれば1秒後に再実行
    if (request_date.length != 0) {
        setTimeout(() => {
            logger.debug('interval');
            exec();
        }, 1000);
    } else {
        logger.debug('end exec()');
    }
}

exec();
