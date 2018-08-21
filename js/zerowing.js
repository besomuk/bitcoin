"use strict";

$(document).ready(function()
{
    // hide results DIV
    $("#results_container").hide();

    // assign button events
    $("#submit_button_to_usd").on("click", function(event)
    {
        event.preventDefault();
        if ( $("#btc_amount").val().length == 0 )
            $("#usd_amount").val("Bitcoin field is empty");
        else
            buy_btc("usd");
    } );

    $("#submit_button_to_btc").on("click", function(event)
    {
        event.preventDefault();
        if ( $("#usd_amount").val().length == 0 )
            $("#btc_amount").val("USD field is empty");
        else
            buy_btc("btc");
    } );

    $("#submit_button_to_usd_sell").on("click", function(event)
    {
        event.preventDefault();
        if ( $("#btc_amount").val().length == 0 )
            $("#usd_amount").val("Bitcoin field is empty");
        else
            sell_btc("usd");
    } );

    $("#submit_button_to_btc_sell").on("click", function(event)
    {
        event.preventDefault();
        if ( $("#btc_amount").val().length == 0 )
            $("#usd_amount").val("Bitcoin field is empty");
        else
            sell_btc("usd");
    } );
});

// calculate bitcoin value in dollars
function buy_btc(tr)
{
    // initial setup
    var url = "https://api.coinbase.com/v2/prices/BTC-USD/buy";

    console.log(tr);

    //$("#results_container").hide();            // if clicked again, hide results
    //$("#info").html("Getting latest data..."); // display info about API call status

    if ( tr === "usd")
        $("#usd_amount").val("Getting latest data..."); // same message
    if ( tr === "btc")
        $("#btc_amount").val("Getting latest data..."); // or not the same message?

    console.log ("buy");

    // call API
    $.ajax({
        dataType: "json",
        url: url,
        success: function(res)
        {
            if ( tr === "usd")
            {
                var bit_coin_current_value = 0;
                var btc_amount = $('#btc_amount').val();
                var usd_amount = 0;

                bit_coin_current_value = res.data.amount;         // get current bitcoin value
                usd_amount = bit_coin_current_value * btc_amount; // calc usd value
                usd_amount = usd_amount + usd_amount * 0.015;     // add 1.5%

                // add bank tranfer fees!
                if ( usd_amount < 15 )
                    usd_amount += 10;

                $("#usd_amount").val(formatMoney(usd_amount, 2, '.', ','));
            }

            if ( tr === "btc")
            {
                var bit_coin_current_value = 0;
                var btc_amount = 0;
                var usd_amount = $('#usd_amount').val();
                usd_amount = usd_amount.replace(",", "");
                usd_amount = Number(usd_amount);
                console.log (usd_amount);
                usd_amount = usd_amount - usd_amount * 0.015;     // remove 1.5%

                bit_coin_current_value = res.data.amount;         // get current bitcoin value
                btc_amount = usd_amount / bit_coin_current_value  // calc usd value

                $("#btc_amount").val(formatMoney(btc_amount, 6, '.', ','));
            }
        },
        error: function()
        {
            $("#info").html("Error getting data. Please try later."); // error output
        },
        timeout: 10000
        });
}




function sell_btc(tr)
{
    // initial setup
    var url = "https://api.coinbase.com/v2/prices/BTC-USD/sell";

    //$("#results_container").hide();            // if clicked again, hide results
    //$("#info").html("Getting latest data..."); // display info about API call status

    if ( tr === "usd")
        $("#usd_amount").val("Getting latest data...");
    if ( tr === "btc")
        $("#btc_amount").val("Getting latest data...");

        console.log ("sell");
    // call API
    $.ajax({
        dataType: "json",
        url: url,
        //data: data,
        success: function(res)
        {
            // convert btc to usd
            if ( tr == "usd")
            {
                var bit_coin_current_value = 0;
                var btc_amount = $('#btc_amount').val();
                var usd_amount = 0;

                bit_coin_current_value = res.data.amount;         // get current bitcoin value
                usd_amount = bit_coin_current_value * btc_amount; // calc usd value
                usd_amount = usd_amount - usd_amount * 0.015;     // deduct 1.5%

                $("#usd_amount").val(usd_amount);
            }

            if ( tr == "btc")
            {
                var bit_coin_current_value = 0;
                var btc_amount = 0;
                var usd_amount = $('#btc_amount').val();
                usd_amount = usd_amount.replace(",", "");
                usd_amount = Number(usd_amount);

                usd_amount = usd_amount + usd_amount * 0.015;     // remove 1.5%

                bit_coin_current_value = res.data.amount;         // get current bitcoin value
                btc_amount = usd_amount / bit_coin_current_value  // calc usd value

                $("#btc_amount").val(formatMoney(btc_amount, 6, '.', ','));
            }

        },
        error: function()
        {
            console.log("ERROR");
            $("#info").html("Error getting data. Please try later.");
        },
        timeout: 10000
        });
}


// function for formating numbers
function formatMoney (n, c, d, t)
{
var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 }
