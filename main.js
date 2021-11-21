const lnurl = require('lnurl');
const qr = require('qrcode');

const server = lnurl.createServer({
	host: 'localhost',
	port: 3000,
	listen: true,
	// DynDNS to access the server from outside the local network
	// router has portforwarding to the maschine running this app on port 3000
	// checked portforwarding with a simple webserver application
	url: 'http://foobar.ddns.net:3000',
	endpoint: '/lnurl',
	lightning: {
		backend: 'lntxbot',
		config: {
			adminKey: 'secretAdminKeyCreatedInTelegram',
		},
	},
	store: {
		backend: 'memory',
		config: {},
	},
});

const tag = 'payRequest';
const params = {
	minSendable: 1,
	maxSendable: 200000,
	metadata: '[["text/plain", "lnurl-node"]]',
	commentAllowed: 500,
};
const options = {
	uses: 0,
};
server.generateNewUrl(tag, params, options).then(result => {
	const { encoded, secret, url } = result;
	console.log({ encoded, secret, url });
	qr.toString(encoded,{type:'terminal'}, function (err, url) {
		console.log(url)
	})
}).catch(error => {
	console.error(error);
});
