const { GPU } = require('gpu.js');
const gpu = new GPU();
function mySuperFunction(a, b) {
    return a + b;
}
const num = 100000000
const kernel = gpu.createKernel(function(a, b) {
    return mySuperFunction(a[this.thread.x], b[this.thread.x]);
})
.setOutput([num])
.setFunctions([mySuperFunction]);

function cpu(a,b){
    let out = new Array(num)
    for(let i=0;i<num;i++){
        out[i] = a[i] + b[i]
    }
    return out
}

const a= []
const b= []

for(i=0;i<num;i++){
    a.push(Math.random())
    b.push(Math.random())
}
let c1,c2

function calwithgpu(){
    console.time('gpu')
    console.log('start with gpu')
    c1 = kernel(a,b)
    console.timeEnd('gpu')
}

function calwithcpu(){
    console.time('cpu')
    console.log('start with cpu')
    c2 = cpu(a,b)
    console.timeEnd('cpu')
}

calwithcpu()
calwithgpu()
