globalThis.lx = {
    EVENT_NAMES:{
        request: 'request'
    },
    request(url, options, calbk){
        console.log(url, options);
        
        calbk();
    },
    on(type,calbk ){
        
        calbk();
    },
    send(type,obj ){
        console.log(obj);
        
    },
    varsion: '1.0'
}

console.log(globalThis);


