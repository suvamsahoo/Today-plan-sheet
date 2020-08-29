//module.exports is an Object, we can use 'module.exports' or only 'exports' also
exports.getDMY = function(){//anonymous function
    const today = new Date();

    const options ={
     day: "numeric", //28
     month: "long", //Auguest
     year: 'numeric',//2020
    };

    return today.toLocaleDateString("en-US", options)//Date#toLocaleDateString can be used to create standard locale-specific renderings. 
};

module.exports.getWd = function(){
    const today = new Date();

    const options ={
     weekday: "long", //Friday
    };

    return today.toLocaleDateString("en-US", options)
};
