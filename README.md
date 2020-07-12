# replace-env

Command line utility for automatically replacing parts of strings delineated by `%variable_name%`
replacing them with `variable_name` environment variable if it exists. 
This allows you to easily keep sensitive parameters out of your config files and only add them as part of your build process.

### Prerequisites
You will need to have a recent version of `Node.js` installed.

## Instructions

To get started install command line tool globally by running `npm install -g replace-env`

To replace all instances of %variable% in file run `replace-env <filename>`. 
You can add as many parameters in the format %variable_name% as you like.
Just make sure that all the environment variables are set in the shell before running tool.

#### Example
Lets say you have text file called `config.txt` that has the following contents:
```bash
# config.txt
PASSWORD=%PASSWORD_VAR%

TOKEN=%TOKEN_VAR%
```
You can temporarily set the needed variables by running the following:
```bash
export PASSWORD_VAR=top_secret
export TOKEN_VAR=xjW14@35z1
```
You can now run `replace-env config.txt` and the file `config.txt` should now have the following contents:
```bash
# config.txt
PASSWORD=top_secret

TOKEN=xjW14@35z1
```

## Built With

* [Node.js](https://nodejs.org/en/)

## Authors

* **Dovid Gefen** - [Github Page](https://github.com/dovidgef)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
