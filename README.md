# sailsjs-node-rfc
SailsJS with connection to SAP server via node-rfc

# Dependencies
 - sap rfc sdk - https://support.sap.com/en/product/connectors/nwrfcsdk.html
 - Sails JS - https://sailsjs.com/
 - node-rfc - https://github.com/SAP/node-rfc
 - SAP NetWeaver or HANA instance - https://www.sap.com/uk/products/free-trials.html

# Installation / setup
## Install SAP RFC DSK as per docu
 - https://github.com/SAP/node-rfc
 - http://sap.github.io/node-rfc/install.html#sap-nw-rfc-sdk-installation

Download SDK - in my case it was for Mac

Link the dylib files in /usr/local/lib so they are accessible from within node/sailsjs
```
cd /usr/local/lib
sudo ln -s /Users/derek/Downloads/nwrfc750P_5-80002761/nwrfcsdk/lib/libsapnwrfc.dylib 
sudo ln -s /Users/derek/Downloads/nwrfc750P_5-80002761/nwrfcsdk/lib/libicudata.50.dylib
sudo ln -s /Users/derek/Downloads/nwrfc750P_5-80002761/nwrfcsdk/lib/libicudecnumber.dylib
sudo ln -s /Users/derek/Downloads/nwrfc750P_5-80002761/nwrfcsdk/lib/libicui18n.50.dylib
sudo ln -s /Users/derek/Downloads/nwrfc750P_5-80002761/nwrfcsdk/lib/libicuuc.50.dylib
sudo ln -s /Users/derek/Downloads/nwrfc750P_5-80002761/nwrfcsdk/lib/libsapucum.dylib
```
## 'Open' all the dylib files
"Right-click > Open" each dylib file and accept the warning about the libs not being signed

## Create a Sails JS Project
```
sails create myproj
cd myproj
```
## Install deps
Use the @next to get async-await 
```
npm install node-rfc@next --save
```

## Sails files
 - rfc config file with credentials
 - helper
 - controller
 - route
