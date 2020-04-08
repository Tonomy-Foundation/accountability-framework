class Contract {
    /* 
     * @param contractAccount - the name of the account on the network where the smart contract lives
     * @param eosio - eosio object
     */
    constructor(contractAccount, eosio) {
        this.contractAccount = contractAccount;
        this.eosio = eosio;
    }

        /* Initializes the contract to have useful action and table access functions
     *
     * The initialised object will have one function for each of the
     * - actions on the smart contract. These functions take the same arguments in the same order as that they are defined in the smart contract and return a tx receipt.
     * - tables in the smart contract. These functions take one argument each, the scope of the table to search within and return the data from the table.
     */
    async initializeContract() {
        const abi = await this.eosio.rpc.get_abi(this.contractAccount);
        
        let contractAccount = this.contractAccount;
        let c = this;

        // Create actions calls
        for (let action of abi.abi.actions) {
            const name = action.name;
            let fields;
            abi.abi.structs.forEach((struct) => {
                if (struct.name === action.type) {
                    fields = struct.fields;
                }
            })
            
            c[name] = async function(...args) {
                let len = args.length;
                if (len !== fields.length) throw new Error("Number of arguments does not match action");
                
                const data = {};
                for (let i = 0; i < len; i++) {
                    data[fields[i].name] = args[i]
                }

                return await this.eosio.transact(contractAccount, name, data, {status: "executed"});
            }
        }

        // Create table getters
        for (let table of abi.abi.tables) {
            const name = table.name;
            c[name] = async function(scope) {
                return await this.eosio.getTable(contractAccount, scope, name);
            }
        }
    }
}

export default Contract;