const dns = require('dns');

dns.resolveSrv('_mongodb._tcp.cluster0.eqdw7ta.mongodb.net', (err, addresses) => {
    if (err) {
        console.error('DNS Resolution Error:', err.code, err.message);
        process.exit(1);
    }
    console.log('Resolved Addresses:', addresses);
    process.exit(0);
});
