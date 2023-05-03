

    
    // GLOBAL static variable that holds the days of the month
    const DAYS_OF_THE_MONTH = 30;
   
    /**
     * Finding MONTHLY value
     * Item value = 3600 (total)
     * numberOfInstalments = 4 (months)
     * Monthly value > 3600/4 = 900
     * ===================================================
     * @param itemValue original amount entered by the user
     * @param length months the user chooses to pay
     * @param userItem display item / object name
     * @return monthly value 
     */
    
    function getMonthlyValue(itemValue, length, userItem) {
        let monthlyValue = itemValue/length;
        System.out.println("The " + userItem + " is going to cost you " + Math.round(monthlyValue) + " monthly \n");
        return Math.round(monthlyValue); 
    }

    /**
     * Rule of Three (DIRECT) to find total months either for less or more
     * ==============================================================================================
     * @param length number of instalments that the user wants to pay (number of months)
     * @param itemValue original amount chosen by the user  
     * @param userInstalments is how much the user could pay  
     * @return remaining months (difference of months more to pay)
     */
    function getMonthsDueToPay(length, itemValue, userInstalments) {
        
           let userStatus = (userInstalments * length);          // 4 x 85 = 340 euros 
           let days = length * DAYS_OF_THE_MONTH;                // 4 x 30 = 120 days 
           let totalDays = (itemValue * days / userStatus);      // 280 * 120 = 33600
           let monthsToPay = totalDays / DAYS_OF_THE_MONTH;      // 33600 / 340 = 98.82 days
                                                                    // 98.82 / 30 days = 3.29 months                                                       
      /**  MONTHS DUE                 |  DECIMAL PART
       *  ============                |  ==============
       * 340.x = 280*120              |  100.X = 30*29
       *  340.x = 33600               |   100.X = 870 
       *    x = 33600                 |    X = 870
       *        /340                  |      /100
       *     x = 98.82                |       X = 7.8 DAYS (MUST BE ROUNDED TO UP)
       *        /30 = 3.29 Months     |
       */
        return monthsToPay; 
    }
    
    
    
    /**
     * GET DECIMAL from the remaining months to count the days left
     * =============================================================
     * @param remainingMonths from the getRemainingMonths (method) in the parameter 
     * @return the extracted DECIMAL value from the remaining months
     */
    function getDecimal(remainingMonths) {
        let value = remainingMonths.toString().indexOf(".");
        let decimal = number.toString().substring(value+1);
        return decimal; // DONT ROUND THE DECIMAL AS it is going to return a integer (eg. 0.5 decimal = 1.0 rounded)
    }

    /**
     * GET INTEGER from the remaining months 
     * ============================================================= 
     * @param differenceMonths get the difference in months either (less or more)
     * @return the extracted INTEGER value from the remaining months
     */
    function getInteger(differenceMonths) {
        let integer = Math.trunc(differenceMonths);
        return integer; 
    }
    
    
    /**
     * Rule of Three (INVERSE) to find remaning days from decimal part
     * ================================================================
     * Will use the decimal part multiplied by total days of the month = (30 * 0.6 = 19.5 days total)
     * @param decimal taken from the getDecimal (method) in the parameter
     * @return the remaining days from the decimal part
     */
    function getRemaningDays(decimal) {
        let daysFromDecimalPart = (int) (DAYS_OF_THE_MONTH * decimal);
        return daysFromDecimalPart;
    }
   
    
    /**
     * Works the same as the (getRemainingDays) the only difference
     * is that this one is going to return rounded type
     * ==============================================================
     * @param decimal
     * @return ROUNDED 
     */
    function getRemaningDaysRounded(decimal) {
        let daysFromInteger = DAYS_OF_THE_MONTH * decimal;
        return Math.ceil(daysFromInteger);
    }
    

    /**
     * @param length
     * @param integer
     * @return THE difference between length & integer for LESS
     */
    function getDifferenceLess(length, integer) {
        let totalMonths = length - integer;
        return totalMonths; 
    }
    
    
    /**
     * @param length
     * @param integer
     * @return THE difference between length & integer for MORE
     */
    function getDifferenceMore(length, integer) {
        let totalMonths = integer - length ;
        return totalMonths;
    }

   // exportiing the functions to the main where we want to use it
    module.exports = {
        getMonthlyValue, getMonthsDueToPay, getDecimal,

        getInteger, getRemaningDays, getRemaningDaysRounded,
    
        getDifferenceLess, getDifferenceMore
    }