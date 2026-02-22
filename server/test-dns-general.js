const dns = require('dns');

const host = 'cluster0.eqdw7ta.mongodb.net';

console.log('Testing general DNS resolution for:', host);

dns.lookup(host, (err, address, family) => {
    if (err) {
        console.error('General DNS Lookup Error:', err.code, err.message);
        process.exit(1);
    }
    console.log('Resolved IP:', address);
    process.exit(0);
});
