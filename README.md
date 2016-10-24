## Description

PM2 module to forwards pm2 logs to [logmatic.io](https://logmatic.io/). You will need to use your API key.

## Install

`pm2 install pm2-logmatic`

## Configure

- `key` : Your api key retrieved from logmatic.io 

#### How to set this value ?

 After having installed the module you have to type :
`pm2 set pm2-logmatic:key [your_key]` or go to the Keymetrics dashboard.

## Uninstall

`pm2 uninstall pm2-logmatic`
