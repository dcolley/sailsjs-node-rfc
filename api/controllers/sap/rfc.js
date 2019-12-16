
module.exports = {

	inputs: {
		messageId: {
			type: 'string',
			required: true
		},
		dateFrom: {
			type: 'string',
			required: false,
			defaultsTo: '00000000'
		},
		dateTo: {
			type: 'string',
			required: false,
			defaultsTo: '00000000'
		},
		status: {
			type: 'string',
			required: false,
			defaultsTo: ' '
		},
		data: {
			type: 'string',
			required: false,
			defaultsTo: ' '
		},
	},

	exits: {
		success: {
		},
		notFound: {
			description: 'No message with the specified ID was found in the database.',
			responseType: 'notFound'
		}
	 },

	fn: async function (inputs, exits) {

		// sails.log(inputs);

		var params = { 
			I_MSG_ID: inputs.messageId,
			I_DATE_FR: inputs.dateFrom,
			I_DATE_TO: inputs.dateTo,
			I_STATUS: inputs.status,
			I_DATA: inputs.data,
		}

		var res = await sails.helpers.saprfc('Z_XX_IDOC_STATUS_LOOKUP', params)
			
		return exits.success(res)
			
	 }
}
