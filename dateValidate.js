function validateDate() {
    let dateStr = document.getElementById('val_date').value;
    let formatStr = document.getElementById('val_format').value;
    if (dateStr == '' || formatStr == '') {
        document.getElementById('success_message').innerHTML = '';
        document.getElementById('error_message').innerHTML = 'Date String & Date Format are required!';
    } else {
        let response = checkDate(dateStr, formatStr);
        if (response[0]) {
            document.getElementById('error_message').innerHTML = '';
            document.getElementById('success_message').innerHTML = 'Input Date: ' + response[1] + ' is valid for given input format ' + formatStr;
        } else {
            document.getElementById('success_message').innerHTML = '';
            document.getElementById('error_message').innerHTML = 'Input Date: ' + response[1] + ' is invalid for given input format ' + formatStr;
        }
    }
}

function checkDate(dateStr, formatStr) {
    let isValid = false;
    let delimiter = ['.', '-', '/'];
    let selectedDelimiter = '', updatedDate = '';
    let yearPos = -1;
    let dateTokens, formatTokens = [];
    for (let item of delimiter) {
        dateTokens = dateStr.split(item);
        formatTokens = formatStr.split(item);
        if (dateTokens.length == 3 && formatTokens.length == 3 ) {
            selectedDelimiter = item;
            break;
        }
    }
    if (selectedDelimiter != '') {
        let date, month, year = '';
        for (let i = 0; i < formatTokens.length; i++) {
            let value = formatTokens[i];
            value = value.trim();
            switch (value.toUpperCase()) {
                case 'M':
                case 'MM':
                    month = dateTokens[i];
                    break;
                case 'D':
                case 'DD':
                    date = dateTokens[i];
                    break;
                case 'Y':
                case 'YY':
                case 'YYY':
                case 'YYYY':
                    year = dateTokens[i];
                    yearPos = i;
                    break;
                default:
                    isValid = false;
            }
        }
        if (( year !='') && (year >= 0) && (year < 10000)) {
          if(year < 50){
            year = 2000 + (+year);
          }
          if(year >= 50 && year < 100){
            year = 1900 + (+year);
          }
          dateTokens[yearPos] = year;
          if((month > 0) && (month < 13)){
            let isLeapYr = (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
            let month30 = ['4', '6', '9', '11'];
            if((date > 0) && (date < 32)) {
                isValid = true;
                if(month30.includes(month) && (date > 30)) {
                  isValid = false;
                }
                if(month == 2){
                    if((isLeapYr) && (date > 29)){
                      isValid = false;
                    }
                    if((!isLeapYr) && (date > 28)){
                      isValid = false;
                    }
                }
            }
          }
        }
        updatedDate = dateTokens.join(selectedDelimiter);
    }else{
      updatedDate = dateStr;
    }
    return [isValid, updatedDate];
}
