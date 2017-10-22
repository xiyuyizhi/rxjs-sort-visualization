
import Rx from "rxjs"
import {
    clone
} from "./util"
import {
    sortTypes
} from "./config"

Rx.Observable.prototype.sort = function () {
    const input = this
    return Rx.Observable.create((observer) => {
        input.subscribe((arr) => {
            const nums = clone(arr[0])
            const select = arr[1]
            const sortMethod = sortTypes[select.type]
            sortMethod(nums, function (arr) {
                observer.next({
                    nums: JSON.parse(JSON.stringify(arr)),
                    select
                })
            }, error => {
                observer.error(error)
            })
        }, )

    })
}

export default Rx