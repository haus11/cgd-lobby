/**
 * Created by david on 2/18/15.
 */

/*
 * AMRoleService
 */
module.exports = {

    /**
     * Returns object with information on role counts
     */
    calcRoles: function(playerCount) {

        var remainder     = playerCount % this.amountOfTypes;
        var algorithmType = this.getAlgorithmTypeByRemainder(remainder);
        var algorithms    = this.getAlgorithms(algorithmType);
        var n             = Math.floor(playerCount / this.amountOfTypes);

        return {
            'session1': {
                'lowCostSupplier'   : eval(algorithms.session1.lowCostSupplier),
                'highCostSupplier'  : eval(algorithms.session1.highCostSupplier),
                'lowValueDemander'  : eval(algorithms.session1.lowValueDemander),
                'highValueDemander' : eval(algorithms.session1.highValueDemander)
            },
            'session2': {
                'lowCostSupplier'   : eval(algorithms.session2.lowCostSupplier),
                'highCostSupplier'  : eval(algorithms.session2.highCostSupplier),
                'lowValueDemander'  : eval(algorithms.session2.lowValueDemander),
                'highValueDemander' : eval(algorithms.session2.highValueDemander)
            }
        };
    },

    getPlayerRole: function(index) {

        if     (index == 1 || index == 'A') return this.playerTypes.A;
        else if(index == 2 || index == 'B') return this.playerTypes.B;
        else if(index == 3 || index == 'C') return this.playerTypes.C;
        else if(index == 4 || index == 'D') return this.playerTypes.D;
        else if(index == 5 || index == 'E') return this.playerTypes.E;
        else if(index == 0 || index == 'F') return this.playerTypes.F;
        else throw 'AMRoleService: Playertype index not supported!';
    },

    /**
     * Returns the algorithm type based on the calculated remainder of people.
     */
    getAlgorithmTypeByRemainder: function (_remainder) {
        var result = 'F';
        switch (_remainder) {
            case 1: result  = 'A'; break;
            case 2: result  = 'B'; break;
            case 3: result  = 'C'; break;
            case 4: result  = 'D'; break;
            case 5: result  = 'E'; break;
            default: result = 'F';
        }
        return result;
    },

    getAlgorithms: function (_algorithmType) {
        return {'session1' : this.distributionAlgorithms.session1[_algorithmType], 'session2' : this.distributionAlgorithms.session2[_algorithmType]};
    },

    amountOfTypes: 6,

    distributionAlgorithms: {
        'session1' : {
            'A' : {
                'lowCostSupplier' : '2 * n',
                'highCostSupplier' : 'n',
                'lowValueDemander' : '2 * n',
                'highValueDemander' : 'n + 1'
            },
            'B' : {
                'lowCostSupplier' : '2 * n',
                'highCostSupplier' : 'n',
                'lowValueDemander' : '2 * n + 1',
                'highValueDemander' : 'n + 1'
            },
            'C' : {
                'lowCostSupplier' : '2 * n',
                'highCostSupplier' : 'n',
                'lowValueDemander' : '2 * n + 2',
                'highValueDemander' : 'n + 1'
            },
            'D' : {
                'lowCostSupplier' : '2 * n + 1',
                'highCostSupplier' : 'n',
                'lowValueDemander' : '2 * n + 2',
                'highValueDemander' : 'n + 1'
            },
            'E' : {
                'lowCostSupplier' : '2 * n + 1',
                'highCostSupplier' : 'n + 1',
                'lowValueDemander' : '2 * n + 2',
                'highValueDemander' : 'n + 1'
            },
            'F' : {
                'lowCostSupplier' : '2 * n',
                'highCostSupplier' : 'n',
                'lowValueDemander' : '2 * n',
                'highValueDemander' : 'n'
            }
        },
        'session2' : {
            'A' : {
                'lowCostSupplier' : 'n',
                'highCostSupplier' : '2 * n + 1',
                'lowValueDemander' : 'n',
                'highValueDemander' : '2 * n'
            },
            'B' : {
                'lowCostSupplier' : 'n + 1',
                'highCostSupplier' : '2 * n + 1',
                'lowValueDemander' : 'n',
                'highValueDemander' : '2 * n'
            },
            'C' : {
                'lowCostSupplier' : 'n + 1',
                'highCostSupplier' : '2 * n + 1',
                'lowValueDemander' : 'n',
                'highValueDemander' : '2 * n + 1'
            },
            'D' : {
                'lowCostSupplier' : 'n + 1',
                'highCostSupplier' : '2 * n + 1',
                'lowValueDemander' : 'n + 1',
                'highValueDemander' : '2 * n  + 1'
            },
            'E' : {
                'lowCostSupplier' : 'n + 1',
                'highCostSupplier' : '2 * n + 1',
                'lowValueDemander' : 'n + 1',
                'highValueDemander' : '2 * n + 2'
            },
            'F' : {
                'lowCostSupplier' : 'n',
                'highCostSupplier' : '2 * n',
                'lowValueDemander' : 'n',
                'highValueDemander' : '2 * n'
            }
        }
    },

    playerTypes: {
        'A': {
            type : 'A',
            session1 : {
                role : 'demander',
                maxValue : 40
            },
            session2 : {
                role : 'supplier',
                maxValue : 30
            }
        },
        'B': {
            type : 'B',
            session1 : {
                role : 'demander',
                maxValue : 20
            },
            session2 : {
                role : 'supplier',
                maxValue : 10
            }
        },
        'C': {
            type : 'C',
            session1 : {
                role : 'demander',
                maxValue : 20
            },
            session2 : {
                role : 'demander',
                maxValue : 40
            }
        },
        'D': {
            type : 'D',
            session1 : {
                role : 'supplier',
                maxValue : 10
            },
            session2 : {
                role : 'demander',
                maxValue : 20
            }
        },
        'E': {
            type : 'E',
            session1 : {
                role : 'supplier',
                maxValue : 30
            },
            session2 : {
                role : 'demander',
                maxValue : 40
            }
        },
        'F': {
            type : 'F',
            session1 : {
                role : 'supplier',
                maxValue : 10
            },
            session2 : {
                role : 'supplier',
                maxValue : 30
            }
        }
    }
};
