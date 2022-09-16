/*Restituisce il profitto massimo da una quotazione azionaria. 
Le quotazioni azionarie sono memorizzate in un array per data. 
Il profitto di una quotazione azionaria è la differenza tra i prezzi di acquisto e di vendita delle azioni. 
Ogni giorno potete acquistare un'unità di un titolo, vendere un numero qualsiasi di unità già acquistate o non fare nulla. 
Di conseguenza, il profitto maggiore è dato dalla differenza massima tra tutte le coppie di sequenze di prezzi azionari.*/

//const dayPrices = [1, 2, 3, 4, 5, 6];
//const dayPrices = [6, 5, 4, 3, 2, 1];
//const dayPrices = [1, 6, 5, 10, 8, 7];
//const dayPrices = [1, 2, 10, 2, 4, 6];

function onlyNumbers(array) {
  return array.every((element) => {
    return typeof element === "number";
  });
}

exports.validateNumArray = function (dayPrices) {
  if (!dayPrices || dayPrices.length === 0) {
    return "The array does not contain any data!";
  }
  if (!onlyNumbers(dayPrices)) {
    return "The array contains non numeric values!";
  }
  return true;
};

exports.calcProfit = function (dayPrices) {
  var totalSpent = 0;
  var totalStock = 0;
  var finalProfit = 0;
  var totalDays = dayPrices.length;
  var daysReport = [];

  for (i = 0; i < totalDays; i++) {
    if (i < totalDays - 1) {
      //Before last day
      if (dayPrices[i] < dayPrices[i + 1]) {
        //Buy
        totalStock++;
        totalSpent += dayPrices[i];
        var dayReport = `Day ${i + 1} - Buyed: $${
          dayPrices[i]
        }, Stocks: ${totalStock} un`;
        daysReport.push(dayReport);
      } else if (dayPrices[i] > dayPrices[i + 1] && totalStock > 0) {
        //Sell
        var daySellPrice = dayPrices[i] * totalStock;
        var sellProfit = daySellPrice - totalSpent;
        finalProfit += sellProfit;
        var dayReport = `Day ${
          i + 1
        } - Selled: $${daySellPrice}, Spent: $${totalSpent}, Profit: $${sellProfit}`;
        daysReport.push(dayReport);
        totalStock = 0;
        totalSpent = 0;
      } else {
        //Do nothing
        var dayReport = `Day ${i + 1} - Price: $${dayPrices[i]}, Do nothing.`;
        daysReport.push(dayReport);
      }
    } else {
      //Last day
      if (totalStock > 0) {
        //Sell
        var daySellPrice = dayPrices[i] * totalStock;
        var sellProfit = daySellPrice - totalSpent;
        finalProfit += sellProfit;
        var dayReport = `Day ${
          i + 1
        } - Selled: $${daySellPrice}, Spent: $${totalSpent}, Profit: $${sellProfit}`;
        daysReport.push(dayReport);
      } else {
        //Do nothing
        var dayReport = `Day ${i + 1} - Price: $${dayPrices[i]}, Do nothing.`;
        daysReport.push(dayReport);
      }
    }
  }

  daysReport.push(`Final Profit: $${finalProfit}`);

  //Convert array to multi-line string
  const finalReport = (chars) => {
    let mapped = chars
      .map(
        (char) => `
    • ${char}`
      )
      .join("");
    return `${mapped}`;
  };

  return {
    finalProfit: finalProfit,
    finalReport: finalReport(daysReport),
  };
};
