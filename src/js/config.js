
import select_sort from "./select-sort"
import quick_sort from "./quick-sort"
import insert_sort from "./insert-sort"
import up_down_merge_sort from "./up-down-mergesort"
import down_up_merge_sort from "./down-up-mergesort"
import PQ_sort from "./sort-PQ-quick"
export const sortTypes = {
    1: select_sort,
    2: insert_sort,
    3: up_down_merge_sort,
    4: down_up_merge_sort,
    5: quick_sort,
    6: PQ_sort
}