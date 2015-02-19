/**
 * Created by david on 2/19/15.
 */

/*
 * AMTransactionService
 */
module.exports = {

    sortTransactionNmbrs: function (first, second) {

        if (first.transactionNmbr == second.transactionNmbr)
            return 0;
        if (first.transactionNmbr < second.transactionNmbr)
            return -1;
        else
            return 1;
    }
}
