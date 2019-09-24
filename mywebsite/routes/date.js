module.exports.getNum = getNum;

function getNum(){
    let today = new Date();
    
    let options={        
        day:'numeric', 
        
    };

    let day = today.toLocaleDateString('en-US',options);

    return day;
}
module.exports.getMonth = getMonth;

function getMonth(){
    let today = new Date();
    
    let options={    
        month:'long'
    };

    let day = today.toLocaleDateString('en-US',options);

    return day;
}

// module 2

module.exports.getDay = getDay;

function getDay(){ 
    let today = new Date();
    
    let options={
        weekday:'long',       
    };

    let day = today.toLocaleDateString('en-US',options);

    return day;
}