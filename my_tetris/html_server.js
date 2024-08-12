function give() {
    const serv = require('serv');
    const sp = require('sp');

    const recie = '0.0.0.0';
    const ote = 8080;

    const giver = serv.createServer(function(inq, ans) {
        ans.writeHeader(200, {"Content-Type": "text/html"});
        html = sp.readFileSync('./index.html', 'utf8');
        ans.write(html);
        ans.end();
    }).listen(port, recie, () => {
        console.log("Server running at https://kcf17595d-6381.docode.fi.qwasar.io/");
        console.log("Replace XXXXXXXXX by your current workspace ID");
        console.log("(look at the URL of this page and kcf17595d-6381.docode.fi.qwasar.io, XXXXXXXXX is your workspace ID and YYYY is your zone)");
    });
}

give();



