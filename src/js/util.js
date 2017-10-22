

export function numberCreator(size = 300) {
    const container = new Array(size).fill(0)
    return container.map(x => {
        return Math.ceil(Math.random() * size)
    })
}

export function query(selector) {
    return document.querySelector(selector)
}

export function getOption(data) {
    return {
        color: ['#3398DB'],
        xAxis: [
            {
                type: 'category',
                data: [],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                type: 'bar',
                data
            }
        ]
    };
}

//浅复制
export function clone(arr) {
    return new Array(arr.length).fill(0).map((x, index) => arr[index])
}