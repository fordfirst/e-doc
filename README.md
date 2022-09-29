# CP-HR_Angular

<h3>Language</h3>
<p>Javascript</p>
<h3>Framework</h3>
<p>Angular 12 + Node 16</p>
<h3>Security</h3>
<p>
Oauth2 + JWT + Authorization <br>
</p>
<h3>First Start Application</h3>
<ol>
    <li>Download node_modules with command "npm install"</li>
    <li>Config api base url, third-party in environments/environment.ts</li>
    <li>Config base url in index.html</li>
    <li>Start you app with command "ng s" **app listening port 4200</li>
</ol>
<h3>Deployment</h3>
<ol>
    <li>Config api base url, third-party in environments/environment.prod.ts</li>
    <li>Config base url in index.html</li>
    <li>Build you app with command "ng build --configuration production --aot --output-hashing=all"</li>
    <li>Upload file in build folder ./* into server in /var/www/html/</li>
    <li>Setting .htaccess (Apache) follow from this url https://angular.io/guide/deployment</li>
</ol>
