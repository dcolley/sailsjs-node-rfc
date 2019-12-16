
var noderfc = require('node-rfc')

var conf = sails.config.saprfc.S4

const pool = new noderfc.Pool(conf)
const client = new noderfc.Client(conf);

/**
 * Delete all null (or undefined) properties from an object.
 * Set 'recurse' to true if you also want to delete properties in nested objects.
 */
const delete_null_properties = function(test, recurse) {
	for (var i in test) {
		if (test[i] === null || test[i] === undefined || test[i] === "") {
			delete test[i];
		} else if (recurse && typeof test[i] === 'object') {
			delete_null_properties(test[i], recurse);
		}
	}
}

module.exports = {

	inputs: {
		function: {
			type: 'string',
			required: true,
		},
		params: {
			type: {},
			required: false,
		},
		compact: {
			type: 'boolean',
			required: false,
			defaultsTo: true
		},
		pool: {
			type: 'boolean',
			required: false,
			defaultsTo: true
		},
	},

	exits: {
		success: {}
	},

	fn: async function(inputs, exits) {
		// sails.log("helper starting...")
		// sails.log(inputs)

		if(inputs.pool) {
			// sails.log("using pool...")

			pool.acquire().then(client => {
				// sails.log("pool provided a client...")

				client
					.call( inputs.function, inputs.params )
					.then(res => {
						// sails.log(pool.status)
						return exits.success(res)
					})
					.catch(err => {
						sails.log(pool.status)
						return console.error('could not connect to server', err);
					})
					.finally(()=>{
						// sails.log("... pool release client")
						// sails.log(pool.status)
						pool.release(client)
						// return {}
					})

			}).catch(err => {
				sails.log('could not get client from pool', err)
				return console.error('could not acquire connection ', err);
			})

		} else {
			// sails.log("not using pool...")

			try {
				await client.open()
				// invoke remote enabled ABAP function module
				var res = await client.call(inputs.function, inputs.params)
				// sails.log("got something...")
				if(inputs.compact) delete_null_properties(res, true)
				// sails.log("reduction done...")
				client.close()
				// sails.log("connection closed...")
				
				return exits.success(res)

			} catch(err) {
				return console.error('Error invoking '+inputs.function+':', err);
			}
		}

	},

}
