
import echarts from "echarts"
import Rx from "./js/rx-sort"
import {
    query,
    numberCreator,
    getOption
} from "./js/util"

import "./index.less"

const echartInstance = echarts.init(query('.chart-container'))

let currentType

const createNumber$ = Rx.Observable.fromEvent(query('.numberCreator'), 'click')
    .map(e => {
        return numberCreator()
    })
    .do(nums => {
        const option = getOption(nums)
        echartInstance.setOption(option)
    })

const select$ = Rx.Observable.fromEvent(query('.sortTypes'), 'change')
    .map(e => e.target)
    .map(x => x.options[x.selectedIndex].value)
    .map(type => {
        return {
            type,
            timer: 1
        }
    })
    .filter(x => {
        return x.type !== '0'
    })
    .do(x => {
        currentType = x.type
    })

/**
 * 
 * -createNumber$----
 * 
 * ---------------select$------
 *                           combineLatest()
 *                  
 * ---------------------------combine$------
 *                             sort()
 * -----------------------------v1      v2      v3       v4 .......v11      v22     v33------
 *                              flatMap()
 * -----------------------------delay1  delay2  delay3  delay4 ....delay11  delay22 delay33------
 *                               filter(currentType==type)
 * -----------------------------delay1  delay2   delay11  delay22 delay33
 */

Rx.Observable.combineLatest(
    createNumber$,
    select$
)
    .sort()
    .flatMap(obj => {
        return Rx.Observable.of(obj).delay(100 * obj.select.timer++)
    })
    .filter(x => {
        return x.select.type == currentType
    })
    .do(x => {
        const option = getOption(x.nums)
        echartInstance.setOption(option)
    })
    .subscribe(() => { }, null, () => {
        console.log('complete')
    })


