let cnt = 1;

const increment = ()=> {
    cnt++;
    console.log('inside module1')
    console.log(cnt);
}

module.exports = increment
