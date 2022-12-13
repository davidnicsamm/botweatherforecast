const { Telegraf } = require('telegraf');
const { Markup }  = require ('telegraf').Markup;
const axios = require('axios');
const { Navigator } = require('node-navigator');

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start(ctx => {
    const mensaje = "Bienvenido al pronóstico del tiempo.\n\
    Para continuar, necesitamos acceder a la ubicación de su dispositivo.\n\
    Presione Si para continuar, No para cancelar.";

    
    

    ctx.reply(mensaje, {
        reply_markup: {
            inline_keyboard: [
                [{text: "SI", callback_data: "btn_si"}, {text: "NO", callback_data: "btn_no"}]
            ]
        }
    });
});


bot.on('callback_query', ctx => {
    ctx.answerCbQuery();
    boton = ctx.update.callback_query.data;

    if(boton == "btn_si"){
        
        const navigator = new Navigator();

        navigator.geolocation.getCurrentPosition((success, error) => {
            if(error){
                console.log(error);
                ctx.reply("Error al querer consultar el pronóstico");
            }else{
                ctx.reply("Ubicación: latitud: " + success.latitude + " - longitud: " + success.longitude);  
            }

        });

    }

    if(boton == "btn_no"){
        ctx.reply("Salir");
    }
})

bot.launch()