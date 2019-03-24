const bookBev = Behavior({
    data: {
        result: [],
        total: 0,
        noMore: false,
        loading: false//表示是否正在发生请求
    },
    methods: {
        init(){
            this.setData({
                result: [], 
                noMore: false,
                loading: false
            })
            this.data.total = null
        },
        setMoreData(dataArray) {
            const tempArray = this.data.result.concat(dataArray)
            this.setData({
                result: tempArray
            })
        },
        setTotal(total){
            this.data.total = total
        },
        getCurrentStart() {
            return this.data.result.length
        },
        hasMore() {
            if (this.data.result.length >= this.data.total) {
                this.setData({
                    noMore:true
                })
                return false
            } else {
                this.setData({
                    noMore: false
                })
                return true
            }
        },
        isLocked() {
            return this.data.loading ? true : false
        },
        locked() {
            this.setData({
                loading: true
            })
        },
        unLocked() {
            this.setData({
                loading: false
            })
        }

    }

})
export { bookBev };