let  cnt = 1

const decrement = ()=> {
    cnt--;
    console.log('inside module2')
    console.log(cnt)
}

module.exports = decrement
