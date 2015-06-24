feed = (function () {

    var watchList = [];

    var instruments = [
        {security: "EUR/USD", bid: 1.13410, ask: 1.13412, bidVol: 1000000, askVol: 1200000, last: 1.13410},
        {security: "EUR/CHF", bid: 1.04532, ask: 1.04534, bidVol: 1000000, askVol: 1200000, last: 1.04532},
        {security: "GBP/USD", bid: 1.51892, ask: 1.58194, bidVol: 1000000, askVol: 1200000, last: 1.51892},
        {security: "EUR/AUD", bid: 1.46208, ask: 1.46210, bidVol: 1000000, askVol: 1200000, last: 1.46208},
        {security: "GBP/JPY", bid: 195.100, ask: 195.105, bidVol: 1000000, askVol: 1200000, last: 195.100}
    ];

    var opens = instruments.reduce(function(prev, item){
        prev[item.security] = item.bid
        return prev;
    }, {})

    return {
        onChange: function(callback) {
            setInterval(function() {
                var index = Math.floor(Math.random() * instruments.length),
                    instrument = instruments[index],
                    maxChange = instrument.bid * 0.005,
                    change = maxChange - Math.random() * maxChange * 2,
                    last;

                change = Math.round(change * 100) / 100;
                last = instrument.last + change;


                instrument.last = Math.round(last * 100000) / 100000;
                instrument.bid = Math.round( (instrument.bid + change) * 100000) / 100000;
                instrument.ask = Math.round( (instrument.ask + change) * 100000) / 100000;


                instrument.change = Math.round( ( instrument.bid - opens[instrument.security]) * 100) / 100


                if (watchList.indexOf(instrument.security) > -1) {
                    callback(instrument);
                }
            }, 200);
        },
        watch: function(symbols) {
            symbols.forEach(function(symbol) {
                if (watchList.indexOf(symbol) < 0) {
                    watchList.push(symbol);
                }
            });
        },
        unwatch: function(symbol) {
            var index = watchList.indexOf(symbol);
            if (index > -1) {
                watchList.splice(index, 1);
            }
        }
    };

}());