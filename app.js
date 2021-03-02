const http = require("http")
const {HOST,PATH,KEY} = require('./config')

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

console.clear()

const callback = ( res ) => {

    res.on('data', (chunk) => {
       
        const data = JSON.parse(chunk.toString());

        if (data.cod == '200'){
            console.log("Yor choice is " + data.name)
            console.log(`Temperature is ${data.main.temp} ℃  (from ${data.main.temp_min} ℃   to ${data.main.temp_max} ℃  )` )
            console.log("Speed of wind is " + data.wind.speed)
        }
        else 
            console.log("Error: " + data.message)
        
    })

    res.on('end', () => { console.log("API response ended") })
    res.on('error', () => { console.log("API response ERROR") })
}

function mainMenu(){ 

    rl.question("Choose your city >>", (option)=>{

        if (option == "exit")    //     Enter 'exit' to exit from script
            process.exit()
            
        const req = http.request( {
            host: HOST,
            path: PATH + `?q=${option}&units=metric&appid=${KEY}`,
            port: 80,
            method: "GET"   
        }, callback)

        req.end()

        setTimeout(mainMenu, 500);
    });
}



mainMenu();

