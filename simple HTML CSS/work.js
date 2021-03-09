onmessage = function(e){

    let sum = 0,num = e.data;
    for(var i=1;i<=num;i++){
        sum += i
    }
    postMessage(sum);
} 